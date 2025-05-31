"use client"

import usePhotographerStore from "@/lib/store"

export default function SortDropdown() {
  const { sortBy, setSortBy } = usePhotographerStore()

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm">
        Sort by:
      </label>
      <select
        id="sort"
        className="text-sm border rounded-md p-1.5 bg-background"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="rating">Rating: High to Low</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="recent">Recently Added</option>
      </select>
    </div>
  )
}
