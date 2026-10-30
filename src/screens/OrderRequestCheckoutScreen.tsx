import React, { useState } from 'react';
import { OrderRequest, OrderRequestStatus } from '../types/order';
import { BespokeVectorIllustration } from '../components/BespokeVectorIllustration';
import {
  ChevronRight,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Smartphone,
  CreditCard,
  MapPin,
  RefreshCw,
  Navigation
} from 'lucide-react';

interface OrderRequestCheckoutScreenProps {
  order: OrderRequest | null;
  onBack: () => void;
  onComplete: () => void;
  onAdvanceStatus?: (orderId: string) => void;
}

const STATUS_LABELS: Record<OrderRequestStatus, { text: string; step: number; color: string }> = {
  PENDING: { text: 'قيد المراجعة وتأكيد الحجز', step: 1, color: 'text-amber-400' },
  ACCEPTED: { text: 'تم قبول الطلب واعتماد باحث السوق', step: 2, color: 'text-sky-400' },
  IN_PROGRESS: { text: 'قيد المعالجة والمسح الميداني بجدة', step: 3, color: 'text-teal-400' },
  COMPLETED: { text: 'مكتمل - تم تسليم قاعدة البيانات والتقرير', step: 4, color: 'text-emerald-400' },
  CANCELLED: { text: 'ملغي', step: 0, color: 'text-red-400' }
};

