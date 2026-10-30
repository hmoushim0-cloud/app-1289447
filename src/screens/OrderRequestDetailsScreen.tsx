import React, { useState } from 'react';
import { CatalogItem } from '../types/order';
import { BespokeVectorIllustration } from '../components/BespokeVectorIllustration';
import { ChevronRight, ShieldCheck, Check, Phone, Building2, Calendar, Clock } from 'lucide-react';

interface OrderRequestDetailsScreenProps {
  item: CatalogItem | null;
  selectedDay?: string;
  selectedTime?: string;
  onBack: () => void;
  onProceedCheckout: (phone: string, notes: string) => void;
}

export const OrderRequestDetailsScreen: React.FC<OrderRequestDetailsScreenProps> = ({
  item,
  selectedDay = 'الأحد 15',
  selectedTime = '11:30 ص',
  onBack,
  onProceedCheckout,
}) => {
  const [customerPhone, setCustomerPhone] = useState<string>('0501234567');
  const [customerNotes, setCustomerNotes] = useState<string>('التركيز على قطاع كافيهات ومطاعم شمال وغرب جدة');

  const title = item?.title ?? 'الخدمة الأساسية المعتمدة';
  const description =
    item?.description ?? 'المواصفات الفنية المعتمدة للطلب وفق خطة العمل';
  const priceSar = ((item?.priceMinorUnits ?? 5000) / 100).toFixed(2);
  const vatSar = (((item?.priceMinorUnits ?? 5000) * 0.15) / 100).toFixed(2);
  const totalSar = (
    Number(priceSar) + Number(vatSar)
  ).toFixed(2);

  const deliverables = item?.deliverables ?? [
    'قائمة الكافيهات والمطاعم المعتمدة في جدة',
    'بيانات مسؤولي المشتريات وممثلي التوريد المباشرين',
    'تقرير الجاهزية التشغيلية لتوريد المجمدات والمواد الغذائية'
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100">
      {/* TopAppBar matching Compose TopAppBar */}
      <header className="sticky top-0 z-20 bg-slate-800/95 backdrop-blur border-b border-slate-700/60 px-4 py-3.5 shadow-md">
        <div className="flex items-center gap-3 max-w-md mx-auto">
          <button
            type="button"
            onClick={onBack}
            className="p-1.5 -mr-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-700/60 transition cursor-pointer"
            aria-label="الرجوع"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <h1 className="font-bold text-base md:text-lg text-slate-100">
            تفاصيل وتخصيص الخدمة
          </h1>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-md mx-auto w-full p-4 space-y-4 pb-24">
        {/* Bespoke Vector Graphic Diagnostic / Route (screenIdx: 2) */}
        <BespokeVectorIllustration archetype="booking_timeline" screenIdx={2} />

        {/* Selected Service Detail Card */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 shadow-lg space-y-3">
          <div className="space-y-1">
            <h2 className="text-lg font-black text-slate-100">{title}</h2>
            <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
          </div>

          <div className="pt-2 border-t border-slate-700/60 flex items-baseline justify-between">
            <span className="text-xs text-slate-400 font-medium">السعر التقديري الأساسي:</span>
            <span className="text-lg font-bold text-teal-400">
              {priceSar} SAR
            </span>
          </div>

          <div className="bg-slate-900/60 rounded-xl p-2.5 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>الموعد المختار: <strong>{selectedDay}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{selectedTime}</span>
            </div>
          </div>
        </div>

        {/* Deliverables Checklist */}
        <div className="bg-slate-800/70 border border-slate-700/60 rounded-2xl p-4 space-y-2.5">
          <h3 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            مخرجات البحث السوقي المعتمدة:
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            {deliverables.map((d, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-teal-900/60 border border-teal-500/60 text-teal-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5" />
                </span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Execution Invariants Card */}
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 space-y-2">
          <h3 className="text-sm font-bold text-slate-200">
            محددات التنفيذ والجدول الزمني:
          </h3>
          <ul className="text-xs text-slate-400 space-y-1.5 leading-relaxed">
            <li className="flex items-center gap-1.5">
              <span className="text-teal-400 text-sm">•</span>
              آلية التنفيذ: مهندسون معتمدون وربط سحابي مشفر
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-teal-400 text-sm">•</span>
              موعد التسليم: فوري وفق مراحل الإنجاز المعتمدة
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-teal-400 text-sm">•</span>
              التوافق: احتساب ضريبة القيمة المضافة 15%
            </li>
          </ul>
        </div>

        {/* Contact info customization */}
        <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 space-y-3">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-amber-400" />
            بيانات الاتصال والتخصيص:
          </h3>

          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-medium">رقم الجوال لتلقي التقرير والإشعار:</label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-teal-500 font-mono text-left"
              placeholder="05xxxxxxxx"
              dir="ltr"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-medium">ملاحظات وتوجيهات العميل لباحث السوق:</label>
            <textarea
              rows={2}
              value={customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 focus:outline-none focus:border-teal-500 resize-none"
            />
          </div>
        </div>
      </main>

      {/* Sticky Bottom Action Button */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 bg-slate-900/90 backdrop-blur border-t border-slate-800 p-4">
        <div className="max-w-md mx-auto">
          <button
            type="button"
            onClick={() => onProceedCheckout(customerPhone, customerNotes)}
            className="w-full h-13 rounded-2xl bg-teal-700 hover:bg-teal-600 active:scale-[0.98] text-white font-bold text-sm md:text-base shadow-lg shadow-teal-900/50 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <span>تأكيد والمتابعة للدفع والتتبع</span>
            <span className="text-xs opacity-80 font-normal">({totalSar} SAR شامل الضريبة)</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
