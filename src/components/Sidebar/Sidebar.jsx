import React, { useContext, useState, useEffect } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets.js";
import { Context } from "../../context/Context.jsx";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  /* Checks the diplay width to show sidebar accordingly */
  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const handleChange = (event) => setMatches(event.matches);

    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
};

const Sidebar = () => {

  /* Query to check display size */
  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  /* Imports context. For more details, view Context.jsx */
  const {
    extended,
    setExtended,
    setRecentPrompt,
    history,
    updateHistory,
    newChatScreen,
    chatMaster,
    setShowResult,
    setChatNumber,
  } = useContext(Context);

  /* Loads specified chat history to display */
  const loadChat = (id) => {
    setRecentPrompt("");
    setChatNumber(id);
    updateHistory(chatMaster[id]);
    setShowResult(true);
  };

  return (

    /* decides class-name used to display. open for detailed content display */ 
    <div className={`sidebar ${extended ? "open" : ""}`}>

      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />
        <div
          onClick={() => {
            setExtended((prev) => (prev ? prev : !prev));
            newChatScreen();
          }}
          className="new-chat"
        >
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>

        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {chatMaster[0]
              ? chatMaster.map((item, index) => {
                  return (
                    <div
                      onClick={() => loadChat(index)}
                      className="recent-entry"
                      id={index}
                      key={index}
                    >
                      <img src={assets.message_icon} alt="" />
                      <p>
                        {item[0].prompt.slice(0, isSmallScreen ? 24 : 18)}...
                      </p>
                    </div>
                  );
                })
              : null}
          </div>
        ) : null}
      </div>
      
      {/* Non functional buttons as of PR:chat_update */}
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
