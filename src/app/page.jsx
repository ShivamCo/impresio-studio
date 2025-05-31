
import PhotographerGrid from "@/components/photographer-grid"


// export const metadata = {
//   title: "Maternity Photographers in Bengaluru",
//   description: "Find the best maternity photographers in Bengaluru for your special moments",
// }

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <PhotographerGrid />
    </main>
  )
}

function ResultsCount() {
  return (
    <p>
      Showing <span className="font-medium text-foreground">24</span> photographers
    </p>
  )
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
  )
}
