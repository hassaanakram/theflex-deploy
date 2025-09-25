export interface ReviewType {
  Id: number;
  property: string;
  guest: string;
  category?: string;
  rating: number;
  review?: string;
  submittedAt?: string;
  channel?: string;
  isPublic: boolean;
}

export interface ReviewResponse {
  reviews: ReviewType[];
  timeRange: string;
}