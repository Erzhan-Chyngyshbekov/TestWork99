"use client"

import { useState, KeyboardEvent } from "react"
import { Form, InputGroup, Button } from "react-bootstrap"
import styles from "./SearchBar.module.scss"

interface SearchBarProps {
  onSearch: (city: string) => void
  loading?: boolean
}

export function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim())
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <InputGroup className={`mb-3 ${styles.searchBar}`}>
      <Form.Control
        placeholder="Введите город..."
        aria-label="Поиск города"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      <Button
        variant="primary"
        onClick={handleSearch}
        disabled={!searchTerm.trim() || loading}
      >
        {loading ? "Поиск..." : "Поиск"}
      </Button>
    </InputGroup>
  )
}
