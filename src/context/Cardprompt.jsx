import React, { useState, useEffect, useContext } from "react";
import gemini from "../config/gemini";

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

export default Cardprompt;
