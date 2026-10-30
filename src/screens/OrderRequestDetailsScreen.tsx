import React, { useState } from 'react';
import {
  FnbLead,
  ResearchPackage,
  CatalogItem
} from '../types/order';
import {
  RESEARCH_PACKAGES,
  JEDDAH_DISTRICTS,
  SUPPLY_PRODUCT_TAGS,
  repository
} from '../data/orderRepository';
import {
  ChevronRight,
  ShieldCheck,
  Building2,
  MapPin,
  Phone,
  ThermometerSnowflake,
  FileSpreadsheet,
  Check,
  CheckCircle2,
  Sparkles,
  Layers,
  Calendar,
  AlertCircle,
  Truck
} from 'lucide-react';

interface OrderRequestDetailsScreenProps {
  item?: CatalogItem | null;
  activeLead?: FnbLead | null;
  onBack: () => void;
  onProceedCheckout: (
    packageId: string,
    companyName: string,
    phone: string,
    selectedDistricts: string[],
    selectedSectors: string[],
    notes: string
  ) => void;
}

export const OrderRequestDetailsScreen: React.FC<OrderRequestDetailsScreenProps> = ({
  activeLead,
  onBack,
  onProceedCheckout
}) => {
  // Use passed lead or fallback to first lead in repo
  const sampleLead: FnbLead = activeLead || repository.getLeads()[0];

  const packages = repository.getPackages();
  const [selectedPackageId, setSelectedPackageId] = useState<string>('pkg_250'); // default 250 leads
  const [clientCompanyName, setClientCompanyName] = useState<string>('شركة النقاء لتوريد الأغذية والمجمدات');
  const [clientPhone, setClientPhone] = useState<string>('0551234567');
  const [clientNotes, setClientNotes] = useState<string>(
    'التركيز على الكافيهات والمطاعم ذات الاستهلاك العالي للفواكه المجمدة IQF والمعجنات الجاهزة للخَبز في شمال جدة'
  );

  // Selected Sectors & Districts
  const [selectedSectors, setSelectedSectors] = useState<string[]>([
    'كافيهات ومقاهي مختصة',
    'مطاعم وسلاسل وجبات',
    'مخابز ومعامل حلويات'
  ]);

  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([
    'حي الروضة',
    'حي الزهراء',
    'شارع التحلية',
    'حي الشاطئ'
  ]);

  const [selectedProducts, setSelectedProducts] = useState<string[]>([
    'فواكه وهريس مجمد',
    'مخبوزات وعجائن مجمدة',
    'ألبان وأجبان'
  ]);

  const toggleSector = (sector: string) => {
    setSelectedSectors((prev) =>
      prev.includes(sector) ? prev.filter((s) => s !== sector) : [...prev, sector]
    );
  };

  const toggleDistrict = (district: string) => {
    setSelectedDistricts((prev) =>
      prev.includes(district) ? prev.filter((d) => d !== district) : [...prev, district]
    );
  };

  const toggleProduct = (prod: string) => {
    setSelectedProducts((prev) =>
      prev.includes(prod) ? prev.filter((p) => p !== prod) : [...prev, prod]
    );
  };

  const currentPkg = packages.find((p) => p.id === selectedPackageId) || packages[1];
  const basePrice = currentPkg.basePriceSar;
  const vatPrice = +(basePrice * 0.15).toFixed(2);
  const totalPrice = +(basePrice + vatPrice).toFixed(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProceedCheckout(
      currentPkg.id,
      clientCompanyName,
      clientPhone,
      selectedDistricts,
      selectedSectors,
      clientNotes
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0B1120] text-slate-100">
      {/* Top Bar Header */}
      <header className="sticky top-0 z-30 bg-[#111827]/95 backdrop-blur border-b border-slate-800 px-4 md:px-8 py-3.5 shadow-md">
        <div className="flex items-center gap-3 max-w-6xl mx-auto">
          <button
            type="button"
            onClick={onBack}
            className="p-1.5 -mr-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
            aria-label="الرجوع إلى المستكشف"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div>
            <h1 className="font-extrabold text-base md:text-lg text-white">
              ملف المنشأة وتخصيص حملة المسح الميداني
            </h1>
            <p className="text-xs text-slate-400">
              نموذج تدقيق بيانات الهوريكا وتحديد نطاق البحث السوقي بجدة
            </p>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-4 md:p-8 space-y-8 pb-32">
        {/* ======================================================== */}
        {/* SECTION A: FULL LEAD DOSSIER PREVIEW */}
        {/* ======================================================== */}
        <section className="bg-[#111827] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800/80 pb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  نموذج بيانات المنشأة الموثقة (Dossier Preview)
                </span>
                <span className="text-xs font-mono text-slate-400" dir="ltr">
                  ID: {sampleLead.id}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white">
                {sampleLead.nameAr}
              </h2>
              <p className="text-xs text-slate-400 font-mono" dir="ltr">
                {sampleLead.nameEn}
              </p>
            </div>

            <div className="text-left bg-[#0B1120] p-3 rounded-2xl border border-slate-800" dir="ltr">
              <span className="text-[10px] text-slate-400 block">رقم السجل التجاري الرسمي:</span>
              <span className="font-mono text-sm font-bold text-teal-300">
                CR-{sampleLead.commercialRegistrationNo}
              </span>
            </div>
          </div>

          {/* Dossier 5 Core Parameters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {/* 1. Facility & Branch Location */}
            <div className="bg-[#0B1120] border border-slate-800/80 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-teal-400 font-bold">
                <Building2 className="w-4 h-4" />
                <span>1. الموقع الجغرافي والفرع بجدة</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-semibold">
                {sampleLead.district} - {sampleLead.street}
              </p>
              <div className="text-[11px] font-mono text-slate-400 pt-1" dir="ltr">
                Google Maps GPS: {sampleLead.coordinates.lat}° N, {sampleLead.coordinates.lng}° E
              </div>
            </div>

            {/* 2. Decision Maker Details */}
            <div className="bg-[#0B1120] border border-slate-800/80 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold">
                <Phone className="w-4 h-4" />
                <span>2. مسؤول المشتريات والتوريد</span>
              </div>
              <p className="text-slate-200 font-bold">
                {sampleLead.decisionMaker.name}
              </p>
              <p className="text-[11px] text-slate-400">
                المسمى: {sampleLead.decisionMaker.title}
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-400">الجوال المباشر:</span>
                <span className="font-mono text-xs font-bold text-teal-300 bg-slate-900 px-2 py-0.5 rounded border border-teal-500/30" dir="ltr">
                  {sampleLead.decisionMaker.phone}
                </span>
              </div>
            </div>

            {/* 3. Cold Storage & Freezers */}
            <div className="bg-[#0B1120] border border-slate-800/80 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold">
                <ThermometerSnowflake className="w-4 h-4" />
                <span>3. التخزين التبريدي وسعة الفريزر</span>
              </div>
              <p className="text-slate-200 font-bold">
                {sampleLead.frozenDemand.coldStorageType}
              </p>
              <p className="text-[11px] text-teal-300 font-mono" dir="ltr">
                Freezer Volume: {sampleLead.frozenDemand.freezerCapacityM3} m³
              </p>
              <p className="text-[11px] text-slate-400">
                درجة حرارة الفحص الميداني: -18°C إلى -22°C
              </p>
            </div>

            {/* 4. Products Needed */}
            <div className="bg-[#0B1120] border border-slate-800/80 rounded-2xl p-4 space-y-2 md:col-span-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold">
                <Layers className="w-4 h-4" />
                <span>4. المنتجات الغذائية والمجمدات المطلوبة شهرياً</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {sampleLead.frozenDemand.categories.map((c, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-amber-300 border border-slate-700 font-medium"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                <strong className="text-slate-300">فجوة المورد الحالي:</strong> {sampleLead.frozenDemand.currentSupplierGap}
              </p>
            </div>

            {/* 5. Terms & Purchasing Cadence */}
            <div className="bg-[#0B1120] border border-slate-800/80 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Truck className="w-4 h-4" />
                <span>5. شروط التوريد والدفع</span>
              </div>
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">معدل الاستهلاك:</span>
                  <span className="text-slate-200 font-mono font-bold">
                    {sampleLead.frozenDemand.estimatedMonthlyVolumeKg} كجم/شهر
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">دورة الشراء:</span>
                  <span className="text-slate-200 font-bold">{sampleLead.frozenDemand.purchasingCycle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">أوقات الاستلام:</span>
                  <span className="text-slate-200">{sampleLead.frozenDemand.deliveryWindows}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">شروط الدفع:</span>
                  <span className="text-teal-300 font-bold">{sampleLead.frozenDemand.paymentTerms}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION B: CUSTOM LEAD GENERATION CAMPAIGN BUILDER */}
        {/* ======================================================== */}
        <section className="bg-[#111827] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-950 text-teal-300 border border-teal-500/40 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                تخصيص حملة المسح الميداني
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white">
              بناء حزمة البحث السوقي المخصصة لشركتك
            </h2>
            <p className="text-xs text-slate-400">
              اختر حجم العينة المستهدفة، القطاعات، والأحياء بجدة ليقوم فريق الباحثين بحصرها وتدقيقها ميدانياً
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Select Package Tier */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-300">
                1. حدد حجم عينة المنشآت المستهدفة وحزمة البحث:
              </label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {packages.map((pkg) => {
                  const isSelected = selectedPackageId === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackageId(pkg.id)}
                      className={`rounded-2xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between space-y-4 relative ${
                        isSelected
                          ? 'bg-teal-950/40 border-teal-500 shadow-xl shadow-teal-950/50'
                          : 'bg-[#0B1120] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {pkg.popular && (
                        <span className="absolute -top-3 right-4 bg-amber-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow">
                          الأكثر طلباً لموردي الأغذية
                        </span>
                      )}

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-teal-300">
                            {pkg.badge}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {pkg.turnaroundDays} أيام عمل
                          </span>
                        </div>

                        <h3 className="font-extrabold text-base text-white">
                          {pkg.name}
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {pkg.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-800/80 flex items-baseline justify-between">
                        <span className="text-xs text-slate-400">الاستثمار المعتمد:</span>
                        <div className="text-left" dir="ltr">
                          <span className="text-lg font-black text-white font-mono">
                            {pkg.basePriceSar.toLocaleString()}
                          </span>
                          <span className="text-xs font-bold text-teal-400 mr-1">ر.س</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Target Sectors Checkboxes */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold text-slate-300">
                2. القطاعات المستهدفة في الحصر الميداني:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  'كافيهات ومقاهي مختصة',
                  'مطاعم وسلاسل وجبات',
                  'مخابز ومعامل حلويات',
                  'مطابخ سحابية وتموين'
                ].map((sector) => {
                  const checked = selectedSectors.includes(sector);
                  return (
                    <button
                      type="button"
                      key={sector}
                      onClick={() => toggleSector(sector)}
                      className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between transition cursor-pointer ${
                        checked
                          ? 'bg-teal-950/60 border-teal-500 text-teal-200'
                          : 'bg-[#0B1120] border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span>{sector}</span>
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                        checked ? 'bg-teal-500 border-teal-400 text-slate-950' : 'border-slate-700'
                      }`}>
                        {checked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Target Districts Checkboxes */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold text-slate-300">
                3. أحياء محافظة جدة المستهدفة بالزيارات:
              </label>
              <div className="flex flex-wrap gap-2">
                {JEDDAH_DISTRICTS.filter((d) => d !== 'الكل').map((district) => {
                  const checked = selectedDistricts.includes(district);
                  return (
                    <button
                      type="button"
                      key={district}
                      onClick={() => toggleDistrict(district)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
                        checked
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold'
                          : 'bg-[#0B1120] border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span>{district}</span>
                      {checked && <Check className="w-3 h-3 text-emerald-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Needed Products Checkboxes */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold text-slate-300">
                4. المنتجات المطلوب استقصاء احتياج المنشآت لها:
              </label>
              <div className="flex flex-wrap gap-2">
                {SUPPLY_PRODUCT_TAGS.filter((p) => p !== 'الكل').map((prod) => {
                  const checked = selectedProducts.includes(prod);
                  return (
                    <button
                      type="button"
                      key={prod}
                      onClick={() => toggleProduct(prod)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
                        checked
                          ? 'bg-amber-950/70 border-amber-500 text-amber-200 font-bold'
                          : 'bg-[#0B1120] border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span>{prod}</span>
                      {checked && <Check className="w-3 h-3 text-amber-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Client Company & Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  اسم شركتكم أو المؤسسة المستفيدة:
                </label>
                <input
                  type="text"
                  required
                  value={clientCompanyName}
                  onChange={(e) => setClientCompanyName(e.target.value)}
                  className="w-full bg-[#0B1120] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                  placeholder="مثال: شركة التوريد المتميزة للأغذية والمجمدات"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  رقم الجوال لتلقي التقرير الفوري وقاعدة البيانات:
                </label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full bg-[#0B1120] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500 font-mono text-left"
                  dir="ltr"
                  placeholder="05xxxxxxxx"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="block text-xs font-bold text-slate-300">
                  توجيهات وملاحظات إضافية لباحثي السوق الميدانيين بجدة:
                </label>
                <textarea
                  rows={3}
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  className="w-full bg-[#0B1120] border border-slate-700/80 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-teal-500 resize-none leading-relaxed"
                />
              </div>
            </div>

            {/* Order Investment Summary Bar */}
            <div className="bg-[#0B1120] border border-teal-600/40 rounded-2xl p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <h4 className="font-extrabold text-sm text-white">
                    ملخص أمر العمل للحملة البحثية ({currentPkg.name})
                  </h4>
                  <p className="text-xs text-slate-400">
                    يشمل إصدار فاتورة ضريبية نظامية متوافقة 100% مع هيئة الزكاة والضريبة والجمارك (ZATCA)
                  </p>
                </div>

                <div className="text-left font-mono" dir="ltr">
                  <div className="text-xs text-slate-400">
                    المبلغ الأساسي: {basePrice.toFixed(2)} SAR
                  </div>
                  <div className="text-xs text-slate-400">
                    ضريبة القيمة المضافة (15%): {vatPrice.toFixed(2)} SAR
                  </div>
                  <div className="text-base font-black text-teal-400">
                    الإجمالي المستحق: {totalPrice.toFixed(2)} SAR
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-sm md:text-base shadow-xl shadow-teal-950 flex items-center justify-center gap-2 transition active:scale-[0.99] cursor-pointer"
              >
                <span>اعتماد وتأكيد الحملة والمتابعة للفوترة والتتبع</span>
                <span className="text-xs font-mono font-normal opacity-90" dir="ltr">
                  ({totalPrice.toFixed(2)} SAR شامل الضريبة)
                </span>
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};
