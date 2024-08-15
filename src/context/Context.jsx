import { createContext, useState, useEffect, useRef } from "react";
import { marked } from "marked";
import Typed from "typed.js";

import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
        setResultData(prev=>prev+nextWord)
    }, 25*index)
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  }

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let response;
    if (prompt !== undefined) {
        response = await run(prompt);
        setRecentPrompt(prompt);
    }
    else {
        setPrevPrompts(prev=>[...prev,input]);
        setRecentPrompt(input);
        response = await run(input)
    }

    // setRecentPrompt(input);
    // setPrevPrompts(prev=>[...prev, input]);

    //const response = await run(input);
    const markedDownResponse = marked(response, {
      breaks: true,
      smartLists: true,
      pedantic: true,
      sanitizer: true,
      smartypants: false,
    });

    let typedResponse = markedDownResponse.split(" ");

    for(let i=0; i<typedResponse.length; i++) {
        const nextWord = typedResponse[i];
        delayPara(i, nextWord+" ");
    }

    //setResultData(markedDownContent);

    setLoading(false);
    setInput("");
  };

  //onSent("what is react js");

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
