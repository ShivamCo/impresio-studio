"use client"

import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import { Skeleton } from "./ui/skeleton"

export default function ReviewList({ photographerId }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, fetch reviews from your API based on photographerId
    setTimeout(() => {
      const mockReviews = Array(5)
        .fill(0)
        .map((_, i) => ({
          id: `review-${i}`,
          name: `Client ${i + 1}`,
          rating: 3 + Math.floor(Math.random() * 3),
          date: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          comment: [
            "Amazing experience! The photographer made me feel so comfortable during the shoot. The photos turned out beautiful and captured this special time perfectly.",
            "Very professional and creative. Loved how the photos highlighted my baby bump in such an artistic way.",
            "Great photographer with an eye for detail. The lighting and composition were perfect.",
            "Wonderful experience from start to finish. The photographer was patient and had great ideas for poses.",
            "Highly recommend! The photos exceeded my expectations and will be treasured forever.",
          ][i],
        }))

      setReviews(mockReviews)
      setLoading(false)
    }, 1000)
  }, [photographerId])

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
    )
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Client Reviews</h2>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4 last:border-0">
            <div className="flex justify-between items-start">
              <h3 className="font-medium">{review.name}</h3>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted"}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{review.date}</p>
            <p className="mt-2">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
