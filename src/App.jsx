// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Login from "./components/Login";
import Register from "./pages/register";
import ForgotPassword from "./pages/ForgotPassword";
import Demo from "./pages/Demo";
import Games from "./pages/Games";
import LeaderBoard from "./pages/LeaderBoard";
import DiscussForum from "./pages/DiscussForum";
import Quiz from "./pages/Quiz";
import Contact from "./pages/contact";

// ✅ Import games
import EcoQuest from "./games/Ecoquest";
import EcoHero from "./games/EcoHero";

// ✅ Import courses
import Course from "./pages/Course";
import EcoMind from "./courses/ecomind"; // ✅ new import

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-20">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Routes */}
          <Route
            path="/games"
            element={
              <ProtectedRoute>
                <Games />
              </ProtectedRoute>
            }
          />

          {/* ✅ Individual Game Routes */}
          <Route
            path="/games/ecoquest"
            element={
              <ProtectedRoute>
                <EcoQuest />
              </ProtectedRoute>
            }
          />

          <Route
            path="/games/ecohero"
            element={
              <ProtectedRoute>
                <EcoHero />
              </ProtectedRoute>
            }
          />

          {/* ✅ Courses Page */}
          <Route
            path="/course"
            element={
              <ProtectedRoute>
                <Course />
              </ProtectedRoute>
            }
          />

          {/* ✅ Individual Course Routes */}
          <Route
            path="/course/ecomind"
            element={
              <ProtectedRoute>
                <EcoMind />
              </ProtectedRoute>
            }
          />

          {/* Other Routes */}
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <LeaderBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/discuss-forum"
            element={
              <ProtectedRoute>
                <DiscussForum />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz"
            element={
              <ProtectedRoute>
                <Quiz />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
