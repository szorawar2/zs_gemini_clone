import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

function Mainbottom() {

  /* Imports context. For more details, view Context.jsx */
  const { onSent, setInput, input } = useContext(Context);

  /* Renders Main-bottom ( Search box and disclaimer ) */
  return (
    <div className="main-bottom">
      <div className="search-box">
        <input
          onKeyDown={(e) => (e.key === "Enter" ? onSent() : null)}
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
        This project is made as an attempt to learn website development. PS: dont sue me google 
      </p>
    </div>
  );
}

export default Mainbottom;
