import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/About";
import { Store } from "./pages/HOme";
import { About } from "./pages/Store";
import HeaderMenu from "./components/navabar";
import Dashboard from "./pages/dahsboard";

const App: React.FC = () => {
  return (
    <>
      <HeaderMenu />
      <Container className=" mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teacher" element={<Store />} />
          <Route path="/Students" element={<About />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
