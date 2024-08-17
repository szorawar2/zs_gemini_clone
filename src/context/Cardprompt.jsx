import React, { useState, useEffect } from "react";
import run from "../config/gemini";

function Cardprompt(props) {
  const [resultData, setResultData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const input = props.prompt;

      try {
        const response = await run(input);

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
