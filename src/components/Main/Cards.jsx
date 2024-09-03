import React, { useState, useEffect, useContext } from "react";
import { assets } from "../../assets/assets";
import gemini from "../../config/gemini";


/*props include: 
1) clickFunc -> clickCard (parent)
  Holds onSent function from Context
 */
function Cards(props) {

  /* prompts template for cards */
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


/* Function that runs each prompt to display on the card */
function Cardprompt(props) {
  const [resultData, setResultData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const input = props.prompt;

      try {
        const response = await gemini.runCard(input);

        setResultData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return resultData;
}
