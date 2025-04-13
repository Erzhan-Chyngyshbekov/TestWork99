export interface WeatherData {
  id: number
  name: string
  sys: {
    country: string
  }
  main: {
    temp: number
    feels_like: number
    humidity: number
    pressure: number
    temp_min: number
    temp_max: number
  }
  wind: {
    speed: number
    deg: number
  }
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  dt: number
}

export interface ForecastData {
  list: ForecastItem[]
  city: {
    name: string
    country: string
  }
}

export interface ForecastItem {
  dt: number
  main: {
    temp: number
    feels_like: number
    humidity: number
    pressure: number
    temp_min: number
    temp_max: number
  }
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  wind: {
    speed: number
    deg: number
  }
  dt_txt: string
}
