'use client';
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Star, Eye, EyeOff, MessageSquare, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { FilterControls } from "./FilterControls";
import { ReviewsManagementProps, ReviewType, Review } from "@/types";
import { fetchReviewsList, toggleReviewVisbility } from "@/services/review.svc";
import { getUniqueChannels } from "@/lib/utils";

const mockReviews: Review[] = [
  {
    id: "1",
    propertyName: "Ocean View Villa",
    guestName: "Sarah M.",
    rating: 5,
    comment: "Absolutely stunning property with incredible ocean views. The host was very responsive and helpful.",
    date: "2024-09-20",
    channel: "Airbnb",
    isPublic: true,
    sentiment: "positive",
    category: ["location", "host"],
    country: "United States",
    city: "Miami"
  },
  {
    id: "2",
    propertyName: "Downtown Loft",
    guestName: "Mike R.",
    rating: 3,
    comment: "Good location but the wifi was spotty and check-in process was confusing.",
    date: "2024-09-18",
    channel: "VRBO",
    isPublic: false,
    sentiment: "neutral",
    category: ["wifi", "check-in"],
    country: "Canada",
    city: "Toronto"
  },
  {
    id: "3",
    propertyName: "Mountain Cabin",
    guestName: "Lisa K.",
    rating: 4,
    comment: "Beautiful cabin in a peaceful setting. Could use some kitchen upgrades but overall great experience.",
    date: "2024-09-15",
    channel: "Booking.com",
    isPublic: true,
    sentiment: "positive",
    category: ["location", "amenities"],
    country: "United States",
    city: "Denver"
  },
  {
    id: "4",
    propertyName: "City Center Apartment",
    guestName: "David L.",
    rating: 2,
    comment: "The apartment was not as clean as expected and there were noise issues from neighboring units.",
    date: "2024-09-12",
    channel: "Direct",
    isPublic: false,
    sentiment: "negative",
    category: ["cleanliness", "noise"],
    country: "United Kingdom",
    city: "London"
  },
  {
    id: "5",
    propertyName: "Beach House",
    guestName: "Emma T.",
    rating: 5,
    comment: "Perfect beach getaway! Everything was exactly as described and the amenities were top-notch.",
    date: "2024-09-10",
    channel: "Airbnb",
    isPublic: true,
    sentiment: "positive",
    category: ["amenities", "accuracy"],
    country: "Australia",
    city: "Sydney"
  }
];


export function ReviewsManagement({ filters, onFilterChange, onClearFilters, properties, reviews, setReviews }: ReviewsManagementProps) {
  const [filterRating, setFilterRating] = useState<string>("all");
  const [filterSentiment, setFilterSentiment] = useState<string>("all");
  const [filterChannel, setFilterChannel] = useState<string>("all");

  const togglePublicStatus = async (reviewId: number) => {
    const updatedReview = await toggleReviewVisbility(reviewId);

    setReviews(prev =>
      prev.map(r =>
        r.Id === reviewId ? { ...r, isPublic: updatedReview.isPublic } : r
      )
    );
  };


  const filteredReviews = reviews.filter(review => {
    // Apply global filters from FilterControls
    if (filters.searchQuery) {
      const searchLower = filters.searchQuery.toLowerCase();
      const matchesPropertyName = review.property.toLowerCase().includes(searchLower);
      // const matchesCity = review.city.toLowerCase().includes(searchLower);
      // const matchesCountry = review.country.toLowerCase().includes(searchLower);
      if (!matchesPropertyName) return false;
    }
    if (filters.channel !== "All" && review.channel !== filters.channel) return false;

    // Apply local review-specific filters
    if (filterRating !== "all" && review.rating < parseInt(filterRating)) return false;
    if (filterChannel !== "all" && review.channel !== filterChannel) return false;
    return true;
  });

  const renderStars = (rating: number) => {
    // Scaling rating from 10 to a 5 scale for better
    // visibility of stars

    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating/2 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Reviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{reviews.length}</div>
            <p className="text-xs text-muted-foreground">+3 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Public Reviews</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{reviews.filter(r => r.isPublic).length}</div>
            <p className="text-xs text-muted-foreground">Displayed on website</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">
              {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Response Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">87%</div>
            <p className="text-xs text-muted-foreground">Within 24 hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Global Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <FilterControls
            filters={filters}
            onFilterChange={onFilterChange}
            onClearFilters={onClearFilters}
            properties={properties}
            channelsList={getUniqueChannels(reviews)}
          />
        </CardContent>
      </Card>

      {/* Review-Specific Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Review Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <label className="text-sm">Min Rating</label>
              <Select value={filterRating} onValueChange={setFilterRating}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="4">4+ Stars</SelectItem>
                  <SelectItem value="3">3+ Stars</SelectItem>
                  <SelectItem value="2">2+ Stars</SelectItem>
                  <SelectItem value="1">1+ Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm">Sentiment</label>
              <Select value={filterSentiment} onValueChange={setFilterSentiment}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="positive">Positive</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="negative">Negative</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews Table */}
      <Card>
        <CardHeader>
          <CardTitle>Reviews Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Public</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => (
                <TableRow key={review.Id}>
                  <TableCell>{review.property}</TableCell>
                  <TableCell>{review.guest}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                      <span className="ml-2">{review.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate" title={review.review}>
                      {review.review}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{review.channel}</Badge>
                  </TableCell>
                  <TableCell>{new Date(review.submittedAt!).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={review.isPublic}
                        onCheckedChange={() => togglePublicStatus(review.Id)}
                      />
                      {review.isPublic ? (
                        <Eye className="h-4 w-4 text-green-600" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Reply
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}