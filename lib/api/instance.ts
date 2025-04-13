import axios from "axios"

const API_KEY =
  process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY ||
  "56572e23327b63633acb69d0e22c2383"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: "metric",
    lang: "ru",
  },
})
