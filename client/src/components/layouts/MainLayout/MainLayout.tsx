import { PropsWithChildren, useState, MouseEvent, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { IMainLayoutProps } from './types'

export function MainLayout(props: PropsWithChildren<IMainLayoutProps>) {
  const { children, isAuth, userEmail } = props
  const navigateTo = useNavigate()

  return (
    <>
      <Navbar sticky="top" bg="light" expand="lg">
        <Container>
          <Navbar.Brand style={{ cursor: 'pointer' }}>E-Passport</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>News</Nav.Link>
              <Nav.Link>E-Check</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {isAuth ? (
              <NavDropdown align="end" title={userEmail} id="basic-nav-dropdown">
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Item>
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Item >Edit Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  'Logout'
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button onClick={() => navigateTo('login')} variant="outline-warning">Login</Button>
            )
          }
        </Container>
      </Navbar>
      <div style={{ backgroundColor: '#E8E8E8', padding: '0 10%' }}>
        <Container style={{ backgroundColor: '#FFF', height: '100vh' }}>
          {children}
        </Container>
      </div>
      <Navbar bg="dark" variant="dark">
        <Container>
        <div style={{ color: 'white', textAlign: 'center' }}>Tarasoff Inc. ©</div>

          <Navbar.Collapse id="footer-navbar-nav"/>
          <div style={{ color: 'white', textAlign: 'center' }}>{new Date().getFullYear()}</div>
        </Container>
      </Navbar>
    </>
  )
}
