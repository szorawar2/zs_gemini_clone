import React, { useContext } from "react";
import Cardprompt from "./Cardprompt";
import { assets } from "../../assets/assets";

function Cards(props) {
  let prompt1 = Cardprompt({
    prompt:
      "make up a one line prompt, less than 10 words about travel suggestions/idea, make the prompt based on human typing, written in first person. dont include [] or 'Im stuck'",
  });
  let prompt2 = Cardprompt({
    prompt:
      "make up a one line prompt, less than 10 words about generic suggestions/idea, make the prompt based on human typing, written in first person. dont include [] or 'Im stuck'",
  });
  let prompt3 = Cardprompt({
    prompt:
      "make up a one line prompt, less than 10 words about email writing suggestions/idea/advice, make the prompt based on human typing, written in first person. dont include [] or 'Im stuck'",
  });
  let prompt4 = Cardprompt({
    prompt:
      "make up a one line prompt, less than 10 words about code suggestions/idea, make the prompt based on human typing, written in first person. dont include [] or 'Im stuck'",
  });

  return (
    <div className="cards">
      <div
        onClick={() => {
          props.clickFunc(prompt1);
        }}
        className="card"
      >
        <p>{prompt1}</p>
        <img src={assets.compass_icon} alt="" />
      </div>
      <div
        onClick={() => {
          props.clickFunc(prompt2);
        }}
        className="card"
      >
        <p>{prompt2}</p>
        <img src={assets.bulb_icon} alt="" />
      </div>
      <div
        onClick={() => {
          props.clickFunc(prompt3);
        }}
        className="card"
      >
        <p>{prompt3}</p>
        <img src={assets.message_icon} alt="" />
      </div>
      <div
        onClick={() => {
          props.clickFunc(prompt4);
        }}
        className="card"
      >
        <p>{prompt4}</p>
        <img src={assets.code_icon} alt="" />
      </div>
    </div>
  );
}

export default Cards;
