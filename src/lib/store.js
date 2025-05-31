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
         
          const response = await fetch('http://localhost:3001/photographers')
          const data = await response.json()

          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 1500))

          

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
