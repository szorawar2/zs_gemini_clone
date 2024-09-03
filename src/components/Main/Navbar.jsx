import React, { useContext, useState } from "react";
import "./Main.css";
import "../Sidebar/Sidebar.css"
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";


const Navbar = () => {

  const { setExtended } = useContext(Context);

  return (
    <div className="nav">
      <img
        onClick={() => setExtended((prev) => !prev)}
        className="menu"
        src={assets.menu_icon}
        alt=""
      />
      <p>Gemini-Clone by ZS</p>
      <img src={assets.user_icon} alt="" />
    </div>
  );
};

export default Navbar;
