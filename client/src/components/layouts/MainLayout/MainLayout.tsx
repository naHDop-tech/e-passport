import { PropsWithChildren, useState, MouseEvent, useMemo } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function MainLayout(props: PropsWithChildren<{}>) {
  const { children } = props
  return (
    <>
      <Navbar sticky="top" bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">E-Passport</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#news">News</Nav.Link>
              <Nav.Link href="#e-check">E-Check</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <NavDropdown align="end" title="grigory@maroo.us" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="#action/settings">
              Settings
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/edit-profile">Edit Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/logout">
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>
      <div style={{ backgroundColor: '#E8E8E8', padding: '0 10%' }}>
        <Container style={{ backgroundColor: '#FFF' }}>
          {children}
        </Container>
      </div>
    </>
  )
}
