import React, { useState } from 'react';
import { OrderRequest, OrderRequestStatus } from '../types/order';
import { repository } from '../data/orderRepository';
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  QrCode,
  Download,
  FileSpreadsheet,
  Building2,
  CreditCard,
  Smartphone,
  Landmark,
  RefreshCw,
  ExternalLink,
  Printer,
  Copy,
  Check,
  MapPin,
  Users,
  CheckCircle
} from 'lucide-react';

interface OrderRequestCheckoutScreenProps {
  order: OrderRequest | null;
  onBack: () => void;
  onComplete: () => void;
  onAdvanceStatus?: (orderId: string) => void;
}

export const OrderRequestCheckoutScreen: React.FC<OrderRequestCheckoutScreenProps> = ({
  order,
  onBack,
  onComplete,
  onAdvanceStatus
}) => {
  const currentOrder = order || repository.getActiveRequest()!;

  const [selectedPayment, setSelectedPayment] = useState<'MADA' | 'APPLE_PAY' | 'BANK_TRANSFER'>('MADA');
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [copiedIban, setCopiedIban] = useState<boolean>(false);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<boolean>(false);

  // Invariant totalCalculationExact: base + 15% VAT
  const basePriceSar = (currentOrder.baseAmountMinorUnits / 100).toFixed(2);
  const vatPriceSar = (currentOrder.vatAmountMinorUnits / 100).toFixed(2);
  const totalPriceSar = (currentOrder.totalAmountMinorUnits / 100).toFixed(2);

  const orderId = currentOrder.requestId;
  const status = currentOrder.status;

  const verifiedCount = currentOrder.leadsVerifiedCount || 78;
  const targetCount = currentOrder.leadsTargetCount || 100;
  const progressPercent = Math.min(100, Math.round((verifiedCount / targetCount) * 100));

  const handleCopyIban = () => {
    navigator.clipboard.writeText('SA0380000452608010198271');
    setCopiedIban(true);
    setTimeout(() => setCopiedIban(false), 2500);
  };

  const handleDownloadCsv = () => {
    const csvContent = repository.exportLeadsToCsv(repository.getLeads());
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `HORECA_Verified_Leads_${orderId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccessToast(true);
    setTimeout(() => setDownloadSuccessToast(false), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0B1120] text-slate-100">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-[#111827]/95 backdrop-blur border-b border-slate-800 px-4 md:px-8 py-3.5 shadow-md">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="p-1.5 -mr-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
              aria-label="الرجوع"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div>
              <h1 className="font-extrabold text-base md:text-lg text-white">
                متابعة تقدم جمع البيانات والفوترة المعتمدة
              </h1>
              <p className="text-xs text-slate-400">
                لوحة تشغيل الباحثين الميدانيين وإصدار الفاتورة الضريبية (ZATCA)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold bg-[#0B1120] text-teal-300 px-3 py-1 rounded-xl border border-teal-500/30" dir="ltr">
              #{orderId}
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-4 md:p-8 space-y-6 pb-28">
        {/* ======================================================== */}
        {/* 1. FIELD RESEARCH DATA COLLECTION PIPELINE TRACKER */}
        {/* ======================================================== */}
        <section className="bg-[#111827] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-teal-400">
                منظومة التحقق الميداني المباشر (Field Research Operations)
              </span>
              <h2 className="text-lg md:text-xl font-black text-white mt-0.5">
                حالة تنفيذ الحملة: {currentOrder.items[0]?.title || 'حزمة استكشاف الكافيهات والمطاعم'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">نسبة الإنجاز الإجمالية:</span>
              <span className="text-lg font-black text-emerald-400 font-mono">
                {progressPercent}%
              </span>
            </div>
          </div>

          {/* Realistic 3-Phase Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Phase 1 */}
            <div className="bg-[#0B1120] border border-emerald-500/40 rounded-2xl p-4 space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  المرحلة 1: النطاق الجغرافي والحصر
                </span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded font-bold font-mono">
                  100% مكتمل
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                تحديد نطاق أحياء جدة المستهدفة (الروضة، الزهراء، التحلية) وسحب أرقام السجلات التجارية وتراخيص بلدي.
              </p>
              <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                الحصر الأولي: تم رصد 312 منشأة غذائية
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bg-[#0B1120] border border-teal-500/60 rounded-2xl p-4 space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                  المرحلة 2: التحقق الميداني والهاتفي
                </span>
                <span className="text-[10px] bg-teal-950 text-teal-300 px-2 py-0.5 rounded font-bold font-mono">
                  جاري التدقيق
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                التواصل مع مدراء المشتريات، تدقيق أرقام الجوال المباشرة، وحصر استهلاك المجمدات وسعات غرف التبريد.
              </p>
              <div className="text-[11px] text-teal-300 font-bold pt-1 border-t border-slate-800/80 flex items-center justify-between">
                <span>تم توثيق واعتماد:</span>
                <span className="font-mono text-sm">{verifiedCount} من {targetCount} منشأة</span>
              </div>
            </div>

            {/* Phase 3 */}
            <div className={`bg-[#0B1120] border rounded-2xl p-4 space-y-2 relative overflow-hidden ${
              status === 'COMPLETED' ? 'border-emerald-500/60' : 'border-slate-800/80'
            }`}>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold flex items-center gap-1.5 ${
                  status === 'COMPLETED' ? 'text-emerald-300' : 'text-slate-400'
                }`}>
                  <FileSpreadsheet className="w-4 h-4" />
                  المرحلة 3: الاعتماد والتصدير
                </span>
                <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded font-bold font-mono">
                  {status === 'COMPLETED' ? 'جاهز للتسليم' : 'قيد المراجعة'}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                تدقيق جودة البيانات، تنظيف الملف النهائي بصيغة Excel / CSV، وتجهيز الفاتورة الضريبية ZATCA.
              </p>
              <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-800/80">
                تسليم فوري عبر البريد ولوحة العميل
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5 bg-[#0B1120] p-4 rounded-2xl border border-slate-800">
            <div className="flex justify-between text-xs text-slate-300 font-medium">
              <span>تقدم إنجاز التوثيق الميداني للباحثين:</span>
              <span className="font-mono font-bold text-teal-400">{verifiedCount} / {targetCount} منشأة معتمدة</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5">
              <div
                className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Monotonic Status Advance Button (Simulator) */}
          {status !== 'COMPLETED' && onAdvanceStatus && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400">
                محاكاة تقدم فريق الباحثين في أحياء جدة:
              </span>
              <button
                type="button"
                onClick={() => onAdvanceStatus(orderId)}
                className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/40 flex items-center gap-2 transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>ترقية مرحلة التدقيق الميداني (Monotonic Step)</span>
              </button>
            </div>
          )}
        </section>

        {/* ======================================================== */}
        {/* 2. DELIVERABLES & INSTANT DATASET EXPORT */}
        {/* ======================================================== */}
        <section className="bg-[#111827] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-teal-400" />
                مخرجات الحملة وتحميل ملف البيانات
              </h3>
              <p className="text-xs text-slate-400">
                الملف يحتوي على أسماء مدراء المشتريات، الجوالات المباشرة، سعات التخزين التبريدي وفجوات الموردين
              </p>
            </div>

            <button
              type="button"
              onClick={handleDownloadCsv}
              className="px-5 py-2.5 text-xs font-extrabold rounded-xl bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-950 flex items-center gap-2 transition cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>تنزيل ملف البيانات الكامل (Excel / CSV)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="bg-[#0B1120] p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[11px]">صيغة الملف:</span>
              <span className="text-white font-bold font-mono">Microsoft Excel (.csv UTF-8)</span>
            </div>
            <div className="bg-[#0B1120] p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[11px]">ترميز اللغة العربية:</span>
              <span className="text-emerald-400 font-bold">متوافق 100% بدون تشويه حروف</span>
            </div>
            <div className="bg-[#0B1120] p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[11px]">حقول البيانات المتاحة:</span>
              <span className="text-teal-300 font-bold">18 حقلاً استقصائياً وتجارياً</span>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 3. REALISTIC B2B PRICING & ZATCA TAX INVOICE */}
        {/* ======================================================== */}
        <section className="bg-[#111827] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1.5 w-fit">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                فاتورة ضريبية نظامية (ZATCA Phase 2 E-Invoice)
              </span>
              <h3 className="text-lg md:text-xl font-black text-white">
                إشعار المطالبة والفوترة المعتمدة
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto"
            >
              <QrCode className="w-4 h-4 text-amber-400" />
              <span>فحص رمز الاستجابة السريع (QR)</span>
            </button>
          </div>

          {/* Corporate Tax Credentials */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs bg-[#0B1120] p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-slate-500 block text-[11px]">مقدم الخدمة المعتمد:</span>
              <span className="text-slate-200 font-bold">رادار توريد جدة لذكاء الأسواق</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">السجل التجاري (CR):</span>
              <span className="text-slate-200 font-mono font-bold" dir="ltr">4030198271</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">الرقم الضريبي (VAT):</span>
              <span className="text-slate-200 font-mono font-bold" dir="ltr">310298412000003</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">العميل المستفيد:</span>
              <span className="text-slate-200 font-bold truncate block">{currentOrder.customerName}</span>
            </div>
          </div>

          {/* Pricing Math adhering strictly to totalCalculationExact */}
          <div className="space-y-2 text-xs bg-[#0B1120] p-5 rounded-2xl border border-slate-800/80">
            <div className="flex justify-between text-slate-400">
              <span>قيمة الحزمة البحثية ({currentOrder.items[0]?.title}):</span>
              <span className="font-mono font-bold text-slate-200 text-sm">{basePriceSar} SAR</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>ضريبة القيمة المضافة (15% ZATCA VAT):</span>
              <span className="font-mono font-bold text-slate-200 text-sm">{vatPriceSar} SAR</span>
            </div>
            <div className="h-px bg-slate-800 my-2"></div>
            <div className="flex justify-between items-baseline">
              <div>
                <span className="text-sm font-black text-white">إجمالي الفاتورة المستحق:</span>
                <span className="text-[11px] text-slate-400 block">شامل ضريبة القيمة المضافة وموثق إلكترونياً</span>
              </div>
              <div className="text-left" dir="ltr">
                <span className="text-2xl font-black text-teal-400 font-mono">
                  {totalPriceSar}
                </span>
                <span className="text-xs font-bold text-teal-400 mr-1">SAR</span>
              </div>
            </div>
          </div>

          {/* B2B Payment Gateways Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-300">
              طريقة السداد المعتمدة للمنشآت والشركات:
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setSelectedPayment('MADA')}
                className={`p-4 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition cursor-pointer ${
                  selectedPayment === 'MADA'
                    ? 'bg-amber-950/40 border-amber-500 text-amber-200 shadow-md'
                    : 'bg-[#0B1120] border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <CreditCard className="w-5 h-5 text-amber-400" />
                <span>مدى (بطاقة أعمال الشركات Mada)</span>
                <span className="text-[10px] text-slate-500 font-normal">سداد فوري مشفر</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPayment('APPLE_PAY')}
                className={`p-4 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition cursor-pointer ${
                  selectedPayment === 'APPLE_PAY'
                    ? 'bg-amber-950/40 border-amber-500 text-amber-200 shadow-md'
                    : 'bg-[#0B1120] border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Smartphone className="w-5 h-5 text-amber-400" />
                <span>Apple Pay</span>
                <span className="text-[10px] text-slate-500 font-normal">تأكيد بلمسة واحدة</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPayment('BANK_TRANSFER')}
                className={`p-4 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition cursor-pointer ${
                  selectedPayment === 'BANK_TRANSFER'
                    ? 'bg-amber-950/40 border-amber-500 text-amber-200 shadow-md'
                    : 'bg-[#0B1120] border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Landmark className="w-5 h-5 text-amber-400" />
                <span>تحويل بنكي رسمي (IBAN)</span>
                <span className="text-[10px] text-slate-500 font-normal">مصرف الإنماء / الأهلي</span>
              </button>
            </div>

            {/* Bank Transfer Details Box if selected */}
            {selectedPayment === 'BANK_TRANSFER' && (
              <div className="bg-[#0B1120] border border-amber-600/40 rounded-2xl p-4 text-xs space-y-2 mt-2">
                <div className="flex justify-between items-center text-slate-300">
                  <span>اسم البنك:</span>
                  <span className="font-bold text-white">مصرف الإنماء (Alinma Bank)</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>اسم المستفيد:</span>
                  <span className="font-bold text-white">مؤسسة رادار توريد جدة لتقنية المعلومات</span>
                </div>
                <div className="flex justify-between items-center text-slate-300 pt-1 border-t border-slate-800">
                  <span>رقم الآيبان الرسمي (IBAN):</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-teal-300 text-xs bg-slate-900 px-2 py-0.5 rounded border border-teal-500/30" dir="ltr">
                      SA0380000452608010198271
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyIban}
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                      title="نسخ الآيبان"
                    >
                      {copiedIban ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={onComplete}
              className="flex-1 py-4 px-6 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-sm md:text-base shadow-xl shadow-teal-950 flex items-center justify-center gap-2 transition cursor-pointer active:scale-98"
            >
              <span>تأكيد السداد والرجوع لمستكشف المنشآت</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="py-4 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Printer className="w-4 h-4 text-teal-400" />
              <span>طباعة الفاتورة الضريبية</span>
            </button>
          </div>
        </section>
      </main>

      {/* QR Code Inspection Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-teal-300 font-bold text-sm">
                <QrCode className="w-5 h-5 text-amber-400" />
                <span>رمز الفاتورة الإلكترونية المعتمد (ZATCA)</span>
              </div>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Simulated Cryptographic QR Display */}
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-inner my-2">
              <div className="w-44 h-44 border-4 border-slate-900 rounded-xl p-2 flex flex-col justify-between">
                <div className="flex justify-between">
                  <div className="w-10 h-10 bg-slate-950 rounded-sm"></div>
                  <div className="w-10 h-10 bg-slate-950 rounded-sm"></div>
                </div>
                <div className="grid grid-cols-4 gap-1 p-2">
                  <div className="h-3 bg-slate-900 rounded"></div>
                  <div className="h-3 bg-slate-900 rounded"></div>
                  <div className="h-3 bg-slate-900 rounded"></div>
                  <div className="h-3 bg-slate-900 rounded"></div>
                </div>
                <div className="flex justify-between items-end">
                  <div className="w-10 h-10 bg-slate-950 rounded-sm"></div>
                  <div className="w-6 h-6 bg-teal-700 rounded-sm"></div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-800 font-bold mt-2" dir="ltr">
                TLV Base64 Encoded · ZATCA Phase 2
              </span>
            </div>

            <div className="bg-[#0B1120] p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs">
              <span className="text-slate-400 text-[11px] block">الحمولة التشفيرية للفاتورة (Raw TLV Payload):</span>
              <p className="font-mono text-[10px] text-teal-300 break-all bg-black/50 p-2 rounded border border-slate-800 leading-relaxed" dir="ltr">
                {currentOrder.zatcaQrPayload}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs"
            >
              إغلاق نافذة الرمز المشفر
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {downloadSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 border border-emerald-500 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>تم تنزيل ملف بيانات الهوريكا والفرص الموثقة بنجاح!</span>
        </div>
      )}
    </div>
  );
};
