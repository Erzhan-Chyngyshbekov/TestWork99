"use client"

import { useState, useEffect } from "react"

import { fetchCurrentWeather, fetchForecast } from "@/lib/api/weather"
import { WeatherData, ForecastData } from "@/lib/types"
import { useDebounce } from "@/hooks/useDebounce"

export const useWeather = (city: string) => {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const debouncedCity = useDebounce(city, 500)

  useEffect(() => {
    if (!debouncedCity) return

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const [current, forecastData] = await Promise.all([
          fetchCurrentWeather(debouncedCity),
          fetchForecast(debouncedCity),
        ])

        setWeather(current)
        setForecast(forecastData)
      } catch {
        setError("Не удалось получить данные о погоде")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [debouncedCity])

  return { weather, forecast, loading, error }
}
