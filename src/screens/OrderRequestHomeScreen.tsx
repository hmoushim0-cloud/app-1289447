import React, { useState } from 'react';
import {
  FnbLead,
  FnbCategory,
  CatalogItem
} from '../types/order';
import {
  JEDDAH_DISTRICTS,
  FACILITY_CATEGORIES,
  SUPPLY_PRODUCT_TAGS,
  repository
} from '../data/orderRepository';
import {
  Search,
  Building2,
  Coffee,
  UtensilsCrossed,
  CakeSlice,
  Layers,
  ThermometerSnowflake,
  Phone,
  MapPin,
  ShieldCheck,
  Download,
  Filter,
  Eye,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ExternalLink,
  ChevronLeft,
  X
} from 'lucide-react';

interface OrderRequestHomeScreenProps {
  catalog?: CatalogItem[];
  selectedItem?: CatalogItem | null;
  onSelectItem?: (item: CatalogItem) => void;
  onQuickCheckout?: (selectedDay: string, selectedTime: string) => void;
  onOpenTracking?: () => void;
  onInspectLead: (lead: FnbLead) => void;
  onStartCustomCampaign: () => void;
  hasActiveOrder?: boolean;
}

export const OrderRequestHomeScreen: React.FC<OrderRequestHomeScreenProps> = ({
  onInspectLead,
  onStartCustomCampaign,
  onOpenTracking,
  hasActiveOrder = false
}) => {
  const allLeads = repository.getLeads();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('الكل');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedProduct, setSelectedProduct] = useState<string>('الكل');
  const [inspectedModalLead, setInspectedModalLead] = useState<FnbLead | null>(null);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState(false);

  // Filtered leads
  const filteredLeads = allLeads.filter((lead) => {
    const matchesSearch =
      searchQuery === '' ||
      lead.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.street.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.frozenDemand.categories.some((c) =>
        c.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesDistrict =
      selectedDistrict === 'الكل' || lead.district === selectedDistrict;

    const matchesCategory =
      selectedCategory === 'ALL' || lead.category === selectedCategory;

    const matchesProduct =
      selectedProduct === 'الكل' ||
      lead.frozenDemand.categories.includes(selectedProduct);

    return matchesSearch && matchesDistrict && matchesCategory && matchesProduct;
  });

  const handleExportCsv = () => {
    const csvContent = repository.exportLeadsToCsv(filteredLeads);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `jeddah_horeca_leads_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccessToast(true);
    setTimeout(() => setDownloadSuccessToast(false), 3500);
  };

  const getCategoryBadge = (cat: FnbCategory) => {
    switch (cat) {
      case 'CAFE':
        return {
          label: 'كافيه مختص',
          icon: Coffee,
          badgeColor: 'bg-amber-950/70 text-amber-300 border-amber-600/40'
        };
      case 'RESTAURANT':
        return {
          label: 'مطعم راقٍ',
          icon: UtensilsCrossed,
          badgeColor: 'bg-emerald-950/70 text-emerald-300 border-emerald-600/40'
        };
      case 'BAKERY':
        return {
          label: 'مخبز ومعجنات',
          icon: CakeSlice,
          badgeColor: 'bg-purple-950/70 text-purple-300 border-purple-600/40'
        };
      case 'CLOUD_KITCHEN':
        return {
          label: 'مطبخ سحابي',
          icon: Layers,
          badgeColor: 'bg-sky-950/70 text-sky-300 border-sky-600/40'
        };
      case 'HOTEL_CATERING':
        return {
          label: 'تموين وفنادق',
          icon: Building2,
          badgeColor: 'bg-rose-950/70 text-rose-300 border-rose-600/40'
        };
      default:
        return {
          label: 'منشأة غذائية',
          icon: Building2,
          badgeColor: 'bg-slate-800 text-slate-300 border-slate-700'
        };
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0B1120] text-slate-100">
      {/* Executive SaaS Top Bar */}
      <header className="sticky top-0 z-30 bg-[#111827]/95 backdrop-blur border-b border-slate-800/80 px-4 md:px-8 py-3.5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 max-w-7xl mx-auto">
          {/* Brand Zone */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-700 flex items-center justify-center shadow-md shadow-teal-900/40 shrink-0">
              <ThermometerSnowflake className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base md:text-lg text-white tracking-tight">
                  رادار توريد جدة
                </h1>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-teal-300" dir="ltr">
                  Jeddah HORECA Leads
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                استخبارات سوق الأغذية والمجمدات وسلاسل التوريد لكافيهات ومطاعم جدة
              </p>
            </div>
          </div>

          {/* Action Zone */}
          <div className="flex items-center gap-2.5 self-end md:self-auto">
            <button
              type="button"
              onClick={handleExportCsv}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 flex items-center gap-1.5 transition active:scale-95 shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-teal-400" />
              <span>تصدير العينة (CSV)</span>
            </button>

            <button
              type="button"
              onClick={onStartCustomCampaign}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-teal-600 hover:bg-teal-500 text-white shadow-md shadow-teal-950 flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>طلب مسح ميداني مخصص</span>
            </button>

            {hasActiveOrder && onOpenTracking && (
              <button
                type="button"
                onClick={onOpenTracking}
                className="px-3 py-2 text-xs font-bold rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 transition cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>الحملة النشطة</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Viewport */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 space-y-6">
        {/* KPI Summary Cards Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 shadow-sm hover:border-slate-700 transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400">إجمالي المنشآت الموثقة</span>
              <div className="w-7 h-7 rounded-lg bg-teal-950/80 border border-teal-600/30 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white font-mono tabular-nums">1,420</span>
              <span className="text-xs text-emerald-400 font-bold">منشأة بجدة</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">تحديث ميداني خلال الـ 48 ساعة الماضية</p>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 shadow-sm hover:border-slate-700 transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400">كافيهات ومقاهي مختصة</span>
              <div className="w-7 h-7 rounded-lg bg-amber-950/80 border border-amber-600/30 flex items-center justify-center">
                <Coffee className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white font-mono tabular-nums">640</span>
              <span className="text-xs text-amber-300 font-bold">مقهى نشط</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">طلب عالي على الفواكه المجمدة والمعجنات</p>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 shadow-sm hover:border-slate-700 transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400">مطاعم ومطابخ سحابية</span>
              <div className="w-7 h-7 rounded-lg bg-sky-950/80 border border-sky-600/30 flex items-center justify-center">
                <UtensilsCrossed className="w-4 h-4 text-sky-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white font-mono tabular-nums">510</span>
              <span className="text-xs text-sky-300 font-bold">منشأة إعاشة</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">استهلاك شهري يتجاوز 180 طن مجمدات</p>
          </div>

          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 shadow-sm hover:border-slate-700 transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400">مخابز ومعامل حلويات</span>
              <div className="w-7 h-7 rounded-lg bg-purple-950/80 border border-purple-600/30 flex items-center justify-center">
                <CakeSlice className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white font-mono tabular-nums">270</span>
              <span className="text-xs text-purple-300 font-bold">مخبز آلي ومعمل</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">غرف تبريد مركزية جاهزة للتوريد الضخم</p>
          </div>
        </section>

        {/* Filter and Search Console */}
        <section className="bg-[#111827] border border-slate-800 rounded-2xl p-4 md:p-5 shadow-md space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
              <input
                type="text"
                placeholder="ابحث باسم المقهى، المطعم، الحي بجدة، أو الصنف (مثل: هريس، كرواسون، دجاج)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0B1120] border border-slate-700/80 rounded-xl pr-10 pl-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition"
              />
            </div>

            {/* Category Segmented Selector */}
            <div className="flex items-center overflow-x-auto pb-1 md:pb-0 gap-1.5 p-1 bg-[#0B1120] border border-slate-800 rounded-xl text-xs shrink-0">
              {FACILITY_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-teal-700 text-white shadow-sm font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* District Filter Chips */}
          <div className="space-y-1.5">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              أحياء مدينة جدة المستهدفة:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {JEDDAH_DISTRICTS.map((district) => (
                <button
                  key={district}
                  type="button"
                  onClick={() => setSelectedDistrict(district)}
                  className={`px-3 py-1 text-xs rounded-lg transition border cursor-pointer ${
                    selectedDistrict === district
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/70 font-bold'
                      : 'bg-[#0B1120] text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {district}
                </button>
              ))}
            </div>
          </div>

          {/* Product Needs Filter Chips */}
          <div className="space-y-1.5 pt-1 border-t border-slate-800/80">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <ThermometerSnowflake className="w-3.5 h-3.5 text-amber-400" />
              أصناف المجمدات والأغذية المطلوبة:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {SUPPLY_PRODUCT_TAGS.map((prod) => (
                <button
                  key={prod}
                  type="button"
                  onClick={() => setSelectedProduct(prod)}
                  className={`px-2.5 py-1 text-xs rounded-lg transition border cursor-pointer ${
                    selectedProduct === prod
                      ? 'bg-amber-950/80 text-amber-300 border-amber-500/70 font-bold'
                      : 'bg-[#0B1120] text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {prod}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Live Leads Directory Header */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white">
              عينة المنشآت الموثقة ميدانياً بجدة
            </h2>
            <span className="text-xs bg-teal-950/80 text-teal-300 px-2.5 py-0.5 rounded-full border border-teal-600/40 font-mono font-bold">
              {filteredLeads.length} منشأة مطابقة
            </span>
          </div>

          <span className="text-xs text-slate-400 hidden sm:inline">
            الأرقام المباشرة مفتوحة بالكامل في الحزم البحثية المعتمدة
          </span>
        </div>

        {/* Lead Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLeads.map((lead) => {
            const badge = getCategoryBadge(lead.category);
            const Icon = badge.icon;

            return (
              <div
                key={lead.id}
                className="bg-[#111827] border border-slate-800 hover:border-teal-500/40 rounded-2xl p-5 shadow-md transition-all duration-200 space-y-4 group"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 ${badge.badgeColor}`}>
                        <Icon className="w-3 h-3" />
                        {badge.label}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400" dir="ltr">
                        #{lead.id}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition">
                      {lead.nameAr}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium" dir="ltr">
                      {lead.nameEn}
                    </p>
                  </div>

                  <span className="shrink-0 text-[11px] bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    موثق
                  </span>
                </div>

                {/* Location & Cold Storage Specs */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-[#0B1120] rounded-xl p-3 border border-slate-800/80">
                  <div className="space-y-1">
                    <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                      <MapPin className="w-3 h-3 text-teal-400" />
                      الموقع بجدة:
                    </span>
                    <p className="text-slate-200 font-semibold">{lead.district}</p>
                    <p className="text-[10px] text-slate-500 line-clamp-1">{lead.street}</p>
                  </div>

                  <div className="space-y-1 border-r border-slate-800 pr-2">
                    <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                      <ThermometerSnowflake className="w-3 h-3 text-sky-400" />
                      التخزين التبريدي:
                    </span>
                    <p className="text-slate-200 font-semibold line-clamp-1">{lead.frozenDemand.coldStorageType}</p>
                    <p className="text-[10px] text-teal-400 font-mono" dir="ltr">
                      {lead.frozenDemand.freezerCapacityM3} m³ Capacity
                    </p>
                  </div>
                </div>

                {/* Needed Products Pills */}
                <div className="space-y-1.5">
                  <span className="text-[11px] text-slate-400 font-medium">أصناف المجمدات المطلوبة شهرياً:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {lead.frozenDemand.categories.map((c, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-slate-800/90 text-amber-300 px-2 py-0.5 rounded-md border border-slate-700/60"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Decision Maker & Partially Masked Phone */}
                <div className="flex items-center justify-between text-xs bg-slate-900/60 px-3 py-2 rounded-xl border border-slate-800/60">
                  <div className="space-y-0.5">
                    <span className="text-[11px] text-slate-400">مسؤول المشتريات:</span>
                    <p className="font-bold text-slate-200">{lead.decisionMaker.name}</p>
                    <p className="text-[10px] text-slate-500">{lead.decisionMaker.title}</p>
                  </div>

                  <div className="text-left" dir="ltr">
                    <span className="text-[10px] text-slate-400 block">الجوال المباشر:</span>
                    <span className="font-mono text-xs font-bold text-teal-400 bg-slate-950 px-2 py-0.5 rounded border border-teal-500/30">
                      {lead.decisionMaker.maskedPhone}
                    </span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setInspectedModalLead(lead);
                    }}
                    className="flex-1 py-2 px-3 text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-teal-500/40 flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-teal-400" />
                    <span>معاينة بطاقة العميل</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onInspectLead(lead)}
                    className="py-2 px-3.5 text-xs font-bold rounded-xl bg-teal-600 hover:bg-teal-500 text-white flex items-center justify-center gap-1 transition shadow cursor-pointer active:scale-95"
                  >
                    <span>طلب الملف الكامل</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </section>

        {/* Empty State */}
        {filteredLeads.length === 0 && (
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-12 text-center space-y-3">
            <Filter className="w-8 h-8 text-slate-500 mx-auto" />
            <h3 className="text-sm font-bold text-white">لا توجد منشآت مطابقة للفلاتر المحددة</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              جرب تغيير الحي أو تصنيف المنتجات، أو اطلب مسحاً ميدانياً مخصصاً لكافة مناطق جدة.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedDistrict('الكل');
                setSelectedCategory('ALL');
                setSelectedProduct('الكل');
              }}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-teal-700 text-white"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        )}

        {/* Enterprise Bottom Banner */}
        <section className="bg-gradient-to-r from-teal-950 via-slate-900 to-[#111827] border border-teal-700/50 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1.5 text-center md:text-right">
            <h3 className="text-base font-extrabold text-white">
              هل تبحث عن تغطية حصرية لكامل كافيهات ومطاعم جدة؟
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              نوفر حزم بحث سوقية مخصصة تشمل الزيارات الميدانية الموثقة، تدقيق أرقام السجلات التجارية، وفحص غرف التبريد والأسعار التنافسية مع إصدار فواتير ضريبية إلكترونية معتمدة بهيئة الزكاة (ZATCA).
            </p>
          </div>

          <button
            type="button"
            onClick={onStartCustomCampaign}
            className="shrink-0 px-5 py-3 text-xs md:text-sm font-extrabold rounded-xl bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-950 flex items-center gap-2 transition cursor-pointer active:scale-95"
          >
            <span>استعراض وتخصيص باقات البحث الميداني</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </section>
      </main>

      {/* Modal: Lead Dossier Quick Inspection */}
      {inspectedModalLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111827] border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button
              type="button"
              onClick={() => setInspectedModalLead(null)}
              className="absolute left-4 top-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-600/40 font-bold">
                بطاقة العميل الميدانية المعتمدة
              </span>
              <span className="text-xs font-mono text-slate-400" dir="ltr">
                {inspectedModalLead.id}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-black text-white">{inspectedModalLead.nameAr}</h3>
              <p className="text-xs text-slate-400" dir="ltr">{inspectedModalLead.nameEn}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-[#0B1120] p-3 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-400 block text-[11px]">رقم السجل التجاري:</span>
                <span className="font-mono text-slate-200 font-bold" dir="ltr">
                  {inspectedModalLead.commercialRegistrationNo}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">موقع المنشأة بجدة:</span>
                <span className="text-slate-200 font-semibold">{inspectedModalLead.district}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block text-[11px]">العنوان الدقيق:</span>
                <span className="text-slate-300">{inspectedModalLead.street}</span>
              </div>
            </div>

            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-2 text-xs">
              <h4 className="font-bold text-teal-300 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                بيانات صاحب القرار المعتمد:
              </h4>
              <div className="flex justify-between">
                <span className="text-slate-400">الاسم والمسمى:</span>
                <span className="text-white font-bold">
                  {inspectedModalLead.decisionMaker.name} ({inspectedModalLead.decisionMaker.title})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">طريقة التواصل المفضلة:</span>
                <span className="text-amber-300 font-semibold">{inspectedModalLead.decisionMaker.preferredContactMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">الجوال المسجل:</span>
                <span className="text-teal-400 font-mono font-bold" dir="ltr">
                  {inspectedModalLead.decisionMaker.phone}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs bg-[#0B1120] p-3 rounded-xl border border-slate-800">
              <h4 className="font-bold text-sky-300 flex items-center gap-1.5">
                <ThermometerSnowflake className="w-3.5 h-3.5" />
                المتطلبات التبريدية وفجوة المورد الحالي:
              </h4>
              <p className="text-slate-300 leading-relaxed">
                <strong>فجوة التوريد:</strong> {inspectedModalLead.frozenDemand.currentSupplierGap}
              </p>
              <div className="flex justify-between pt-1 border-t border-slate-800 text-slate-400">
                <span>الاستهلاك الشهري:</span>
                <span className="font-bold text-slate-200 font-mono">
                  {inspectedModalLead.frozenDemand.estimatedMonthlyVolumeKg} كجم/شهرياً
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>شروط الدفع المقبولة:</span>
                <span className="font-bold text-slate-200">{inspectedModalLead.frozenDemand.paymentTerms}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>مواعيد الاستلام:</span>
                <span className="font-bold text-slate-200">{inspectedModalLead.frozenDemand.deliveryWindows}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setInspectedModalLead(null);
                  onInspectLead(inspectedModalLead);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs"
              >
                تخصيص حملة توريد لهذه المنشأة
              </button>
              <button
                type="button"
                onClick={() => setInspectedModalLead(null)}
                className="py-2.5 px-4 rounded-xl bg-slate-800 text-slate-300 text-xs"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {downloadSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 border border-emerald-500 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>تم تنزيل ملف بيانات الهوريكا (CSV) بنجاح بتوافق تام مع Excel!</span>
        </div>
      )}
    </div>
  );
};
