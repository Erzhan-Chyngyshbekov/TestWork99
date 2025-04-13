"use client"

import { WeatherIcon } from "@/components/weather/WeatherIcon"
import { ForecastItem } from "@/lib/types"

import styles from "./ForecastDay.module.scss"

interface ForecastDayProps {
  item: ForecastItem
  isLast?: boolean
}

export function ForecastDay({ item, isLast }: ForecastDayProps) {
  return (
    <div
      className={`list-group-item ${styles.forecastDay} ${
        isLast ? styles.lastItem : ""
      }`}
    >
      <div className="row align-items-center">
        <div className="col-3">
          {new Date(item.dt * 1000).toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
        <div className="col-2">
          <WeatherIcon
            icon={item.weather[0].icon}
            description={item.weather[0].description}
            size={40}
          />
        </div>
        <div className="col-2 fw-bold">{Math.round(item.main.temp)}°C</div>
        <div className="col-3 text-capitalize">
          {item.weather[0].description}
        </div>
        <div className="col-2 text-end">
          <span className="badge bg-light text-dark">
            {item.wind.speed} м/с
          </span>
        </div>
      </div>
    </div>
  )
}
