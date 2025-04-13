"use client"

import Link from "next/link"
import { Card, Button } from "react-bootstrap"

import { WeatherIcon } from "@/components/weather/WeatherIcon"
import { WeatherData } from "@/lib/types"

import styles from "./FavoriteCities.module.scss"

interface FavoriteCitiesProps {
  favorites: WeatherData[]
  onRemove: (city: string) => void
}

export function FavoriteCities({ favorites, onRemove }: FavoriteCitiesProps) {
  if (!favorites.length) {
    return (
      <div className={`text-center py-5 ${styles.emptyState}`}>
        <i className="bi bi-cloud-slash-fill display-5 text-muted mb-3"></i>
        <h4>Нет избранных городов</h4>
        <p className="text-muted mb-4">
          Добавьте города в избранное с главной страницы
        </p>
        <Link href="/" className="btn btn-primary btn-lg">
          Поиск городов
        </Link>
      </div>
    )
  }

  return (
    <div className="row g-4">
      {favorites.map((city, index) => (
        <div key={`${city.id}-${index}`} className="col-md-6">
          <Card className={`h-100 ${styles.favoriteCard} position-relative`}>
            <Card.Body className="d-flex flex-column position-relative">
              <Button
                variant="outline-danger"
                size="sm"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onRemove(city.name)
                }}
                className="position-absolute top-0 end-0 m-2 z-3"
                aria-label={`Удалить ${city.name} из избранного`}
              >
                <i className="bi bi-trash"></i>
              </Button>

              <Link
                href={`/forecast/${city.name}`}
                className="text-decoration-none text-dark"
                style={{ textDecoration: "none" }}
              >
                <div>
                  <Card.Title>
                    {city.name}, {city.sys.country}
                  </Card.Title>
                  <Card.Subtitle className="text-muted small">
                    {new Date(city.dt * 1000).toLocaleDateString("ru-RU")}
                  </Card.Subtitle>

                  <div className="d-flex align-items-center mt-3">
                    <WeatherIcon
                      icon={city.weather[0].icon}
                      description={city.weather[0].description}
                      size={60}
                    />
                    <div className="ms-3">
                      <h3 className="mb-1">{Math.round(city.main.temp)}°C</h3>
                      <p className="text-muted text-capitalize mb-0">
                        {city.weather[0].description}
                      </p>
                    </div>
                  </div>

                  <div className="row text-center mt-4">
                    <div className="col-4">
                      <small className="text-muted">Влажность</small>
                      <div className="fw-bold">{city.main.humidity}%</div>
                    </div>
                    <div className="col-4">
                      <small className="text-muted">Ветер</small>
                      <div className="fw-bold">{city.wind.speed} м/с</div>
                    </div>
                    <div className="col-4">
                      <small className="text-muted">Давление</small>
                      <div className="fw-bold">{city.main.pressure} гПа</div>
                    </div>
                  </div>
                </div>
              </Link>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  )
}
