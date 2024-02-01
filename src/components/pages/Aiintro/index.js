import React from 'react'
import { useNavigate } from 'react-router-dom'
import therapist from "../../../assets/images/therapist.png";
import chat from "../../../assets/images/chat.svg";


const Aiintro = () => {
    const navigate = useNavigate()
  return (
    <div style={{ backgroundColor: "green", display:"flex", flexDirection:"row" }}>
      <div>
        <img src={therapist} alt="therapist" />
      </div>
      <div>
        <h2>Hello!</h2>
        <h2>I am Therachat</h2>
        <img src={chat} alt="chat" />
        <h2>How can I help you?</h2>
        <button
          onClick={() => {
            navigate("ai-chat");
          }}
        >
          I want to know you
        </button>
        <p>Powered by AI Assistant</p>
      </div>
    </div>
  );
}

export default Aiintro