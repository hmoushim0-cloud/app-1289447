import { CatalogItem, OrderRequest, OrderRequestStatus } from '../types/order';

export const INITIAL_CATALOG: CatalogItem[] = [
  {
    id: '1',
    title: 'الخدمة الأساسية المعتمدة',
    description: 'تنفيذ متقن ومطابق للمواصفات - مسح وحصر بيانات 50 كافيه ومطعم في أحياء جدة الرئيسية',
    priceMinorUnits: 5000, // 50.00 SAR
    iconVector: 'verified',
    category: 'بحث أولي',
    deliverables: [
      'قائمة 50 كافيه ومطعم مستهدف للتوريد',
      'العناوين التفصيلية وأرقام الهواتف المعتمدة',
      'تصنيف نشاط المنشأة وإمكانية استهلاك المجمدات'
    ]
  },
  {
    id: '2',
    title: 'الباقة المتقدمة',
    description: 'دعم فني وضمان جودة الأداء - قاعدة بيانات موسعة لـ 150 منشأة مع مسؤولي المشتريات والتوريد',
    priceMinorUnits: 9500, // 95.00 SAR
    iconVector: 'bolt',
    category: 'توليد عملاء محتملين',
    deliverables: [
      'حصر 150 كافيه، مطعم ومخبز نشط بجدة',
      'بيانات مدراء المشتريات وأرقام الاتصال المباشرة',
      'سجل استهلاك المواد الغذائية والمجمدات الأسبوعي',
      'تحديث فوري وإشعار تذكير عبر SMS'
    ]
  },
  {
    id: '3',
    title: 'باقة الحماية المتكاملة والمسح الميداني',
    description: 'زيارات ميدانية وتوثيق شامل للمطاعم والكافيهات الجاهزة للتعاقد الفوري بجدة',
    priceMinorUnits: 17500, // 175.00 SAR
    iconVector: 'shield',
    category: 'مسح ميداني متقدم',
    deliverables: [
      'مسح ميداني موثق بالإحداثيات الجغرافية GPS',
      'تقييم سعة التخزين وثلاجات التجميد لدى المنشأة',
      'تقرير جاهزية المنشأة للتعاقد مع موردي الأغذية',
      'فاتورة ضريبية إلكترونية معتمدة بهيئة الزكاة (ZATCA)'
    ]
  },
  {
    id: '4',
    title: 'الباقة الميدانية الشاملة VIP',
    description: 'استخبارات سوقية شاملة وشبكة سلاسل توريد كاملة لقطاع الأغذية والمجمدات في جدة',
    priceMinorUnits: 29000, // 290.00 SAR
    iconVector: 'star',
    category: 'حلول مؤسسية VIP',
    deliverables: [
      'حصر شامل لأكثر من 300 كافيه ومطعم راقٍ ومخبز',
      'تحليل الأسعار وحجم الطلب التقديري الشهري',
      'تتبع مباشر لباحث السوق الميداني عبر الخريطة',
      'دعم واستشارات مجانية لمدة شهر'
    ]
  }
];

const STORAGE_KEY_ORDERS = 'app1289447_order_requests';
const STORAGE_KEY_ACTIVE = 'app1289447_active_request_id';

export class OrderRequestRepository {
  private catalog: CatalogItem[] = INITIAL_CATALOG;

  getAvailableCatalog(): CatalogItem[] {
    return this.catalog;
  }

  getCatalogItem(id: string): CatalogItem | undefined {
    return this.catalog.find((item) => item.id === id);
  }

  getAllRequests(): OrderRequest[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_ORDERS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
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

  submitRequest(
    selectedItem: CatalogItem,
    customerPhone: string,
    bookingDay: string,
    bookingTime: string,
    customerName?: string
  ): OrderRequest {
    // Invariant: totalCalculationExact (base + 15% VAT in integer minor units)
    const baseMinor = selectedItem.priceMinorUnits;
    const vatMinor = Math.round(baseMinor * 0.15);
    const totalMinor = baseMinor + vatMinor;

    const reqId = `REQ-${Date.now().toString().slice(-6)}`;
    const zatcaPayload = `ZATCA-QR-SIMULATED-EINV2-${reqId}-${totalMinor}-SAR-VAT15`;

    const newRequest: OrderRequest = {
      requestId: reqId,
      items: [selectedItem],
      customerPhone: customerPhone || '0501234567',
      customerName: customerName || 'عميل معتمد',
      baseAmountMinorUnits: baseMinor,
      vatAmountMinorUnits: vatMinor,
      totalAmountMinorUnits: totalMinor,
      status: 'PENDING',
      createdAtEpochMs: Date.now(),
      bookingDay,
      bookingTime,
      zatcaQrPayload: zatcaPayload,
      paymentMethod: 'MADA',
      city: 'جدة',
      regionFocus: 'أحياء الروضة، الزهراء، التحلية والبلد',
      trackingCoords: {
        lat: 21.5433,
        lng: 39.1728,
        etaMinutes: 14,
        fieldAuditorName: 'م. خالد الحربي (باحث سوق معتمد)'
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
      if (all[idx].trackingCoords) {
        all[idx].trackingCoords!.etaMinutes = Math.max(2, all[idx].trackingCoords!.etaMinutes - 4);
      }
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(all));
      return all[idx];
    }
    return all[idx];
  }
}

export const repository = new OrderRequestRepository();
