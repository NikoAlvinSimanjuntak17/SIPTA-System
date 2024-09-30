import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/img/logo-pelindo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const location = useLocation();

  // Determine the active path
  const isActive = (path) => location.pathname === path;

  return (
    <Navbar
      className="relative mt-4 mx-6 bg-[#222E3C] rounded-2xl"
      variant="dark"
    >
      <Container className="d-flex justify-content-between align-items-center h-full">
        <Navbar.Brand href="/home" className="d-flex align-items-start">
          <img
            src={logo}
            alt="PELINDO logo"
            style={{ height: "20px", width: "auto" }}
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Nav
          className="flex align-items-center h-full"
          style={{ position: "relative" }}
        >
          {["/home", "/login"].map((path) => (
            <NavLink
              key={path}
              to={path}
              className="mx-3 poppins-regular text-xs h-full"
              style={{
                color: isActive(path) ? "white" : "#919191",
                position: "relative",
                textDecoration: "none",
                zIndex: 1,
              }}
            >
              {path === "/home" ? "Home" : "Sign In"}
              {isActive(path) && (
                <span
                  className="flex absolute h-8 w-full top-0"
                  style={{
                    borderBottom: "3px solid #3B7DDD",
                    transition: "0.5s",
                    pointerEvents: "none",
                    filter: "drop-shadow(0 15px 45px #25364D)",
                    zIndex: -1,
                  }}
                />
              )}
            </NavLink>
          ))}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
