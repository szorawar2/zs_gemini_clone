import { createContext, useState, useEffect, useRef } from "react";
import { marked } from "marked";
import gemini from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  /* Chat data structure:
  - chatMaster  : includes all user's chat histories
      structure : [chat1History, chat2History ...]

  - history     : includes current chat history  
      structure : {prompt: "user input", result: "gemini result"}

  - chatNumber  : current chat number according to state 
  - totalChats  : total number of chats 
  */
  const [totalChats, setTotalChats] = useState(0);
  const [chatNumber, setChatNumber] = useState(0);
  const [history, updateHistory] = useState([]);
  const [chatMaster, updateMaster] = useState([]);
  //

  /* Data variables used to update chat histories*/
  const [input, setInput] = useState("");
  const [resultData, setResultData] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");

  /* State rendering variables*/
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [extended, setExtended] = useState(false);

  /* Typing text animation */
  // const delayPara = (index, nextWord) => {
  //   setTimeout(function () {
  //     setResultData((prev) => prev + nextWord);
  //   }, 25 * index);
  // };

  /* Updates history for the gemini model according to state*/
  useEffect(() => {
    gemini.geminiHistoryUpdate(history);
  }, [history]);

  /* Updates state to new chat */
  const newChatScreen = () => {
    setLoading(false);
    setShowResult(false);
    setRecentPrompt("");
    updateHistory([]);
  };

  /* Cleans raw response from the gemini model */
  const markDownResponse = (response) => {
    return marked(response, {
      breaks: true,
      smartLists: true,
      pedantic: true,
      sanitizer: true,
      smartypants: false,
    });
  };

  const onSent = async (cardPrompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let response;
    let markedResponse;

    //if input is card prompt
    if (cardPrompt) {
      setRecentPrompt(cardPrompt);
      response = await gemini.run(cardPrompt);
    }
    // if input is typed in
    else {
      setRecentPrompt(input);
      response = await gemini.run(input);
    }

    markedResponse = markDownResponse(response);

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
    extended,
    setExtended,
    onSent,
    setRecentPrompt,
    recentPrompt,
    setShowResult,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChatScreen,

    //Chat structure
    history,
    updateHistory,
    chatMaster,
    updateMaster,
    chatNumber,
    setChatNumber,
    totalChats,
    setTotalChats,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
