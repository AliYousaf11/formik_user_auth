import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const RouterLinks = [
    {
      to: "/",
      name: "Home",
    },
    {
      to: "/login",
      name: "Login",
    },
    {
      to: "/registeraton",
      name: "Registeraton",
    },
  ];
  return (
    <div className="Navbar">
      {RouterLinks.map(({ to, name }, index) => {
        return (
          <div key={index}>
            <Link to={to} name={name}>
              {name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};
