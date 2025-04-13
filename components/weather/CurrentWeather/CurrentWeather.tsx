"use client"

import Link from "next/link"
import { Button, Card } from "react-bootstrap"

import { WeatherIcon } from "@/components/weather/WeatherIcon"
import { WeatherData } from "@/lib/types"
import { useWeatherStore } from "@/store/weatherStore"

import styles from "./CurrentWeather.module.scss"

interface CurrentWeatherProps {
  data: WeatherData
  className?: string
}

export function CurrentWeather({ data, className = "" }: CurrentWeatherProps) {
  const { favorites, addFavorite, removeFavorite } = useWeatherStore()

  const isFavorite = favorites.includes(data.name)

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(data.name)
    } else {
      addFavorite(data.name)
    }
  }

  const formattedDate = new Date(data.dt * 1000).toLocaleDateString("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const temperature = Math.round(data.main.temp)
  const feelsLike = Math.round(data.main.feels_like)
  const { humidity, pressure } = data.main
  const { speed } = data.wind
  const { description, icon } = data.weather[0]

  return (
    <Card className={`${styles.currentWeather} ${className}`}>
      <Card.Body className="d-flex flex-column gap-4">
        <div className="d-flex justify-content-between align-items-start flex-wrap">
          <div>
            <h2 className="mb-1">
              <Link
                href={`/forecast/${encodeURIComponent(data.name)}`}
                className="text-decoration-none"
              >
                {data.name}, {data.sys.country}
              </Link>
            </h2>
            <p className="text-muted small">{formattedDate}</p>
          </div>
          <Button
            variant={isFavorite ? "outline-danger" : "outline-primary"}
            size="sm"
            onClick={toggleFavorite}
            aria-pressed={isFavorite}
            aria-label={
              isFavorite ? "Удалить из избранного" : "Добавить в избранное"
            }
          >
            <i
              className={`bi ${isFavorite ? "bi-heartbreak" : "bi-heart"} me-1`}
            />
            {isFavorite ? "Удалить" : "В избранное"}
          </Button>
        </div>

        <div className="d-flex justify-content-around align-items-center flex-wrap">
          <WeatherIcon icon={icon} description={description} size={90} />

          <div className={styles.temperature}>
            <div className={styles.currentTemp}>{temperature}°C</div>
            <div className={styles.feelsLike}>Ощущается: {feelsLike}°C</div>
          </div>

          <div className={styles.weatherDetails}>
            <div className="mb-2">
              <i className="bi bi-droplet-fill me-2" />
              Влажность: {humidity}%
            </div>
            <div className="mb-2">
              <i className="bi bi-wind me-2" />
              Ветер: {speed} м/с
            </div>
            <div>
              <i className="bi bi-speedometer2 me-2" />
              Давление: {pressure} гПа
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className={`${styles.weatherDescription} text-capitalize`}>
            {description}
          </p>
        </div>
      </Card.Body>
    </Card>
  )
}
