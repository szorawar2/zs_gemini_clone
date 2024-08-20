import React, { useEffect, useContext, useRef } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import Mainbottom from "./Mainbottom";
import Navbar from "./Navbar";
import Greet from "./Greet";

const Main = () => {
  const { recentPrompt, showResult, loading, resultData, history, updateHistory } =
    useContext(Context);

  const endOfMessagesRef = useRef(null);

  const historyUpdate = (p, r) => {
    updateHistory((prev) => [...prev, { prompt: p, response: r }]);
  };

  useEffect(() => {
    if (recentPrompt && resultData && !loading) {
      historyUpdate(recentPrompt, resultData);
    }
  }, [recentPrompt, loading]);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, loading]);

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

  return (
    <div className="main">
      <div className="main-container">
        <Navbar />
        <div className="main-top">
          {!showResult ? <Greet /> : <div className="result">{Resultscreen()}</div>}
        </div>
        <Mainbottom />
      </div>
    </div>
  );
};

function Resultdata(props) {
  
  return (
    <div className="result-data">
      <img src={assets.gemini_icon} alt="" />
      {props.loadStatus ? <Loader /> : <p dangerouslySetInnerHTML={{ __html: props.result }}></p>}
    </div>
  );
}

function Resulttitle(props) {
  return (
    <div className="result-title">
      <img src={assets.user_icon} alt="" />
      <p>{props.prompt}</p>
    </div>
  );
}

function Loader() {
  return (
    <div className="loader">
      <hr />
      <hr />
      <hr />
    </div>
  );
}

export default Main;
