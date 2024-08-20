import React, { useContext } from "react";
import "./Main.css";
import { Context } from "../../context/Context";
import Cards from "./Cards";

function Greet() {

    const {onSent} = useContext(Context);

    const clickCard = async (prompt) => {
        await onSent(undefined, prompt);
      };

    return (
        <>
        <div className="greet">
          <p>
            <span>Hello, User.</span>
          </p>
          <p>How can I help you today?</p>
        </div>
        <Cards clickFunc={clickCard}></Cards>
      </>
    );
}

export default Greet;