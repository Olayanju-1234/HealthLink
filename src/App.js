import React from 'react'
import "./App.css"
import { Route, Routes } from "react-router-dom";
import Aichat from "./components/pages/Aichat"
import Aiintro from './components/pages/Aiintro';
import TherapistList from './components/pages/Therapistlist';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="ai-intro" element={<Aiintro />} />
        <Route path="ai-intro/ai-chat" element={<Aichat />} />
        <Route path="therapist-list" element={<TherapistList />} />
      </Routes>
    </div>
  );
}

export default App