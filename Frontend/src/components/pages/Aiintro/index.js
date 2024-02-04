import React from "react";
import { useNavigate } from "react-router-dom";
import therapist from "../../../assets/images/therapist.png";
import chat from "../../../assets/images/chat.svg";
import "../../../styles/Aiintro.css";

const Aiintro = () => {
  const navigate = useNavigate();

  return (
    <div className="aiIntro__container">
      <div>
        <img src={therapist} alt="therapist" className="aiIntro__image" />
      </div>
      <div className="aiIntro__content">
        <h2 className="aiIntro__title-1">Hello!</h2>
        <h2 className="aiIntro__title-2">I am Therachat</h2>
        <img className="aiIntro__chatIcon" src={chat} alt="chat" />
        <h2 className="aiIntro__subtitle">How can I help you?</h2>
        <button
          className="aiIntro__button"
          onClick={() => {
            navigate("ai-chat");
          }}
        >
          I want to know you
        </button>
        <p className="aiIntro__poweredBy">Powered by AI Assistant</p>
      </div>
    </div>
  );
};

export default Aiintro;
