import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("first_Token");
    if (token) {
      alert("after 1 mintue you are logout");
      setTimeout(() => {
        localStorage.clear();
        navigate("/login");
      }, 60 * 1000);
    } else {
      navigate("/login");
    }
  });
  const date = new Date().toLocaleString();
  return (
    <div>
      <p>Home {date}</p>
    </div>
  );
};
