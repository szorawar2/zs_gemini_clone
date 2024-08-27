import React, { useContext, useState, useEffect } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets.js";
import { Context } from "../../context/Context.jsx";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const handleChange = (event) => setMatches(event.matches);

    mediaQueryList.addEventListener('change', handleChange);
    return () => mediaQueryList.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
};

const Sidebar = () => {

  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  
  const { extended, setExtended, onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    console.log("test");
    await onSent(prompt);
  };

  return (
    <div className={`sidebar ${extended ? 'open' : ''}`}>
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />
        <div onClick={newChat} className="new-chat">
          <img
            onClick={() => setExtended((prev) => (prev ? prev : !prev))}
            src={assets.plus_icon}
            alt=""
          />
          {extended? <p>New Chat</p> : null}
        </div>

        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div onClick={() => loadPrompt(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0, (isSmallScreen? 24 : 18))}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
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
