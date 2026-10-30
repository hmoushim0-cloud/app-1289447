import {
  FnbLead,
  ResearchPackage,
  OrderRequest,
  CatalogItem,
  OrderRequestStatus
} from '../types/order';

export const JEDDAH_DISTRICTS = [
  'الكل',
  'حي الروضة',
  'حي الزهراء',
  'شارع التحلية',
  'حي الشاطئ',
  'حي الحمراء',
  'حي السلامة',
  'حي أبحر',
  'حي البلد'
] as const;

export const FACILITY_CATEGORIES = [
  { id: 'ALL', label: 'كافة القطاعات' },
  { id: 'CAFE', label: 'كافيهات ومقاهي مختصة' },
  { id: 'RESTAURANT', label: 'مطاعم وسلاسل وجبات' },
  { id: 'BAKERY', label: 'مخابز ومعامل حلويات' },
  { id: 'CLOUD_KITCHEN', label: 'مطابخ سحابية وتموين' }
] as const;

export const SUPPLY_PRODUCT_TAGS = [
  'الكل',
  'مجمدات لحوم ودواجن',
  'مخبوزات وعجائن مجمدة',
  'ألبان وأجبان',
  'بطاطس ومقبلات مجمدة',
  'فواكه وهريس مجمد'
] as const;

export const RESEARCH_PACKAGES: ResearchPackage[] = [
  {
    id: 'pkg_100',
    name: 'حزمة المسح الميداني المركّز',
    badge: '100 منشأة موثقة',
    leadsCount: 100,
    districtsCount: 3,
    basePriceSar: 750,
    turnaroundDays: 3,
    description: 'حصر وتدقيق بيانات 100 كافيه ومطعم في أحياء الروضة والزهراء والتحلية مع بيانات مسؤولي المشتريات المباشرة.',
    deliverables: [
      'بيانات 100 منشأة غذائية نشطة بجدة',
      'أرقام الجوال المباشرة لمدراء المشتريات (غير محجوبة)',
      'تحديد نوع وسعة مجمّدات التخزين وثلاجات العرض',
      'ملف إكسل منظم + وصول سحابي للوحة التحكم'
    ]
  },
  {
    id: 'pkg_250',
    name: 'حزمة التغطية الميدانية الشاملة',
    badge: '250 منشأة موثقة',
    leadsCount: 250,
    districtsCount: 6,
    basePriceSar: 1500,
    turnaroundDays: 5,
    description: 'تغطية واسعة لكافة أحياء جدة الرئيسية تشمل المطاعم الراقية، سلاسل الكافيهات، والمخابز الآلية الكبرى.',
    deliverables: [
      'بيانات 250 منشأة موثقة ميدانياً مع صور التراخيص',
      'قوائم استهلاك المجمدات الأسبوعية وشروط الدفع',
      'تحديد الموردين الحاليين ومواطن القصور لديهم',
      'تحديث أسبوعي للبيانات وربط مباشر عبر CRM / Excel'
    ],
    popular: true
  },
  {
    id: 'pkg_500',
    name: 'حزمة الهيمنة السوقية والذكاء التجاري (VIP)',
    badge: '500 منشأة موثقة',
    leadsCount: 500,
    districtsCount: 9,
    basePriceSar: 2500,
    turnaroundDays: 10,
    description: 'قاعدة بيانات متكاملة لكامل قطاع الهوريكا (HORECA) في محافظة جدة مع باحث ميداني مخصص لمتابعة عقود التوريد.',
    deliverables: [
      'تغطية كاملة لـ 500 منشأة ومطبخ سحابي بجدة',
      'باحث سوق ميداني مخصص لمتابعة عروض التوريد',
      'مسح أسعار المنافسين في السوق المركزي للخضار واللحوم',
      'عقود توريد نموذجية واستشارات مبيعات مجانية'
    ]
  }
];

