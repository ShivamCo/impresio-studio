"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export default function ReviewList({ photographerReviews }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const formattedReviews = photographerReviews?.map((review, i) => ({
        id: `review-${i}`,
        ...review,
      })) || [];
      setReviews(formattedReviews);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [photographerReviews]);

  if (loading) {
    return (
      <div className="space-y-6">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-24" />
              </div>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-16 w-full" />
            </div>
          ))}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Client Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-muted-foreground text-sm">No reviews available.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-0">
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{review.name}</h3>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{review.date}</p>
              <p className="mt-2 text-sm">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
