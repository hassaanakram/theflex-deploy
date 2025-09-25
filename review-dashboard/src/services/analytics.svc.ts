import { api } from "@/api"
import { ReviewTrend, ReviewTrendResponse, ChannelDistribution, ChannelDistributionResponse } from "@/types";

export async function fetchRatingsTrend(
  timeRange: string = "30d"
): Promise<ReviewTrend[]> {
  const data = await api.get<ReviewTrendResponse>(
    `/api/analytics/trend/reviews?timeRange=${timeRange}`
  );
  return data.trend;
}

export async function fetchChannelDistribution(
  timeRange: string = "2y"
): Promise<ChannelDistribution[]> {
  const data = await api.get<ChannelDistributionResponse>(
    `/api/analytics/distribution/channels?timeRange=${timeRange}`
  );
  return data.distribution;
}