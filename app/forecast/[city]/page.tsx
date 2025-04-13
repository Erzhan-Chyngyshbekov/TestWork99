import { notFound } from "next/navigation"
import Link from "next/link"

import { ForecastList } from "@/components/weather/ForecastList"
import { fetchForecast } from "@/lib/api/weather"

import styles from "./ForecastPage.module.scss"

interface ForecastPageProps {
  params: { city: string }
}

export default async function ForecastPage({ params }: ForecastPageProps) {
  const city = decodeURIComponent(params.city)

  if (!city) {
    notFound()
  }

  try {
    const forecast = await fetchForecast(city)

    if (!forecast) {
      notFound()
    }

    return (
      <div className={styles.container}>
        <Link href="/" className="btn btn-outline-secondary mb-4">
          <i className="bi bi-arrow-left me-2"></i> Назад на главную
        </Link>

        <div className="text-center mb-5">
          <h1 className={styles.title}>
            Прогноз для {forecast.city.name}, {forecast.city.country}
          </h1>
          <p className="text-muted">Почасовой прогноз на 5 дней</p>
        </div>

        <ForecastList forecast={forecast} />
      </div>
    )
  } catch {
    notFound()
  }
}
