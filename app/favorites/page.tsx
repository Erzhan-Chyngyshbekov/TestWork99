"use client"

import { FavoriteCities } from "@/components/weather/FavoriteCities"
import { LoadingSpinner } from "@/components/common/LoadingSpinner"
import { ErrorAlert } from "@/components/common/ErrorAlert"
import { useFavorites } from "@/hooks/useFavorites"

import styles from "./FavoritesPage.module.scss"

export default function FavoritesPage() {
  const { favorites, loading, error, removeFavorite } = useFavorites()

  return (
    <div className={styles.container}>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className={`text-center mb-4 ${styles.title}`}>
            <i className="bi bi-star-fill me-2"></i>
            Избранные города
          </h1>

          {loading && <LoadingSpinner fullPage />}
          {error && <ErrorAlert message={error} className="mb-4" />}

          {!loading && !error && (
            <FavoriteCities favorites={favorites} onRemove={removeFavorite} />
          )}
        </div>
      </div>
    </div>
  )
}