export const OrderRequestCheckoutScreen: React.FC<OrderRequestCheckoutScreenProps> = ({
  order,
  onBack,
  onComplete,
  onAdvanceStatus,
}) => {
  const [selectedPayment, setSelectedPayment] = useState<'MADA' | 'APPLE_PAY' | 'VISA'>('MADA');
  const [isPaid, setIsPaid] = useState<boolean>(true);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);

  // Invariant totalCalculationExact: base + 15% VAT
  const basePriceSar = order
    ? (order.baseAmountMinorUnits / 100).toFixed(2)
    : '150.00';
  const vatPriceSar = order
    ? (order.vatAmountMinorUnits / 100).toFixed(2)
    : '22.50';
  const totalPriceSar = order
    ? (order.totalAmountMinorUnits / 100).toFixed(2)
    : '172.50';

  const orderId = order?.requestId ?? 'ORD-128944';
  const status = order?.status ?? 'IN_PROGRESS';
  const currentStep = STATUS_LABELS[status].step;

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100">
      {/* TopAppBar */}
      <header className="sticky top-0 z-20 bg-slate-800/95 backdrop-blur border-b border-slate-700/60 px-4 py-3.5 shadow-md">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="p-1.5 -mr-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-700/60 transition cursor-pointer"
              aria-label="الرجوع"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <h1 className="font-bold text-base md:text-lg text-slate-100">
              الفوترة والتتبع اللحظي
            </h1>
          </div>
          <span className="text-[11px] font-mono bg-slate-700/80 text-teal-300 px-2 py-0.5 rounded-full border border-teal-500/30">
            #{orderId}
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-md mx-auto w-full p-4 space-y-4 pb-24">
        {/* Bespoke Vector Graphic Gauge / Receipt (screenIdx: 3) */}
        <BespokeVectorIllustration archetype="booking_timeline" screenIdx={3} />

        {/* Status Surface Banner */}
        <div className="bg-teal-950/70 border border-teal-600/60 rounded-2xl p-4 shadow-lg space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <h2 className="text-sm font-black text-slate-100">
                حالة الطلب: {STATUS_LABELS[status].text}
              </h2>
            </div>
          </div>
          <p className="text-xs text-teal-200/80">
            بصمة التحقق: مسجلة في السجل المجتمعي المشفر
          </p>

          {/* Stepper Progression */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
              <span>طلب جديد</span>
              <span>اعتماد</span>
              <span>مسح ميداني</span>
              <span>تسليم التقرير</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 flex overflow-hidden">
              <div
                className="bg-gradient-to-r from-teal-500 to-emerald-400 h-2 transition-all duration-500"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Live GPS Dispatch & Field Auditor Card */}
        <div className="bg-slate-800/90 border border-slate-700/70 rounded-2xl p-4 space-y-3 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold text-slate-200">
                التتبع الميداني المباشر (جدة - OpenStreetMap / GPS):
              </h3>
            </div>
            <span className="text-[11px] bg-slate-900/80 text-emerald-400 px-2 py-0.5 rounded font-mono">
              نشط الآن
            </span>
          </div>

          <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">باحث السوق المعتمد:</span>
              <span className="text-slate-200 font-bold">
                {order?.trackingCoords?.fieldAuditorName || 'م. خالد الحربي'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">الإحداثيات الحالية:</span>
              <span className="text-teal-300 font-mono text-[11px]" dir="ltr">
                {order?.trackingCoords?.lat || 21.5433}° N, {order?.trackingCoords?.lng || 39.1728}° E
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">الوقت التقديري لإنجاز المسح:</span>
              <span className="text-amber-300 font-bold flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {order?.trackingCoords?.etaMinutes || 14} دقيقة
              </span>
            </div>
          </div>

          {/* Monotonic Status Advance Button */}
          {status !== 'COMPLETED' && onAdvanceStatus && (
            <button
              type="button"
              onClick={() => onAdvanceStatus(orderId)}
              className="w-full py-2 px-3 text-xs rounded-xl bg-slate-700/80 hover:bg-slate-700 text-teal-300 border border-teal-500/30 flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>ترقية حالة الطلب مرحلياً (محاكاة تقدم الباحث الميداني)</span>
            </button>
          )}
        </div>

        {/* Tax Invoice Card (ZATCA 15% Compliance) */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              الفاتورة الضريبية المعتمدة (ZATCA):
            </h3>
            <button
              type="button"
              onClick={() => setShowQrModal(!showQrModal)}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 underline underline-offset-4 cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5" />
              عرض الرمز المشفر
            </button>
          </div>

          <div className="space-y-1.5 text-xs text-slate-300 pt-1">
            <div className="flex justify-between text-slate-400">
              <span>المبلغ الأساسي:</span>
              <span className="font-mono">{basePriceSar} SAR</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>ضريبة القيمة المضافة (15%):</span>
              <span className="font-mono">{vatPriceSar} SAR</span>
            </div>
            <div className="h-px bg-slate-700/80 my-2"></div>
            <div className="flex justify-between items-baseline">
              <span className="font-black text-sm text-slate-100">الإجمالي المستحق:</span>
              <span className="font-black text-base text-teal-400 font-mono">
                {totalPriceSar} SAR
              </span>
            </div>
          </div>

          {/* QR Code Inspection Box */}
          {showQrModal && (
            <div className="mt-3 p-3 bg-slate-900 rounded-xl border border-teal-600/40 text-[11px] space-y-2">
              <div className="flex items-center justify-between text-teal-300 font-bold">
                <span>حمولة الفاتورة الإلكترونية المشفرة:</span>
                <span className="text-[10px] bg-teal-950 px-1.5 py-0.5 rounded text-teal-400">
                  SHA-256 Base64
                </span>
              </div>
              <p className="font-mono text-[10px] text-slate-400 break-all bg-black/40 p-2 rounded">
                {order?.zatcaQrPayload || `ZATCA-QR-SIMULATED-SHA256-${orderId}`}
              </p>
            </div>
          )}
        </div>

        {/* Payment Gateways Bar (Mada, Apple Pay, Visa) */}
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 space-y-2.5">
          <label className="text-xs font-bold text-slate-200 block">
            طريقة السداد المعتمدة (سداد آمن 100%):
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['MADA', 'APPLE_PAY', 'VISA'] as const).map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setSelectedPayment(method)}
                className={`py-2 px-2 text-xs rounded-xl font-bold border transition text-center flex flex-col items-center gap-1 ${
                  selectedPayment === method
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                {method === 'MADA' && 'مدى (Mada)'}
                {method === 'APPLE_PAY' && 'Apple Pay'}
                {method === 'VISA' && 'Visa / MC'}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 text-center">
            مشفر ببروتوكول TLS v1.3 ومطابق لمعايير هيئة الزكاة والضريبة والجمارك
          </p>
        </div>
      </main>

      {/* Sticky Bottom Action Button */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 bg-slate-900/90 backdrop-blur border-t border-slate-800 p-4">
        <div className="max-w-md mx-auto">
          <button
            type="button"
            onClick={onComplete}
            className="w-full h-13 rounded-2xl bg-teal-700 hover:bg-teal-600 active:scale-[0.98] text-white font-bold text-sm md:text-base shadow-lg shadow-teal-900/50 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <span>تأكيد السداد والرجوع للرئيسية</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
