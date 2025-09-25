'use client';

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star, DollarSign, Users, Calendar } from "lucide-react";
import { useState } from "react";
import { PropertyOverviewProps } from "@/types";
import { FilterControls } from "./FilterControls";

export function PropertyOverview({ filters, onFilterChange, onClearFilters, properties, channelsList }: PropertyOverviewProps) {
  
  const totalRevenue = properties.reduce(() => 0, 0);
  const avgRating = properties.reduce((sum, prop) => sum + prop.averageRating, 0) / properties.length;
  const [selectedProperty, setSelectedProperty] = useState<string>(""); // @typescript-eslint/no-unused-vars

  function onPropertySelect(property: string): void {
    return;
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Revenue (placeholder)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{avgRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Across all properties</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Occupancy Rate  (placeholder)</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">100%</div>
            <p className="text-xs text-muted-foreground">+2.3% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Properties</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{properties.length}</div>
            <p className="text-xs text-muted-foreground">Active listings</p>
          </CardContent>
        </Card>
      </div>

      {/*Filter controls*/}
      <Card>
        <CardHeader>
          <CardTitle>Filter & Sort Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <FilterControls
            filters={filters}
            onFilterChange={onFilterChange}
            onClearFilters={onClearFilters}
            properties={properties}
            channelsList={channelsList}
          />
        </CardContent>
      </Card>
      {/* Property Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <Card
            key={property.property}
            className={`cursor-pointer transition-all hover:shadow-md ${selectedProperty === property.property ? "ring-2 ring-[#284e4c] border-[#284e4c]" : ""
              }`}
            onClick={() => onPropertySelect(property.property)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{property.property}</CardTitle>
                <Badge variant="default">
                  {property.averageRating < 5 ? "Needs Attention" : property.averageRating < 7 ? "Good" : "Excellent"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{property.averageRating.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground">({property.reviewCount})</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Revenue  (placeholder)</span>
                  <span>$15000</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}