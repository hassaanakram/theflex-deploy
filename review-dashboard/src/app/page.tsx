'use client';
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { PropertyOverview } from "../components/PropertyOverview";
import { TrendsAnalysis } from "../components/TrendsAnalysis";
import { ReviewsManagement } from "../components/ReviewsManagement";
import { Building, TrendingUp, MessageSquare, Settings } from "lucide-react";
import { FilterState, PropertyOverviewType, ReviewType } from "@/types";
import { fetchPropertiesOverview } from "@/services/overview.svc";
import { fetchReviewsList } from "@/services/review.svc";
import { getUniqueChannels } from "@/lib/utils";

export default function App() {
  const [properties, setProperties] = useState<PropertyOverviewType[]>([]);
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    rating: "all",
    category: "All",
    channel: "All",
    timeRange: "30d",
    sortBy: "revenue",
    sortOrder: "desc"
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      searchQuery: "",
      rating: "all",
      category: "All",
      channel: "All",
      timeRange: "30d",
      sortBy: "revenue",
      sortOrder: "desc"
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('fetching all data');
        const propertyData = await fetchPropertiesOverview(filters.timeRange);
        const reviewData = await fetchReviewsList(filters.timeRange);
        setProperties(propertyData);
        setReviews(reviewData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filters.timeRange]);
  
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-[284e4c]">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#284e4c] rounded-lg flex items-center justify-center">
              <Building className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm text-white">Property Reviews Dashboard</h1>
              <p className="text-sm text-white">See what your guests are saying</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <Building className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Trends</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Reviews</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings (Placeholder)</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <PropertyOverview
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              properties={properties}
              channelsList={getUniqueChannels(reviews)}
            />
          </TabsContent>

          <TabsContent value="trends">
            <TrendsAnalysis />
          </TabsContent>

          <TabsContent value="reviews">
            <ReviewsManagement 
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              properties={properties}
              reviews={reviews}
              setReviews={setReviews}
            />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3>Notification Preferences</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure how you receive alerts about your properties
                    </p>
                  </div>
                  <div>
                    <h3>Integration Settings</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage connections to booking platforms and payment processors
                    </p>
                  </div>
                  <div>
                    <h3>Report Preferences</h3>
                    <p className="text-sm text-muted-foreground">
                      Customize automated reports and analytics
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}