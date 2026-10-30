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
  customerName?: string;
  totalAmountMinorUnits: number;
  baseAmountMinorUnits: number;
  vatAmountMinorUnits: number; // 15% ZATCA VAT
  status: OrderRequestStatus;
  createdAtEpochMs: number;
  bookingDay?: string;
  bookingTime?: string;
  zatcaQrPayload: string;
  paymentMethod?: 'MADA' | 'APPLE_PAY' | 'VISA' | 'CASH';
  city: string;
  regionFocus?: string;
  trackingCoords?: {
    lat: number;
    lng: number;
    etaMinutes: number;
    fieldAuditorName: string;
  };
}
