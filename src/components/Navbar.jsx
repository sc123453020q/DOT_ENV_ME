// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo1.png";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 🔹 Listen to login/logout state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-18 w-auto" />
          </Link>
        </div>

        {/* Menu */}
        <nav className="hidden md:flex space-x-8 font-medium text-gray-700">
          <Link to="/games" className="hover:text-green-600 transition-colors">
            Games
          </Link>
          <Link to="/leaderboard" className="hover:text-green-600 transition-colors">
            LeaderBoard
          </Link>
          <Link to="/course" className="hover:text-green-600 transition-colors">
            Courses
          </Link>
          <Link to="/discuss-forum" className="hover:text-green-600 transition-colors">
            Discuss Forum
          </Link>
          <Link to="/demo" className="hover:text-green-600 transition-colors">
            Demo
          </Link>
        </nav>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {/* Show profile (email or photo) */}
              <div className="flex items-center space-x-2">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="h-8 w-8 rounded-full border"
                  />
                ) : (
                  <span className="text-gray-700 text-sm">{user.email}</span>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-semibold border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold border border-green-500 text-green-500 rounded-md hover:bg-blue-50 transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-semibold bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
