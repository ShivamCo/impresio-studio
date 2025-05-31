"use client"

import { useState } from "react"
import { Filter } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import FilterSidebar from "./filter-sidebar"
import usePhotographerStore from "@/lib/store"

export default function MobileFilterDrawer() {
  const [open, setOpen] = useState(false)
  const { filteredPhotographers } = usePhotographerStore()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full flex items-center justify-center gap-2">
          <Filter className="h-4 w-4" />
          Filters ({filteredPhotographers.length})
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <FilterSidebar />
        </div>
      </SheetContent>
    </Sheet>
  )
}
