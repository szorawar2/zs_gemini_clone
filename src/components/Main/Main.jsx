import React, { useEffect, useContext, useRef } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import Mainbottom from "./Mainbottom";
import Navbar from "./Navbar";
import Greet from "./Greet";

const Main = () => {

  /* Imports context. For more details, view Context.jsx */
  const {
    recentPrompt,
    showResult,
    loading,
    resultData,
    history,
    updateHistory,
    updateMaster,
    totalChats,
    setTotalChats,
    chatNumber,
    setChatNumber,
  } = useContext(Context);

  /* Scrolls resultant text into view */
  const endOfMessagesRef = useRef(null);
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, loading]);

  /* Updates current chat history according to state */
  useEffect(() => {
    if (history.length && (recentPrompt !== "")) {
      updateMaster((prevMaster) => {
        const updatedMaster = [...prevMaster];

        if (updatedMaster[chatNumber]){
          updatedMaster[chatNumber] = history;
          return updatedMaster;
        }
        else {
          return [...prevMaster, history];
        }
      });
    }
  }, [history]);

  /* Updates chat number according to state */
  useEffect(() => {
    if (showResult && (recentPrompt !== "")) {
      setTotalChats((prev) => {
        return prev + 1;
      });
      setChatNumber(totalChats);
    }
  }, [showResult]);

  /* Updates the current chat history as the chat progresses */
  useEffect(() => {
    if (recentPrompt && !loading) {
      updateHistory((prev) => [
        ...prev,
        { prompt: recentPrompt, response: resultData },
      ]);
    }
  }, [recentPrompt, loading]);

  /* Displays result screen and chat data */
  const Resultscreen = () => {
    return (
      <div>
        {history.map((hist, index) => (
          <div key={index}>
            <Resulttitle prompt={hist.prompt} />
            <Resultdata loadStatus={null} result={hist.response} />
          </div>
        ))}
        {loading && (
          <div ref={endOfMessagesRef}>
            <Resulttitle prompt={recentPrompt} />
            <Resultdata loadStatus={loading} result={resultData} />
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>
    );
  };

  /* Response data */
  function Resultdata(props) {
    return (
      <div className="result-data">
        <img src={assets.gemini_icon} alt="" />
        {props.loadStatus ? (
          <Loader />
        ) : (
          <p dangerouslySetInnerHTML={{ __html: props.result }}></p>
        )}
      </div>
    );
  }
  
  /* Prompt data */
  function Resulttitle(props) {
    return (
      <div className="result-title">
        <img src={assets.user_icon} alt="" />
        <p>{props.prompt}</p>
      </div>
    );
  }
  
  /* Loading animation*/
  function Loader() {
    return (
      <div className="loader">
        <hr />
        <hr />
        <hr />
      </div>
    );
  }

  /* Render main */
  return (
    <div className="main">
      <div className="main-container">
        <Navbar />
        <div className="main-top">
          {!showResult ? (
            <Greet />
          ) : (
            <div className="result">{Resultscreen()}</div>
          )}
        </div>
        <Mainbottom />
      </div>
    </div>
  );
};

export default Main;
