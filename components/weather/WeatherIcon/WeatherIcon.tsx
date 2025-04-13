"use client"

import { useState } from "react"
import Image from "next/image"

import styles from "./WeatherIcon.module.scss"

interface WeatherIconProps {
  icon: string
  description: string
  size?: number
}

export function WeatherIcon({
  icon,
  description,
  size = 50,
}: WeatherIconProps) {
  const [loaded, setLoaded] = useState(false)
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`

  return (
    <div
      className={`${styles.weatherIcon} ${loaded ? styles.loaded : ""}`}
      style={{ width: size, height: size }}
      title={description}
    >
      <Image
        src={iconUrl}
        alt={description}
        width={size}
        height={size}
        onLoadingComplete={() => setLoaded(true)}
      />
    </div>
  )
}
