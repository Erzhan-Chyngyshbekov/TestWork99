"use client"

import { useState } from "react"
import { Container } from "react-bootstrap"

import { SearchBar } from "@/components/common/SearchBar"
import { CurrentWeather } from "@/components/weather/CurrentWeather"
import { LoadingSpinner } from "@/components/common/LoadingSpinner"
import { ErrorAlert } from "@/components/common/ErrorAlert"
import { useWeather } from "@/hooks/useWeather"

import styles from "./MainPage.module.scss"

export default function HomePage() {
  const [city, setCity] = useState("")
  const { weather, loading, error } = useWeather(city)

  const handleSearch = (searchCity: string) => {
    setCity(searchCity)
  }

  return (
    <section className={styles.wrapper}>
      <Container className="py-5">
        <h1 className={`text-center mb-4 ${styles.title}`}>Прогноз погоды</h1>

        <div className="mb-4">
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {loading && <LoadingSpinner />}
        {error && <ErrorAlert message={error} onClose={() => setCity("")} />}

        {weather && !loading && (
          <CurrentWeather data={weather} className={styles.weatherCard} />
        )}
      </Container>
    </section>
  )
}
