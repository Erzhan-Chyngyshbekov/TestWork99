"use client"

import { Alert } from "react-bootstrap"

interface ErrorAlertProps {
  message: string
  onClose?: () => void
  className?: string
}

export function ErrorAlert({ message, onClose, className }: ErrorAlertProps) {
  return (
    <Alert
      variant="danger"
      dismissible={!!onClose}
      onClose={onClose}
      className={className}
    >
      {message}
    </Alert>
  )
}
