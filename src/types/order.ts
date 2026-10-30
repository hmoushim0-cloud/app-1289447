export type FnbCategory =
  | 'CAFE'
  | 'RESTAURANT'
  | 'BAKERY'
  | 'CLOUD_KITCHEN'
  | 'HOTEL_CATERING';

export type LeadPipelineStage =
  | 'NEW'
  | 'CONTACTED'
  | 'MEETING_SET'
  | 'OFFER_SENT'
  | 'CONTRACTED';

export type LeadAuditStatus = 'VERIFIED' | 'IN_AUDIT' | 'PENDING_VISIT';

export interface DecisionMaker {
  name: string;
  title: string;
  phone: string;
  maskedPhone: string;
  email?: string;
  preferredContactMethod: 'PHONE' | 'WHATSAPP' | 'IN_PERSON';
}

export interface FrozenDemandProfile {
  categories: string[];
  estimatedMonthlyVolumeKg: number;
  freezerCapacityM3: number;
  coldStorageType: 'غرفة تبريد مركزية (Walk-in)' | 'مجمّدات رأسية تجارية' | 'ثلاجات عرض ومجمّدات باريستا';
  purchasingCycle: 'أسبوعي' | 'كل أسبوعين' | 'شهري';
  paymentTerms: string;
  deliveryWindows: string;
  currentSupplierGap: string;
}

export interface FnbLead {
  id: string;
  nameAr: string;
  nameEn: string;
  category: FnbCategory;
  district: string;
  street: string;
  commercialRegistrationNo: string;
  decisionMaker: DecisionMaker;
  frozenDemand: FrozenDemandProfile;
  auditStatus: LeadAuditStatus;
  pipelineStage: LeadPipelineStage;
  fieldAuditorName: string;
  fieldAuditorNotes: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  lastVerifiedAt: string;
  ratingScore: number;
}

export interface ResearchPackage {
  id: string;
  name: string;
  badge: string;
  leadsCount: number;
  districtsCount: number;
  basePriceSar: number; // in SAR
  turnaroundDays: number;
  description: string;
  deliverables: string[];
  popular?: boolean;
}

export interface OrderRequestStatusType {
  PENDING: 'PENDING';
  ACCEPTED: 'ACCEPTED';
  IN_PROGRESS: 'IN_PROGRESS';
  COMPLETED: 'COMPLETED';
}

export type OrderRequestStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export interface CatalogItem {
  id: string;
  title: string;
  description: string;
  priceMinorUnits: number; // in halalas (100 = 1 SAR)
  iconVector?: string;
  category?: string;
  deliverables?: string[];
}

export interface OrderRequest {
  requestId: string;
  items: CatalogItem[];
  customerPhone: string;
  customerName: string;
  targetFocusDistricts: string[];
  targetSectors: string[];
  totalAmountMinorUnits: number;
  baseAmountMinorUnits: number;
  vatAmountMinorUnits: number; // 15% ZATCA VAT
  status: OrderRequestStatus;
  createdAtEpochMs: number;
  bookingDay: string;
  bookingTime: string;
  zatcaQrPayload: string;
  paymentMethod: 'MADA' | 'APPLE_PAY' | 'BANK_TRANSFER' | 'VISA';
  city: string;
  regionFocus: string;
  notes?: string;
  leadsVerifiedCount: number;
  leadsTargetCount: number;
  trackingCoords?: {
    lat: number;
    lng: number;
    etaMinutes: number;
    fieldAuditorName: string;
  };
}
