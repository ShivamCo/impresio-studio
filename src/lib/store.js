import { create } from "zustand"
import { devtools } from "zustand/middleware"

const usePhotographerStore = create(
  devtools(
    (set, get) => ({
      // Photographer data
      photographers: [],
      filteredPhotographers: [],
      loading: false,
      error: null,

      // Search and filter state
      searchQuery: "",
      filters: {
        priceRange: [5000, 25000],
        ratings: [],
        styles: [],
        city: "bengaluru",
      },
      sortBy: "rating",

      // Pagination
      currentPage: 1,
      itemsPerPage: 12,
      hasMore: true,

      // Actions
      setPhotographers: (photographers) =>
        set((state) => ({
          photographers,
          filteredPhotographers: photographers,
        })),

      setLoading: (loading) => set({ loading }),

      setError: (error) => set({ error }),

      setSearchQuery: (searchQuery) =>
        set((state) => {
          const filtered = state.applyFilters(state.photographers, searchQuery, state.filters, state.sortBy)
          return {
            searchQuery,
            filteredPhotographers: filtered,
            currentPage: 1,
          }
        }),

      updateFilters: (newFilters) =>
        set((state) => {
          const updatedFilters = { ...state.filters, ...newFilters }
          const filtered = state.applyFilters(state.photographers, state.searchQuery, updatedFilters, state.sortBy)
          return {
            filters: updatedFilters,
            filteredPhotographers: filtered,
            currentPage: 1,
          }
        }),

      setSortBy: (sortBy) =>
        set((state) => {
          const filtered = state.applyFilters(state.photographers, state.searchQuery, state.filters, sortBy)
          return {
            sortBy,
            filteredPhotographers: filtered,
            currentPage: 1,
          }
        }),

      loadMore: () =>
        set((state) => ({
          currentPage: state.currentPage + 1,
        })),

      // Helper function to apply all filters
      applyFilters: (photographers, searchQuery, filters, sortBy) => {
        let filtered = [...photographers]

        // Apply search filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase()
          filtered = filtered.filter(
            (photographer) =>
              photographer.name.toLowerCase().includes(query) ||
              photographer.location.toLowerCase().includes(query) ||
              photographer.tags.some((tag) => tag.toLowerCase().includes(query)),
          )
        }

        // Apply price range filter
        filtered = filtered.filter(
          (photographer) => photographer.price >= filters.priceRange[0] && photographer.price <= filters.priceRange[1],
        )

        // Apply rating filter
        if (filters.ratings.length > 0) {
          filtered = filtered.filter((photographer) =>
            filters.ratings.some((rating) => photographer.rating >= Number.parseInt(rating)),
          )
        }

        // Apply style filter
        if (filters.styles.length > 0) {
          filtered = filtered.filter((photographer) =>
            filters.styles.some((style) => photographer.tags.includes(style)),
          )
        }

        // Apply city filter
        if (filters.city !== "all") {
          filtered = filtered.filter((photographer) =>
            photographer.location.toLowerCase().includes(filters.city.toLowerCase()),
          )
        }

        // Apply sorting
        switch (sortBy) {
          case "price-low":
            filtered.sort((a, b) => a.price - b.price)
            break
          case "price-high":
            filtered.sort((a, b) => b.price - a.price)
            break
          case "rating":
            filtered.sort((a, b) => b.rating - a.rating)
            break
          case "recent":
            // In a real app, you'd sort by creation date
            filtered.sort((a, b) => b.id.localeCompare(a.id))
            break
          default:
            break
        }

        return filtered
      },

      // Fetch photographers (mock API call)
      fetchPhotographers: async () => {
        set({ loading: true, error: null })

        try {
          // In a real app, this would be:
          // const response = await fetch('http://localhost:3001/photographers')
          // const data = await response.json()

          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 1500))

          const mockData = Array(24)
            .fill(0)
            .map((_, i) => ({
              id: `photographer-${i + 1}`,
              name: [
                "Priya Sharma",
                "Anita Reddy",
                "Kavya Nair",
                "Sneha Gupta",
                "Meera Patel",
                "Riya Singh",
                "Pooja Kumar",
                "Divya Iyer",
                "Shreya Joshi",
                "Nisha Agarwal",
                "Asha Menon",
                "Deepika Rao",
                "Sonal Shah",
                "Preeti Verma",
                "Swati Desai",
                "Manisha Pillai",
                "Rekha Bhat",
                "Sunita Jain",
                "Vidya Krishnan",
                "Lakshmi Devi",
                "Shweta Malhotra",
                "Neha Chopra",
                "Radhika Sinha",
                "Pallavi Bhatt",
              ][i],
              profileImage: `/placeholder.svg?height=300&width=300&text=Photo${i + 1}`,
              location: [
                "Indiranagar, Bengaluru",
                "Koramangala, Bengaluru",
                "Whitefield, Bengaluru",
                "JP Nagar, Bengaluru",
                "HSR Layout, Bengaluru",
                "Marathahalli, Bengaluru",
                "Electronic City, Bengaluru",
                "Banashankari, Bengaluru",
              ][i % 8],
              price: 5000 + i * 1500 + Math.floor(Math.random() * 3000),
              rating: 3.5 + Math.random() * 1.5,
              reviews: 15 + Math.floor(Math.random() * 50),
              tags: [
                ["Candid", "Outdoor"],
                ["Studio", "Traditional"],
                ["Natural Light", "Creative"],
                ["Candid", "Studio"],
                ["Outdoor", "Traditional"],
                ["Creative", "Natural Light"],
              ][i % 6],
              experience: `${3 + Math.floor(i / 3)}+ years`,
              bio: "Specializing in maternity photography with a focus on natural moments and beautiful lighting.",
            }))

          set((state) => ({
            photographers: mockData,
            filteredPhotographers: state.applyFilters(mockData, state.searchQuery, state.filters, state.sortBy),
            loading: false,
          }))
        } catch (error) {
          set({ error: error.message, loading: false })
        }
      },

      // Get paginated results
      getPaginatedPhotographers: () => {
        const state = get()
        const startIndex = 0
        const endIndex = state.currentPage * state.itemsPerPage
        const paginatedResults = state.filteredPhotographers.slice(startIndex, endIndex)
        const hasMore = endIndex < state.filteredPhotographers.length

        return {
          photographers: paginatedResults,
          hasMore,
          total: state.filteredPhotographers.length,
        }
      },
    }),
    {
      name: "photographer-store",
    },
  ),
)

export default usePhotographerStore
