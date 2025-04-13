"use client"

import { Spinner } from "react-bootstrap"

interface LoadingSpinnerProps {
  fullPage?: boolean
}

export function LoadingSpinner({ fullPage = false }: LoadingSpinnerProps) {
  if (fullPage) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <Spinner animation="border" role="status" />
      </div>
    )
  }

  return (
    <div className="text-center my-3">
      <Spinner animation="border" role="status" />
    </div>
  )
}
