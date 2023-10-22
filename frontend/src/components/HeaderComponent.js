import axios from "axios";
import { useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";


const HeaderComponent = ({ user, setUser }) => {


  const handleClick = async () => {
    const data = await AuthService.logOutService();
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  }

  return (

    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container >
        <Navbar.Brand href="/" size="1000px"><span className="text-success fw-bold h2">Go Green</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/website/dashboard">Website</Nav.Link>
            <Nav.Link href="/user/dashboard">User</Nav.Link>
            <Nav.Link href="/search">Google Search</Nav.Link>
          </Nav>
          <Nav>
            {user ? <>
              <Nav.Link href="/profile">Hi, {user.name}</Nav.Link>
              <Nav.Link onClick={handleClick}>
                Logout
              </Nav.Link> </> : <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </>}


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}
export default HeaderComponent; 