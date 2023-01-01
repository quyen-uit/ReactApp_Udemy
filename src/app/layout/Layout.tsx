import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Container } from "semantic-ui-react";
import HomePage from "../../features/home/HomePage";
import NavBar from "./NavBar";

export default function Layout() {
  const location = useLocation();
  return (
    <>
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container style={{ marginTop: "80px" }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}
