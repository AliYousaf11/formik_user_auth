import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "../views/Navbar";
import { Login } from "../pages/Login";
import { Registeraton } from "../pages/Registeration";
import { Home } from "../views/Home";
export const Approutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registeraton" element={<Registeraton />} />
      </Routes>
    </BrowserRouter>
  );
};
