// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Login from "./components/Login";
import Flametest from "./pages/flametest"; // ✅ Virtual Lab page

// ✅ This already initializes Firebase through firebase.js
import { auth } from "./firebase";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-20"> {/* ✅ Prevents content hiding behind fixed navbar */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/virtual-lab" element={<Flametest />} /> {/* ✅ New Virtual Lab route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
