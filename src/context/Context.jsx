import { createContext, useState, useEffect, useRef } from "react";
import { marked } from "marked";

import gemini from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [history, updateHistory] = useState([]);
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // const delayPara = (index, nextWord) => {
  //   setTimeout(function () {
  //     setResultData((prev) => prev + nextWord);
  //   }, 25 * index);
  // };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const markDownResponse = (response) => {
    return marked(response, {
      breaks: true,
      smartLists: true,
      pedantic: true,
      sanitizer: true,
      smartypants: false,
    });
  };

  const onSent = async (prompt, cardPrompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let response;
    let markedResponse;

    if (prompt !== undefined && cardPrompt === undefined) {
      response = await gemini.run(prompt);
      markedResponse = markDownResponse(response);

      setRecentPrompt(prompt);

    } else if (prompt === undefined && cardPrompt === undefined) {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);

      response = await gemini.run(input);
      markedResponse = markDownResponse(response);

    } else if (prompt === undefined && cardPrompt !== undefined) {
      setPrevPrompts((prev) => [...prev, cardPrompt]);
      setRecentPrompt(cardPrompt);

      response = await gemini.run(cardPrompt);
      markedResponse = markDownResponse(response);

    }

    // let typedResponse = markedResponse.split(" ");

    // for (let i = 0; i < typedResponse.length; i++) {
    //   const nextWord = typedResponse[i];
    //   delayPara(i, nextWord + " ");
    // }

    setResultData(markedResponse);

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    history,
    updateHistory,
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
