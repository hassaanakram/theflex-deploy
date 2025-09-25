import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { X, Search } from "lucide-react";
import { FilterControlsProps } from "@/types";

//const channels = ["All", "Airbnb", "VRBO", "Booking.com", "Direct"];
const timeRanges = ["7d", "30d", "3m", "6m", "1y", "2y"];
const sortOptions = [
  { value: "name", label: "Property Name" },
  { value: "rating", label: "Rating" },
  { value: "revenue", label: "Revenue" },
  { value: "occupancy", label: "Occupancy" },
  { value: "reviewCount", label: "Review Count" }
];

export function FilterControls({ filters, onFilterChange, onClearFilters, properties, channelsList }: FilterControlsProps) {
  const hasActiveFilters = 
    filters.searchQuery !== "" ||
    filters.rating !== "all" || 
    filters.category !== "All" || 
    filters.channel !== "All" || 
    filters.timeRange !== "Last 30 days";

  return (
    <div className="space-y-4">
      {/* Search Bar - Now at the top */}
      <div className="space-y-2">
        <label className="text-sm">Search Properties</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by property name, city, or country..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange('searchQuery', e.target.value)}
            className="pl-10 w-full max-w-md"
          />
        </div>
      </div>

      {/* Other Filters */}
      <div className="flex flex-wrap gap-4">
        {/* Rating Filter */}
        <div className="space-y-2">
          <label className="text-sm">Min Rating</label>
          <Select value={filters.rating} onValueChange={(value: string) => onFilterChange('rating', value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="4.5">4.5+</SelectItem>
              <SelectItem value="4.0">4.0+</SelectItem>
              <SelectItem value="3.5">3.5+</SelectItem>
              <SelectItem value="3.0">3.0+</SelectItem>
            </SelectContent>
          </Select>
        </div>
          
        {/* Channel Filter */}
        <div className="space-y-2">
          <label className="text-sm">Channel</label>
          <Select value={filters.channel} onValueChange={(value: string) => onFilterChange('channel', value)}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {channelsList.map((channel) => (
                <SelectItem key={channel} value={channel}>
                  {channel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Time Range Filter */}
        <div className="space-y-2">
          <label className="text-sm">Time Range</label>
          <Select value={filters.timeRange} onValueChange={(value: string) => onFilterChange('timeRange', value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <label className="text-sm">Sort By</label>
          <div className="flex gap-2">
            <Select value={filters.sortBy} onValueChange={(value: string) => onFilterChange('sortBy', value)}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onFilterChange('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3"
            >
              {filters.sortOrder === 'asc' ? '↑' : '↓'}
            </Button>
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="flex items-end">
            <Button variant="outline" size="sm" onClick={onClearFilters} className="flex items-center gap-2">
              <X className="h-4 w-4" />
              Clear
            </Button>
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.searchQuery && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: "{filters.searchQuery}"
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onFilterChange('searchQuery', '')}
              />
            </Badge>
          )}
          {filters.rating !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Rating: {filters.rating}+
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onFilterChange('rating', 'all')}
              />
            </Badge>
          )}
          {filters.category !== "All" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.category}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onFilterChange('category', 'All')}
              />
            </Badge>
          )}
          {filters.channel !== "All" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.channel}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onFilterChange('channel', 'All')}
              />
            </Badge>
          )}
          {filters.timeRange !== "Last 30 days" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.timeRange}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onFilterChange('timeRange', 'Last 30 days')}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}