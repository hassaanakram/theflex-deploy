'use client';

import { api } from "@/api";
import { Card, CardContent } from "@/components/ui/card"
import { formatDate } from "@/lib/utils";
import { ReviewResponse, ReviewSectionProps, ReviewType } from "@/types";
import { Star } from "lucide-react"
import { useEffect, useState } from "react";

interface Review {
  id: number
  review: string
  rating: number
  guest: string
  date: string
}

export function ReviewsSection({property}: ReviewSectionProps) {
  const reviewsMock: Review[] = [
    {
      id: 1,
      review:
        "Amazing apartment with stunning views! The location is perfect for exploring Paris, and the space is exactly as described. Very clean and well-equipped. Would definitely stay here again.",
      rating: 5,
      guest: "Marie L.",
      date: "October 2024",
    },
    {
      id: 2,
      review:
        "Great location in La Défense with easy access to central Paris. The apartment is modern and comfortable. Host was very responsive and helpful throughout our stay.",
      rating: 4,
      guest: "James R.",
      date: "September 2024",
    },
    {
      id: 3,
      review:
        "Perfect for a business trip! Close to the metro and business district. The apartment has everything you need and is very quiet despite being in a busy area.",
      rating: 5,
      guest: "Sophie M.",
      date: "September 2024",
    },
    {
      id: 4,
      review:
        "Lovely apartment with great amenities. The kitchen is fully equipped and the living space is very comfortable. Excellent value for money in this area of Paris.",
      rating: 4,
      guest: "David K.",
      date: "August 2024",
    },
  ]
  const [reviews, setRreviews] = useState<ReviewType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.get<ReviewResponse>(`/api/reviews/hostaway?property=${property}`);
        setRreviews(data.reviews.filter((r) => r.isPublic));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} className={`w-4 h-4 ${index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Guest Reviews</h2>
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex items-center space-x-1">{renderStars(Math.round(averageRating))}</div>
            <span className="text-sm text-muted-foreground">
              {averageRating.toFixed(1)} out of 5 ({reviews.length} reviews)
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {reviews.map((review) => (
          <Card key={review.Id} className="border-l-4 border-l-[#284e4c]">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">{renderStars(review.rating)}</div>
                  <span className="text-sm font-medium">{review.guest}</span>
                </div>
                <span className="text-xs text-muted-foreground">{formatDate(review.submittedAt!)}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{review.review}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <button className="text-sm text-[#284e4c] hover:underline font-medium">Show all reviews →</button>
      </div>
    </section>
  )
}
