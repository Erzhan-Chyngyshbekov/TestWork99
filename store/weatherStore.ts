import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface WeatherState {
  favorites: string[]
  addFavorite: (city: string) => void
  removeFavorite: (city: string) => void
}

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (city) =>
        set((state) => ({
          favorites: Array.from(new Set([...state.favorites, city])),
        })),
      removeFavorite: (city) =>
        set((state) => ({
          favorites: state.favorites.filter((c) => c !== city),
        })),
    }),
    {
      name: "weather-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
