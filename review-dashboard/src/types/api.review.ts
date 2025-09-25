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

export interface ToggleReviewVisibilityResponse {
    reviewId: number;
    isPublic: boolean;
    message?: string;
}

export interface ReviewResponse {
  reviews: ReviewType[];
  timeRange: string;
}

export interface ReviewVisbilityToggleResponse {
  reviewId: number;
  isPublic: boolean;
  message: string;
}