"use client"

import Link from "next/link"
import { Navbar as BsNavbar, Container, Nav } from "react-bootstrap"

export function Navbar() {
  return (
    <BsNavbar bg="primary" variant="dark" fixed="top">
      <Container>
        <Nav className="me-auto">
          <Link href="/" className="nav-link">
            Главная
          </Link>
          <Link href="/favorites" className="nav-link">
            Избранное
          </Link>
        </Nav>
      </Container>
    </BsNavbar>
  )
}
