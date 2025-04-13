import { useState, useEffect } from "react"

import { fetchCurrentWeather } from "@/lib/api/weather"
import { WeatherData } from "@/lib/types"
import { useWeatherStore } from "@/store/weatherStore"

export const useFavorites = () => {
  const { favorites, removeFavorite: removeFromStore } = useWeatherStore()
  const [favoritesWeather, setFavoritesWeather] = useState<WeatherData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFavoritesWeather = async () => {
      if (favorites.length === 0) {
        setFavoritesWeather([])
        return
      }

      setLoading(true)
      setError(null)

      try {
        const weatherPromises = favorites.map((city) =>
          fetchCurrentWeather(city)
        )
        const results = await Promise.all(weatherPromises)
        setFavoritesWeather(results)
      } catch {
        setError("Не удалось загрузить избранные города")
      } finally {
        setLoading(false)
      }
    }

    fetchFavoritesWeather()
  }, [favorites])

  const removeFavorite = (city: string) => {
    removeFromStore(city)
  }

  return {
    favorites: favoritesWeather,
    loading,
    error,
    removeFavorite,
  }
}
