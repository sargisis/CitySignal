export type Locale = 'en' | 'hy' | 'ru';

export type ReportStatus = 'submitted' | 'under_review' | 'in_progress' | 'resolved' | 'closed';

export interface Category {
  id: string;
  icon: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
}

export interface Report {
  id: string;
  trackingId: string;
  categoryId: string;
  description: string;
  latitude: number;
  longitude: number;
  address?: string;
  photos: string[];
  status: ReportStatus;
  contactPhone?: string;
  contactEmail?: string;
  createdAt: string;
  updatedAt: string;
  statusHistory: StatusUpdate[];
  upvotes: number;
  department?: string;
}

export interface StatusUpdate {
  status: ReportStatus;
  timestamp: string;
  note?: string;
  updatedBy?: string;
}

export interface ReportFormData {
  categoryId: string;
  description: string;
  latitude: number;
  longitude: number;
  address?: string;
  photos: File[];
  contactPhone?: string;
  contactEmail?: string;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}
