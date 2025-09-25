export interface PropertyOverviewType {
    property: string;
    averageRating: number;
    reviewCount: number;
}

export interface PropertyOverviewResponse {
    properties: PropertyOverviewType[];
    timeRange: string;
}