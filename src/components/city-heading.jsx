"use client"

import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import SearchBar from "./search-bar"
import usePhotographerStore from "@/lib/store"

export default function CityHeading() {
  const { filters, updateFilters } = usePhotographerStore();

  const allCategories = ["Couple", "Candid", "Studio", "Outdoor"];

  const allCities = ["Delhi", "Bengaluru", "Mumbai", "Chennai", "Hyderabad"];

  const toggleCategory = (category) => {
    const styles = filters.styles.includes(category)
      ? filters.styles.filter((c) => c !== category)
      : [...filters.styles, category];
    updateFilters({ styles });
  };

  const changeCity = (city) => {
    updateFilters({ city: city.toLowerCase() });
  };

  return (
    <section className="w-full py-8 bg-white">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="mb-8">
          {/* Heading Card */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-orange-600/10 rounded-2xl blur-xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white text-xl font-bold">📸</span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
                  </div>
                  <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent leading-tight">
                      Maternity Photographers
                    </h1>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="text-lg font-medium text-gray-600">in</span>
                      <div className="relative">
                        <span className="text-2xl font-bold text-gray-800 relative z-10">
                          {filters.city.toUpperCase()}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg transform rotate-1 scale-110 opacity-50"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-gray-600 max-w-2xl mx-auto">
                Discover talented photographers who specialize in capturing the beautiful journey of motherhood with
                artistic flair and professional expertise.
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-10">
            <SearchBar />
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Photography Categories</h2>
            <div className="flex flex-wrap gap-3">
              {allCategories.map((category) => {
                const isSelected = filters.styles.includes(category);
                return (
                  <Badge
                    key={category}
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => toggleCategory(category)}
                    className={`text-sm py-2 px-4 rounded-full cursor-pointer hover:bg-gray-100 ${
                      isSelected ? "bg-black text-white hover:bg-black/90" : "bg-white"
                    }`}
                  >
                    {category}
                  </Badge>
                );
              })}
            </div>
          </div>

          {/* Cities */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Available Cities</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {allCities.map((city) => {
                const isSelected = filters.city.toLowerCase() === city.toLowerCase();
                return (
                  <Badge
                    key={city}
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => changeCity(city)}
                    className={`text-sm py-2 px-4 rounded-full cursor-pointer hover:bg-gray-100 ${
                      isSelected ? "bg-black text-white hover:bg-black/90" : "bg-white"
                    }`}
                  >
                    {city}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