export const SAMPLE_JEDDAH_LEADS: FnbLead[] = [
  {
    id: 'JED-LEAD-101',
    nameAr: 'كافيه ومحمصة السحاب المختصة',
    nameEn: 'Al-Sahab Specialty Coffee Roasters',
    category: 'CAFE',
    district: 'حي الروضة',
    street: 'شارع الأمير سلطان - مقابل مركز الخياط',
    commercialRegistrationNo: '4030198271',
    decisionMaker: {
      name: 'أ. طارق عبدالكريم المنصور',
      title: 'مدير المشتريات وسلاسل الإمداد',
      phone: '0554128941',
      maskedPhone: '05541•••••',
      email: 'procurement@sahab-coffee.sa',
      preferredContactMethod: 'WHATSAPP'
    },
    frozenDemand: {
      categories: ['فواكه وهريس مجمد', 'مخبوزات وعجائن مجمدة', 'ألبان وأجبان'],
      estimatedMonthlyVolumeKg: 850,
      freezerCapacityM3: 14.5,
      coldStorageType: 'غرفة تبريد مركزية (Walk-in)',
      purchasingCycle: 'أسبوعي',
      paymentTerms: 'تحويل بنكي - أجل 15 يوماً',
      deliveryWindows: 'صباحاً من 6:00 ص إلى 9:00 ص قبل الافتتاح',
      currentSupplierGap: 'تذبذب في توفر هريس التوت والفراولة الفرنسي المجمد IQF مع ارتفاع أسعار المورد الحالي'
    },
    auditStatus: 'VERIFIED',
    pipelineStage: 'MEETING_SET',
    fieldAuditorName: 'م. خالد الحربي',
    fieldAuditorNotes: 'تمت الزيارة الميدانية. تم فحص الفريزر المركزي بحالة ممتازة. يحتاجون شهرياً إلى 400 كجم هريس فواكه و350 كجم كرواسون نصف مخبوز.',
    coordinates: { lat: 21.5641, lng: 39.1482 },
    lastVerifiedAt: '2026-10-29',
    ratingScore: 5
  },
  {
    id: 'JED-LEAD-102',
    nameAr: 'مخابز ومعجنات السنابل الذهبية',
    nameEn: 'Golden Spikes Commercial Bakery',
    category: 'BAKERY',
    district: 'حي الزهراء',
    street: 'شارع البترجي - بالقرب من المستشفى السعودي الألماني',
    commercialRegistrationNo: '4030284910',
    decisionMaker: {
      name: 'م. عمر بن سالم العمودي',
      title: 'مدير التشغيل ورئيس الخبازين',
      phone: '0541198450',
      maskedPhone: '05411•••••',
      email: 'supply@sanabel-bakery.com',
      preferredContactMethod: 'IN_PERSON'
    },
    frozenDemand: {
      categories: ['مخبوزات وعجائن مجمدة', 'ألبان وأجبان', 'بطاطس ومقبلات مجمدة'],
      estimatedMonthlyVolumeKg: 3400,
      freezerCapacityM3: 45.0,
      coldStorageType: 'غرفة تبريد مركزية (Walk-in)',
      purchasingCycle: 'أسبوعي',
      paymentTerms: 'سداد فوري بنكي عند الاستلام',
      deliveryWindows: 'يومياً على فترتين (5:00 ص و 4:00 م)',
      currentSupplierGap: 'نقص حاد في كتل الزبدة النيوزيلندية غير المملحة زنة 25 كجم وعجائن البف باستري الجاهزة'
    },
    auditStatus: 'VERIFIED',
    pipelineStage: 'OFFER_SENT',
    fieldAuditorName: 'أ. فهد الغامدي',
    fieldAuditorNotes: 'مخبز صناعي يمد 14 مقهى في جدة. قدرة استيعابية ضخمة وجاهزية للتعاقد الفوري في حال توفر الزبدة المجمدة بانتظام.',
    coordinates: { lat: 21.5892, lng: 39.1345 },
    lastVerifiedAt: '2026-10-30',
    ratingScore: 5
  },
  {
    id: 'JED-LEAD-103',
    nameAr: 'مطعم مذاق الشاطئ للمأكولات البحرية',
    nameEn: 'Beach Taste Seafood Waterfront Grill',
    category: 'RESTAURANT',
    district: 'حي أبحر',
    street: 'طريق الأمير عبد الله الفيصل - واجهة أبحر الشمالية',
    commercialRegistrationNo: '4030912443',
    decisionMaker: {
      name: 'الشيف حاتم رضوان التلمساني',
      title: 'رئيس الطهاة ومسؤول التموين',
      phone: '0559981244',
      maskedPhone: '05599•••••',
      email: 'hatem@beachtaste.sa',
      preferredContactMethod: 'PHONE'
    },
    frozenDemand: {
      categories: ['مجمدات لحوم ودواجن', 'بطاطس ومقبلات مجمدة'],
      estimatedMonthlyVolumeKg: 2800,
      freezerCapacityM3: 35.0,
      coldStorageType: 'غرفة تبريد مركزية (Walk-in)',
      purchasingCycle: 'أسبوعي',
      paymentTerms: 'أجل 30 يوماً مع ضمان مصرفي',
      deliveryWindows: 'الأحد والأربعاء من 8:00 ص إلى 12:00 م',
      currentSupplierGap: 'تلف متكرر في شحنات فيليه السلمون النرويجي وبطاطس القلي 9 ملم بسبب سوء سيارات التبريد للموزع القديم'
    },
    auditStatus: 'VERIFIED',
    pipelineStage: 'NEW',
    fieldAuditorName: 'م. خالد الحربي',
    fieldAuditorNotes: 'استهلاك شهري 1,200 كجم أسماك وروبيان مجمد + 900 كجم بطاطس مقلية. يشترطون شاحنة تبريد معتمدة حرارة -18 درجة مئوية.',
    coordinates: { lat: 21.7210, lng: 39.1235 },
    lastVerifiedAt: '2026-10-28',
    ratingScore: 5
  },
  {
    id: 'JED-LEAD-104',
    nameAr: 'روسترز ومختبر الإسبريسو',
    nameEn: 'Roasters & Espresso Bar Lab',
    category: 'CAFE',
    district: 'شارع التحلية',
    street: 'طريق الأمير محمد بن عبد العزيز - تقاطع التخصصي',
    commercialRegistrationNo: '4030671992',
    decisionMaker: {
      name: 'أ. فيصل أحمد القرشي',
      title: 'المالك والمشرف العام',
      phone: '0537719283',
      maskedPhone: '05377•••••',
      email: 'faisal@roasterylab.sa',
      preferredContactMethod: 'WHATSAPP'
    },
    frozenDemand: {
      categories: ['مخبوزات وعجائن مجمدة', 'فواكه وهريس مجمد'],
      estimatedMonthlyVolumeKg: 650,
      freezerCapacityM3: 8.5,
      coldStorageType: 'مجمّدات رأسية تجارية',
      purchasingCycle: 'كل أسبوعين',
      paymentTerms: 'مدى / نقد فوري عند الفاتورة',
      deliveryWindows: 'فترة الظهيرة من 1:00 م إلى 3:00 م',
      currentSupplierGap: 'عدم توفر مخبوزات كرواسون لوز مجمّد بجودة فرنسية متميزة'
    },
    auditStatus: 'VERIFIED',
    pipelineStage: 'CONTACTED',
    fieldAuditorName: 'أ. فهد الغامدي',
    fieldAuditorNotes: 'موقع استراتيجي بشارع التحلية. العميل يطلب عينات تجريبية لمعجنات الكرواسون والدونات المجمدة مسبقاً.',
    coordinates: { lat: 21.5490, lng: 39.1590 },
    lastVerifiedAt: '2026-10-30',
    ratingScore: 4
  },
  {
    id: 'JED-LEAD-105',
    nameAr: 'مطابخ كلاود كيتشنز فالي السحابية',
    nameEn: 'Cloud Kitchens Valley - Jeddah Central Hub',
    category: 'CLOUD_KITCHEN',
    district: 'حي الحمراء',
    street: 'شارع فلسطين - خلف مركز الأندلس التجاري',
    commercialRegistrationNo: '4030882145',
    decisionMaker: {
      name: 'أ. رامي فؤاد باوزير',
      title: 'المدير التنفيذي لإدارة العمليات والمطابخ',
      phone: '0569831122',
      maskedPhone: '05698•••••',
      email: 'rami@ckvalley.sa',
      preferredContactMethod: 'PHONE'
    },
    frozenDemand: {
      categories: ['مجمدات لحوم ودواجن', 'بطاطس ومقبلات مجمدة', 'ألبان وأجبان'],
      estimatedMonthlyVolumeKg: 4600,
      freezerCapacityM3: 55.0,
      coldStorageType: 'غرفة تبريد مركزية (Walk-in)',
      purchasingCycle: 'أسبوعي',
      paymentTerms: 'تحويل بنكي أسبوعي عبر سداد',
      deliveryWindows: 'منتصف الليل من 2:00 ص إلى 5:00 ص',
      currentSupplierGap: 'يبحثون عن موزع موحد يغذي 9 علامات تجارية سحابية بمجمدات شاورما الدجاج، برجر اللحم، والبطاطس المقلية'
    },
    auditStatus: 'VERIFIED',
    pipelineStage: 'OFFER_SENT',
    fieldAuditorName: 'م. خالد الحربي',
    fieldAuditorNotes: 'من أكبر تجمعات المطابخ السحابية بجدة. تم تقديم عرض أسعار شامل لتوريد الدواجن واللحوم المجمدة بسعر تفضيلي.',
    coordinates: { lat: 21.5230, lng: 39.1560 },
    lastVerifiedAt: '2026-10-29',
    ratingScore: 5
  },
  {
    id: 'JED-LEAD-106',
    nameAr: 'مطعم ومشاوي قصر الضيافة الحجازية',
    nameEn: 'Hijazi Hospitality Palace & Grill',
    category: 'RESTAURANT',
    district: 'حي السلامة',
    street: 'شارع صاري - بالقرب من ميدان الفلك',
    commercialRegistrationNo: '4030459812',
    decisionMaker: {
      name: 'أ. زياد مصطفى كمال',
      title: 'مدير المشتريات والتموين الغذائي',
      phone: '0543321900',
      maskedPhone: '05433•••••',
      email: 'purchasing@hijazipalace.com',
      preferredContactMethod: 'WHATSAPP'
    },
    frozenDemand: {
      categories: ['مجمدات لحوم ودواجن', 'ألبان وأجبان'],
      estimatedMonthlyVolumeKg: 2900,
      freezerCapacityM3: 30.0,
      coldStorageType: 'غرفة تبريد مركزية (Walk-in)',
      purchasingCycle: 'أسبوعي',
      paymentTerms: 'أجل 21 يوماً',
      deliveryWindows: 'الأيام العادية قبل الساعة 11:00 ص',
      currentSupplierGap: 'عدم استقرار درجات حرارة الدجاج المبرد والمجمد أثناء التسليم من المورد السابق'
    },
    auditStatus: 'VERIFIED',
    pipelineStage: 'MEETING_SET',
    fieldAuditorName: 'م. خالد الحربي',
    fieldAuditorNotes: 'سعة استيعابية تفوق 250 زائر. تم الاتفاق على زيارة تجريبية ومعاينة شهادات الذبح الحلال للمجمدات.',
    coordinates: { lat: 21.5780, lng: 39.1620 },
    lastVerifiedAt: '2026-10-27',
    ratingScore: 5
  },
  {
    id: 'JED-LEAD-107',
    nameAr: 'حلويات ومعجنات تارتين الباريسية',
    nameEn: 'Tartine Parisian Patisserie',
    category: 'BAKERY',
    district: 'حي الشاطئ',
    street: 'طريق الكورنيش الشمالي - مجمع النخيل سكوير',
    commercialRegistrationNo: '4030554129',
    decisionMaker: {
      name: 'الشيف جان مسعود',
      title: 'رئيس قسم الحلويات الغربية والمشتريات',
      phone: '0502289133',
      maskedPhone: '05022•••••',
      email: 'chef.jean@tartine-jed.sa',
      preferredContactMethod: 'IN_PERSON'
    },
    frozenDemand: {
      categories: ['فواكه وهريس مجمد', 'مخبوزات وعجائن مجمدة', 'ألبان وأجبان'],
      estimatedMonthlyVolumeKg: 1100,
      freezerCapacityM3: 16.0,
      coldStorageType: 'مجمّدات رأسية تجارية',
      purchasingCycle: 'كل أسبوعين',
      paymentTerms: 'تحويل بنكي - أجل 30 يوماً',
      deliveryWindows: 'أيام السبت والثلاثاء 7:00 ص',
      currentSupplierGap: 'الحاجة الماسة لهريس باشن فروت وتوت أسود مجمد بدون مواد حافظة لتصنيع التورتات الفاخرة'
    },
    auditStatus: 'VERIFIED',
    pipelineStage: 'NEW',
    fieldAuditorName: 'أ. فهد الغامدي',
    fieldAuditorNotes: 'علامة راقية ذات هوامش ربحية ممتازة لموردي الفواكه المجمدة الفاخرة. يفضلون الموردين المعتمدين بهيئة الغذاء والدواء SFDA.',
    coordinates: { lat: 21.6180, lng: 39.1150 },
    lastVerifiedAt: '2026-10-30',
    ratingScore: 5
  },
  {
    id: 'JED-LEAD-108',
    nameAr: 'مطبخ التموين والضيافة بفندق الواجهة جراند',
    nameEn: 'Grand Waterfront Hotel Catering Kitchen',
    category: 'HOTEL_CATERING',
    district: 'حي البلد',
    street: 'طريق الميناء - بالقرب من باب مكة',
    commercialRegistrationNo: '4030099411',
    decisionMaker: {
      name: 'أ. سالم باحارث',
      title: 'مدير المشتريات العامة والولائم',
      phone: '0551239840',
      maskedPhone: '05512•••••',
      email: 'procurement@grandwaterfront.sa',
      preferredContactMethod: 'PHONE'
    },
    frozenDemand: {
      categories: ['مجمدات لحوم ودواجن', 'بطاطس ومقبلات مجمدة', 'ألبان وأجبان'],
      estimatedMonthlyVolumeKg: 5100,
      freezerCapacityM3: 70.0,
      coldStorageType: 'غرفة تبريد مركزية (Walk-in)',
      purchasingCycle: 'أسبوعي',
      paymentTerms: 'تحويل حكومي / مؤسسي - أجل 45 يوماً',
      deliveryWindows: 'صباحاً من 6:00 ص إلى 10:00 ص قبل بدء التجهيز',
      currentSupplierGap: 'طرح مناقصة لتوريد المجمدات للموسم القادم لعدم التزام الموزع القديم بجدول التسليم'
    },
    auditStatus: 'VERIFIED',
    pipelineStage: 'CONTRACTED',
    fieldAuditorName: 'م. خالد الحربي',
    fieldAuditorNotes: 'حجم أعمال ضخم جداً. تم توقيع عقد توريد ربع سنوي لتوريد الدواجن والخضار المجمد بحجم 15 طن.',
    coordinates: { lat: 21.4850, lng: 39.1870 },
    lastVerifiedAt: '2026-10-25',
    ratingScore: 5
  }
];

