'use client';
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { ChannelDistribution, ReviewTrend } from "@/types";
import { fetchChannelDistribution, fetchRatingsTrend } from "@/services/analytics.svc";
import { assignColors } from "@/lib/utils";

const revenueData = [
  { month: 'Jan', revenue: 8400, occupancy: 85 },
  { month: 'Feb', revenue: 7800, occupancy: 78 },
  { month: 'Mar', revenue: 9200, occupancy: 92 },
  { month: 'Apr', revenue: 10100, occupancy: 89 },
  { month: 'May', revenue: 11500, occupancy: 95 },
  { month: 'Jun', revenue: 12800, occupancy: 98 },
];

const issueCategories = [
  { category: 'Cleanliness', count: 12, severity: 'high' },
  { category: 'Check-in', count: 8, severity: 'medium' },
  { category: 'Wi-Fi', count: 15, severity: 'low' },
  { category: 'Noise', count: 6, severity: 'medium' },
  { category: 'Amenities', count: 4, severity: 'low' },
];

export function TrendsAnalysis() {
  const [ratingsTrend, setRatingTrend] = useState<ReviewTrend[]>();
  const [channelDistribution, setChannelDistribution] = useState<ChannelDistribution[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const ratingsTrend = await fetchRatingsTrend("2y");
      const channelDistribution = await fetchChannelDistribution("2y");

      setRatingTrend(ratingsTrend);
      setChannelDistribution(assignColors(channelDistribution));
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Occupancy Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Occupancy Trends (placeholder)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#284e4c"
                  strokeWidth={2}
                  name="Revenue ($)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="occupancy"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  name="Occupancy (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Rating Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Rating & Review Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ratingsTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" domain={[3.5, 5]} />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="averageRating"
                  stroke="#f39c12"
                  strokeWidth={2}
                  name="Avg Rating"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="totalReviews"
                  stroke="#3498db"
                  strokeWidth={2}
                  name="Review Count"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Channel Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={channelDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {channelDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recurring Issues */}
        <Card>
          <CardHeader>
            <CardTitle>Recurring Issues (placeholder)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={issueCategories}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill="#284e4c"
                  name="Issue Count"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Issue Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Issue Alerts & Recommendations (placeholder)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {issueCategories.map((issue) => (
              <div key={issue.category} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${issue.severity === 'high' ? 'bg-red-500' :
                    issue.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                  <div>
                    <h4>{issue.category}</h4>
                    <p className="text-sm text-muted-foreground">
                      {issue.count} complaints in the last 30 days
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm px-2 py-1 rounded ${issue.severity === 'high' ? 'bg-red-100 text-red-800' :
                    issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                    {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)} Priority
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}