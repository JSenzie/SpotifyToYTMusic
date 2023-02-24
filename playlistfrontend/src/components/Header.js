import React from "react"
import { Link } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Spotify to Youtube Music
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header
