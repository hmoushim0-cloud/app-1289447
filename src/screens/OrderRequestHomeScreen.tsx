import React, { useState } from 'react';
import { CatalogItem } from '../types/order';
import { BespokeVectorIllustration } from '../components/BespokeVectorIllustration';
import { CheckCircle2, Clock, Calendar, Sparkles, ChevronLeft, MapPin, Search } from 'lucide-react';

interface OrderRequestHomeScreenProps {
  catalog: CatalogItem[];
  selectedItem: CatalogItem | null;
  onSelectItem: (item: CatalogItem) => void;
  onQuickCheckout: (selectedDay: string, selectedTime: string) => void;
  onOpenTracking?: () => void;
  hasActiveOrder?: boolean;
}

export const OrderRequestHomeScreen: React.FC<OrderRequestHomeScreenProps> = ({
  catalog,
  onSelectItem,
  onQuickCheckout,
  onOpenTracking,
  hasActiveOrder = false,
}) => {
  const days = ['السبت 14', 'الأحد 15', 'الاثنين 16', 'الثلاثاء 17'];
  const timeSlots = ['09:00 ص', '11:30 ص', '02:00 م', '04:30 م'];

  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(1); // Sunday 15 selected by default
  const [selectedTimeIdx, setSelectedTimeIdx] = useState<number>(1); // 11:30 ص selected by default
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCatalog = catalog.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100">
      {/* TopAppBar matching Jetpack Compose */}
      <header className="sticky top-0 z-20 bg-slate-800/95 backdrop-blur border-b border-slate-700/60 px-4 py-3.5 shadow-md">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div>
            <h1 className="font-bold text-base md:text-lg text-slate-100 leading-tight">
              مشروع باحث سوق لجمع بيانات الكا
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              نظام رقمي سحابي متكامل فائق الأداء
            </p>
          </div>
          {hasActiveOrder && onOpenTracking && (
            <button
              onClick={onOpenTracking}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-800/80 text-teal-200 border border-teal-600/50 hover:bg-teal-700 transition"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              التتبع المباشر
            </button>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-md mx-auto w-full p-4 space-y-4 pb-20">
        {/* Bespoke Vector Graphic Header (archetype: booking_timeline, screenIdx: 1) */}
        <BespokeVectorIllustration archetype="booking_timeline" screenIdx={1} />

        {/* Lead Scope Notification Banner */}
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-3 flex items-start gap-2.5 text-xs text-slate-300">
          <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold text-amber-300">نطاق العمل بجدة:</span> باحث سوق متخصص لتوليد العملاء المحتملين (Lead Generation) وحصر الكافيهات والمطاعم والمخابز لتوريد المنتجات الغذائية والمجمدات.
          </div>
        </div>

        {/* Date Selector Section */}
        <section className="space-y-2">
          <label className="block text-sm font-bold text-slate-200">
            اختر الموعد المتاح للحجز المباشر:
          </label>
          <div className="grid grid-cols-4 gap-2">
            {days.map((day, idx) => {
              const [dayName, dayNum] = day.split(' ');
              const isSelected = selectedDayIdx === idx;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDayIdx(idx)}
                  className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all duration-200 border ${
                    isSelected
                      ? 'bg-teal-700 text-white border-teal-500 shadow-md shadow-teal-900/30 font-bold'
                      : 'bg-slate-800/90 text-slate-300 border-slate-700/60 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-[11px] opacity-90">{dayName}</span>
                  <span className="text-base font-bold mt-0.5">{dayNum}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Time Slots Section */}
        <section className="space-y-2">
          <label className="block text-sm font-bold text-slate-200">
            الفترات الزمنية المعتمدة:
          </label>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((slot, idx) => {
              const isSelected = selectedTimeIdx === idx;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTimeIdx(idx)}
                  className={`py-2 px-1 text-xs rounded-xl font-medium border text-center transition ${
                    isSelected
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/80 font-bold shadow-sm'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700/60 hover:bg-slate-800'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </section>

        {/* Booking Card Section */}
        <section className="bg-slate-800/90 border border-slate-700/70 rounded-2xl p-4 shadow-lg space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-bold text-slate-100">
              محددات الموعد والجدول الزمني المباشر:
            </h2>
          </div>
          <ul className="text-xs text-slate-400 space-y-1.5 leading-relaxed">
            <li className="flex items-center gap-1.5">
              <span className="text-teal-400 text-sm">•</span>
              تأكيد فوري وحجز مباشر عبر المنظومة السحابية المعتمدة
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-teal-400 text-sm">•</span>
              إشعار تقويم تلقائي SMS ورسالة تذكير قبل الموعد بساعتين
            </li>
          </ul>

          <button
            type="button"
            onClick={() => onQuickCheckout(days[selectedDayIdx], timeSlots[selectedTimeIdx])}
            className="w-full py-3 px-4 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-sm shadow-md shadow-teal-900/40 transition active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>حجز الموعد المختار وتأكيد الجلسة</span>
            <ChevronLeft className="w-4 h-4 rotate-180" />
          </button>
        </section>

        {/* Catalog Services Section */}
        <section className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-200">
              قائمة الخدمات المعتمدة للتخصيص:
            </h2>
            <span className="text-xs text-slate-400 font-medium">
              {filteredCatalog.length} باقات متاحة
            </span>
          </div>

          {/* Quick Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
            <input
              type="text"
              placeholder="ابحث في الباقات والخدمات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pr-9 pl-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="space-y-2.5">
            {filteredCatalog.map((item) => (
              <div
                key={item.id}
                className="bg-slate-800/90 hover:bg-slate-800 border border-slate-700/70 hover:border-teal-600/50 rounded-2xl p-4 transition shadow-md flex items-center justify-between gap-3 group"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm text-slate-100 group-hover:text-teal-300 transition">
                      {item.title}
                    </h3>
                    {item.category && (
                      <span className="text-[10px] bg-slate-700/80 text-amber-300 px-2 py-0.5 rounded-full font-medium">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectItem(item)}
                  className="shrink-0 px-3.5 py-2 rounded-xl bg-teal-700 hover:bg-teal-600 active:scale-95 text-white font-bold text-xs shadow transition cursor-pointer"
                >
                  {item.priceMinorUnits / 100} SAR
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
