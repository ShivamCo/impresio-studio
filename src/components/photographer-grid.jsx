"use client";

import { useEffect } from "react";
import PhotographerCard from "./photographer-card";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import usePhotographerStore from "@/lib/store";

export default function PhotographerGrid() {
  const {
    loading,
    error,
    setLoading,
    fetchPhotographers,
    getPaginatedPhotographers,
    loadMore,
  } = usePhotographerStore();

  const { photographers, hasMore, total } = getPaginatedPhotographers();

  useEffect(() => {
    

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      fetchPhotographers();
    }, 1000);

    

  }, [fetchPhotographers]);

  if (loading && photographers.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <div className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <div className="flex gap-2 mb-3">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-4 w-1/3 mb-2" />
                <Skeleton className="h-4 w-1/4 mb-4" />
                <Skeleton className="h-9 w-full" />
              </div>
            </div>
          ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">
          Error loading photographers: {error}
        </p>
        <Button onClick={fetchPhotographers}>Try Again</Button>
      </div>
    );
  }

  if (photographers.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No photographers found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photographers.map((photographer) => (
          <PhotographerCard key={photographer.id} photographer={photographer} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 text-center">
          <Button onClick={loadMore} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            Showing {photographers.length} of {total} photographers
          </p>
        </div>
      )}
    </div>
  );
}
