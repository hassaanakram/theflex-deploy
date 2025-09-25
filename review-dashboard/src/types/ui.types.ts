import { PropertyOverviewType } from "./api.overview";
import { ReviewType } from "./api.review";

export interface FilterState {
  searchQuery: string;
  rating: string;
  category: string;
  channel: string;
  timeRange: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface Property {
  id: string;
  name: string;
  category: string;
  channel: string;
  rating: number;
  revenue: number;
  occupancy: number;
  reviewCount: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  country: string;
  city: string;
}

export interface FilterControlsProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onClearFilters: () => void;
  properties: PropertyOverviewType[];
  channelsList: string[];
}

export interface Review {
  id: string;
  propertyName: string;
  guestName: string;
  rating: number;
  comment: string;
  date: string;
  channel: string;
  isPublic: boolean;
  sentiment: 'positive' | 'negative' | 'neutral';
  category: string[];
  country: string;
  city: string;
}

export interface ReviewsManagementProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onClearFilters: () => void;
  properties: PropertyOverviewType[];
  reviews: ReviewType[];
  setReviews: React.Dispatch<React.SetStateAction<ReviewType[]>>;
}

export interface PropertyOverviewProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onClearFilters: () => void;
  properties: PropertyOverviewType[];
  channelsList: string[];
}

export interface SearchableSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
}