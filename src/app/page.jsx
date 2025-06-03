import { Suspense } from "react";
import PhotographerGrid from "@/components/photographer-grid";
import SearchBar from "@/components/search-bar";
import FilterSidebar from "@/components/filter-sidebar";
import MobileFilterDrawer from "@/components/mobile-filter-drawer";
import SortDropdown from "@/components/sort-dropdown";
import { Skeleton } from "@/components/ui/skeleton";
import CityHeading from "@/components/city-heading";


export const metadata = {
  title: "Best",
  description: "Find the best photographers for your special moments",
  icons: {
    icon: "/favicon.png", 
  },
  
};

export default function Home() {
  return (


      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          <CityHeading/>

          <div className="flex flex-col md:flex-row gap-6 mt-6">
            {/* Desktop Sidebar */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <FilterSidebar />
            </div>

            {/* Mobile Filter Drawer Trigger */}
            <div className="md:hidden mb-4">
              <MobileFilterDrawer />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <div className="text-muted-foreground">
                  <Suspense fallback={<Skeleton className="h-5 w-32" />}>
                    <ResultsCount />
                  </Suspense>
                </div>
                <SortDropdown />
              </div>

              <Suspense fallback={<PhotographerGridSkeleton />}>
                <PhotographerGrid />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    
  );
}

function ResultsCount() {
  return (
    <p>
      Showing <span className="font-medium text-foreground">24</span>{" "}
      photographers
    </p>
  );
}

function PhotographerGridSkeleton() {
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
