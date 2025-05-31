"use client"

import { Slider } from "./ui/slider"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import usePhotographerStore from "@/lib/store"

export default function FilterSidebar() {
  const { filters, updateFilters } = usePhotographerStore()

  const handlePriceRangeChange = (value) => {
    updateFilters({ priceRange: value })
  }

  const handleRatingChange = (value) => {
    const newRatings = filters.ratings.includes(value)
      ? filters.ratings.filter((r) => r !== value)
      : [...filters.ratings, value]
    updateFilters({ ratings: newRatings })
  }

  const handleStyleChange = (value) => {
    const newStyles = filters.styles.includes(value)
      ? filters.styles.filter((s) => s !== value)
      : [...filters.styles, value]
    updateFilters({ styles: newStyles })
  }

  const handleCityChange = (value) => {
    updateFilters({ city: value })
  }

  const clearAllFilters = () => {
    updateFilters({
      priceRange: [1000, 25000],
      ratings: [],
      styles: [],
      city: "bengaluru",
    })
  }

  const hasActiveFilters =
    filters.priceRange[0] !== 1000 ||
    filters.priceRange[1] !== 25000 ||
    filters.ratings.length > 0 ||
    filters.styles.length > 0 ||
    filters.city !== "bengaluru"

  return (
    <div className="bg-card p-4 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg">Filters</h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <h3 className="font-medium mb-3">Price Range</h3>
          <Slider
            min={1000}
            max={50000}
            step={1000}
            value={filters.priceRange}
            onValueChange={handlePriceRangeChange}
            className="mb-2"
          />
          <div className="flex justify-between text-sm">
            <span>₹{filters.priceRange[0].toLocaleString()}</span>
            <span>₹{filters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>

        {/* Ratings */}
        <div>
          <h3 className="font-medium mb-3">Ratings</h3>
          <div className="space-y-2">
            {["5", "4", "3"].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={filters.ratings.includes(rating)}
                  onCheckedChange={() => handleRatingChange(rating)}
                />
                <Label htmlFor={`rating-${rating}`} className="flex items-center">
                  {rating}+ <Star className="w-3 h-3 ml-1 fill-primary text-primary" />
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Styles */}
        <div>
          <h3 className="font-medium mb-3">Styles</h3>
          <div className="space-y-2">
            {["Traditional", "Candid", "Studio", "Outdoor", "Natural Light", "Creative"].map((style) => (
              <div key={style} className="flex items-center space-x-2">
                <Checkbox
                  id={`style-${style}`}
                  checked={filters.styles.includes(style)}
                  onCheckedChange={() => handleStyleChange(style)}
                />
                <Label htmlFor={`style-${style}`}>{style}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* City */}
        <div>
          <h3 className="font-medium mb-3">City</h3>
          <select
            className="w-full border rounded-md p-2"
            value={filters.city}
            onChange={(e) => handleCityChange(e.target.value)}
          >
            <option value="bengaluru">Bengaluru</option>
            <option value="mumbai">Mumbai</option>
            <option value="delhi">Delhi</option>
            <option value="chennai">Chennai</option>
            <option value="hyderabad">Hyderabad</option>
            <option value="all">All Cities</option>
          </select>
        </div>
      </div>
    </div>
  )
}

function Star(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
