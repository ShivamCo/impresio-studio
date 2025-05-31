"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Button } from "./ui/button"
import usePhotographerStore from "@/lib/store"

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = usePhotographerStore()
  const [localQuery, setLocalQuery] = useState(searchQuery)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [localQuery, setSearchQuery])

  const handleClear = () => {
    setLocalQuery("")
    setSearchQuery("")
  }

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <input
          type="text"
          placeholder="Search by name, location, or style..."
          className="w-full pl-10 pr-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
        />
        {localQuery && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      {searchQuery && (
        <p className="text-sm text-muted-foreground mt-2">
          Searching for: <span className="font-medium">"{searchQuery}"</span>
        </p>
      )}
    </div>
  )
}
