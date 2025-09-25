export interface ReviewTrend {
    month: string;
    averageRating: number;
    totalReviews: number;
}

export interface ReviewTrendResponse {
    timeRange: string;
    trend: ReviewTrend[];
}

export interface ChannelDistribution {
    name: string;
    count: number;
    percent: number;
    color?: string;
}

export interface ChannelDistributionResponse {
    timeRange: string;
    distribution: ChannelDistribution[];
}