const STORAGE_KEY_LEADS = 'jeddah_horeca_leads_v3';
const STORAGE_KEY_ORDERS = 'app1289447_order_requests';
const STORAGE_KEY_ACTIVE = 'app1289447_active_request_id';

export class OrderRequestRepository {
  private leads: FnbLead[] = [];
  private packages: ResearchPackage[] = RESEARCH_PACKAGES;

  constructor() {
    this.initLeads();
  }

  private initLeads() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_LEADS);
      if (data) {
        this.leads = JSON.parse(data);
      } else {
        this.leads = SAMPLE_JEDDAH_LEADS;
        localStorage.setItem(STORAGE_KEY_LEADS, JSON.stringify(this.leads));
      }
    } catch {
      this.leads = SAMPLE_JEDDAH_LEADS;
    }
  }

  getLeads(): FnbLead[] {
    return [...this.leads];
  }

  getLeadById(id: string): FnbLead | undefined {
    return this.leads.find((l) => l.id === id);
  }

  getPackages(): ResearchPackage[] {
    return [...this.packages];
  }

  getPackageById(id: string): ResearchPackage {
    return this.packages.find((p) => p.id === id) || this.packages[0];
  }

  // Compatible Catalog Item generator for legacy calls
  getAvailableCatalog(): CatalogItem[] {
    return this.packages.map((pkg) => ({
      id: pkg.id,
      title: `${pkg.name} (${pkg.badge})`,
      description: pkg.description,
      priceMinorUnits: pkg.basePriceSar * 100, // exact halalas
      category: pkg.badge,
      deliverables: pkg.deliverables
    }));
  }

  exportLeadsToCsv(leadsToExport: FnbLead[]): string {
    const headers = [
      'معرف المنشأة (ID)',
      'اسم المنشأة بالعربية',
      'اسم المنشأة بالإنجليزية',
      'القطاع',
      'الحي بجدة',
      'الشارع والعنوان',
      'رقم السجل التجاري',
      'مسؤول المشتريات',
      'المسمى الوظيفي',
      'رقم الجوال المباشر',
      'البريد الإلكتروني',
      'الاستهلاك الشهري التقديري (كجم)',
      'نوع وسعة التخزين التبريدي',
      'أصناف المجمدات المطلوبة',
      'دورة الشراء',
      'شروط الدفع والائتمان',
      'مواعيد استلام البضائع',
      'فجوة المورد الحالي',
      'حالة التدقيق الميداني'
    ];

    const categoryMap: Record<string, string> = {
      CAFE: 'كافيه / مقهى مختص',
      RESTAURANT: 'مطعم',
      BAKERY: 'مخبز / حلويات',
      CLOUD_KITCHEN: 'مطبخ سحابي',
      HOTEL_CATERING: 'فندق وإعاشة'
    };

    const rows = leadsToExport.map((lead) => [
      `"${lead.id}"`,
      `"${lead.nameAr.replace(/"/g, '""')}"`,
      `"${lead.nameEn.replace(/"/g, '""')}"`,
      `"${categoryMap[lead.category] || lead.category}"`,
      `"${lead.district}"`,
      `"${lead.street.replace(/"/g, '""')}"`,
      `"${lead.commercialRegistrationNo}"`,
      `"${lead.decisionMaker.name}"`,
      `"${lead.decisionMaker.title}"`,
      `"${lead.decisionMaker.phone}"`,
      `"${lead.decisionMaker.email || ''}"`,
      `"${lead.frozenDemand.estimatedMonthlyVolumeKg}"`,
      `"${lead.frozenDemand.coldStorageType} (${lead.frozenDemand.freezerCapacityM3} م³)"`,
      `"${lead.frozenDemand.categories.join(' - ')}"`,
      `"${lead.frozenDemand.purchasingCycle}"`,
      `"${lead.frozenDemand.paymentTerms}"`,
      `"${lead.frozenDemand.deliveryWindows}"`,
      `"${lead.frozenDemand.currentSupplierGap.replace(/"/g, '""')}"`,
      `"${lead.auditStatus === 'VERIFIED' ? 'موثق ومفحوص ميدانياً' : 'قيد التدقيق'}"`
    ]);

    // UTF-8 BOM for Microsoft Excel Arabic support
    return '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  }

  // --- Order Requests & Invariants ---
  getAllRequests(): OrderRequest[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_ORDERS);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // ignore
    }
    // Return default active campaign if none exists
    return [this.createDefaultMockOrder()];
  }

  private createDefaultMockOrder(): OrderRequest {
    const defaultPkg = this.packages[1]; // 250 leads package
    const baseMinor = defaultPkg.basePriceSar * 100; // 1500 SAR = 150000 halalas
    const vatMinor = Math.round(baseMinor * 0.15); // 225 SAR = 22500 halalas
    const totalMinor = baseMinor + vatMinor; // 1725 SAR = 172500 halalas

    return {
      requestId: 'REQ-JED-89447',
      items: [
        {
          id: defaultPkg.id,
          title: defaultPkg.name,
          description: defaultPkg.description,
          priceMinorUnits: baseMinor,
          category: defaultPkg.badge,
          deliverables: defaultPkg.deliverables
        }
      ],
      customerPhone: '0551234567',
      customerName: 'شركة النقاء لتوريد الأغذية والمجمدات',
      targetFocusDistricts: ['حي الروضة', 'حي الزهراء', 'حي الشاطئ'],
      targetSectors: ['كافيهات ومقاهي مختصة', 'مطاعم وسلاسل وجبات'],
      baseAmountMinorUnits: baseMinor,
      vatAmountMinorUnits: vatMinor,
      totalAmountMinorUnits: totalMinor,
      status: 'IN_PROGRESS',
      createdAtEpochMs: Date.now() - 86400000, // yesterday
      bookingDay: 'تفعيل فوري للمسح الميداني',
      bookingTime: '5 أيام عمل',
      zatcaQrPayload: `ZATCA-EINV2-RADAR-JED-REQ-89447-${totalMinor}-SAR-VAT15`,
      paymentMethod: 'MADA',
      city: 'جدة',
      regionFocus: 'أحياء الروضة، الزهراء، التحلية والشاطئ',
      notes: 'التركيز على الكافيهات التي تستهلك فواكه مجمدة IQF ومخبوزات نصف مطهوة',
      leadsVerifiedCount: 78,
      leadsTargetCount: defaultPkg.leadsCount,
      trackingCoords: {
        lat: 21.5641,
        lng: 39.1482,
        etaMinutes: 12,
        fieldAuditorName: 'م. خالد الحربي (باحث سوق معتمد - جدة)'
      }
    };
  }

  getActiveRequest(): OrderRequest | null {
    const all = this.getAllRequests();
    const activeId = localStorage.getItem(STORAGE_KEY_ACTIVE);
    if (activeId) {
      const found = all.find((r) => r.requestId === activeId);
      if (found) return found;
    }
    return all.length > 0 ? all[0] : null;
  }

  submitNewCampaign(
    packageId: string,
    customerName: string,
    customerPhone: string,
    selectedDistricts: string[],
    selectedSectors: string[],
    customNotes: string
  ): OrderRequest {
    const pkg = this.getPackageById(packageId);

    // Invariant: totalCalculationExact
    // Base in halalas, exactly 15% VAT
    const baseMinor = pkg.basePriceSar * 100;
    const vatMinor = Math.round(baseMinor * 0.15);
    const totalMinor = baseMinor + vatMinor;

    const reqId = `REQ-JED-${Date.now().toString().slice(-5)}`;
    const zatcaPayload = `ZATCA-EINV2-RADAR-JED-${reqId}-${totalMinor}-SAR-VAT15-CR4030198271`;

    const catalogItem: CatalogItem = {
      id: pkg.id,
      title: `${pkg.name} (${pkg.badge})`,
      description: pkg.description,
      priceMinorUnits: baseMinor,
      category: pkg.badge,
      deliverables: pkg.deliverables
    };

    const newRequest: OrderRequest = {
      requestId: reqId,
      items: [catalogItem],
      customerPhone: customerPhone || '0551234567',
      customerName: customerName || 'شركة توريد الأغذية المعتمدة',
      targetFocusDistricts: selectedDistricts.length > 0 ? selectedDistricts : ['حي الروضة', 'حي الزهراء'],
      targetSectors: selectedSectors.length > 0 ? selectedSectors : ['كافيهات ومقاهي مختصة'],
      baseAmountMinorUnits: baseMinor,
      vatAmountMinorUnits: vatMinor,
      totalAmountMinorUnits: totalMinor,
      status: 'PENDING',
      createdAtEpochMs: Date.now(),
      bookingDay: 'تفعيل فوري للمسح الميداني',
      bookingTime: `${pkg.turnaroundDays} أيام عمل`,
      zatcaQrPayload: zatcaPayload,
      paymentMethod: 'MADA',
      city: 'جدة',
      regionFocus: selectedDistricts.join('، ') || 'أحياء شمال وغرب جدة',
      notes: customNotes || 'حصر مسؤولي المشتريات واحتياجات التجميد',
      leadsVerifiedCount: 14,
      leadsTargetCount: pkg.leadsCount,
      trackingCoords: {
        lat: 21.5641,
        lng: 39.1482,
        etaMinutes: 10,
        fieldAuditorName: 'م. خالد الحربي (باحث سوق ميداني)'
      }
    };

    const all = this.getAllRequests();
    const updated = [newRequest, ...all];
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(updated));
    localStorage.setItem(STORAGE_KEY_ACTIVE, newRequest.requestId);

    return newRequest;
  }

  // Invariant: statusTransitionsMonotonic (PENDING -> ACCEPTED -> IN_PROGRESS -> COMPLETED)
  advanceOrderStatus(requestId: string): OrderRequest | null {
    const sequence: OrderRequestStatus[] = ['PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED'];
    const all = this.getAllRequests();
    const idx = all.findIndex((r) => r.requestId === requestId);
    if (idx === -1) return null;

    const currentStatus = all[idx].status;
    const currentSeqIdx = sequence.indexOf(currentStatus);

    if (currentSeqIdx !== -1 && currentSeqIdx < sequence.length - 1) {
      all[idx].status = sequence[currentSeqIdx + 1];
      if (all[idx].status === 'IN_PROGRESS') {
        all[idx].leadsVerifiedCount = Math.floor(all[idx].leadsTargetCount * 0.78);
      } else if (all[idx].status === 'COMPLETED') {
        all[idx].leadsVerifiedCount = all[idx].leadsTargetCount;
      }
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(all));
      return all[idx];
    }
    return all[idx];
  }
}

export const repository = new OrderRequestRepository();
