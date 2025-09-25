import { api } from "@/api"
import { ReviewType, ReviewResponse, ReviewVisbilityToggleResponse } from "@/types";

export async function fetchReviewsList(
  timeRange: string = "30d"
): Promise<ReviewType[]> {
  const data = await api.get<ReviewResponse>(
    `/api/reviews/hostaway?timeRange=${timeRange}`
  );
  return data.reviews;
}

export async function toggleReviewVisbility(
    reviewId: number
): Promise<ReviewVisbilityToggleResponse> {
    const data = await api.post<ReviewVisbilityToggleResponse>(
        `/api/reviews/${reviewId}/toggle-visibility`,
        {}
    );
    return data;
}