import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

function Mainbottom() {

    const {onSent, setInput, input} = useContext(Context);

  return (
    <div className="main-bottom">
      <div className="search-box">
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Enter a prompt here"
        />
        <div>
          <img src={assets.gallery_icon} alt="" />
          <img src={assets.mic_icon} alt="" />
          {input ? (
            <img onClick={() => onSent()} src={assets.send_icon} alt="" />
          ) : null}
        </div>
      </div>
      <p className="bottom-info">
        Gemini may display inaccurate info, including about people, so
        double-check its responses. Your privacy and Gemini Apps
      </p>
    </div>
  );
}

export default Mainbottom;