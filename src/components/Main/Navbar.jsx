import React from "react";
import "./Main.css";
import { assets } from "../../assets/assets";

function Navbar() {
  return (
    <div className="nav">
      <p>Gemini</p>
      <img src={assets.user_icon} alt="" />
    </div>
  );
}

export default Navbar;