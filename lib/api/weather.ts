import { axiosInstance } from "./instance"
import { WeatherData, ForecastData } from "@/lib/types"

export const fetchCurrentWeather = async (
  city: string
): Promise<WeatherData> => {
  const response = await axiosInstance.get("/weather", {
    params: {
      q: city,
    },
  })
  return response.data
}

export const fetchForecast = async (city: string): Promise<ForecastData> => {
  const response = await axiosInstance.get("/forecast", {
    params: {
      q: city,
      cnt: 40,
    },
  })
  return response.data
}
