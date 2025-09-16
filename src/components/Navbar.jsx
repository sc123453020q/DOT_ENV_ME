// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo1.png";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [showMore, setShowMore] = useState(false); // 🔹 for dropdown toggle
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

  // 🔹 Main menu (without "More")
  const mainMenu = [
    { path: "/games", label: "Games" },
    { path: "/leaderboard", label: "LeaderBoard" },
    { path: "/course", label: "Courses" },
    { path: "/discuss-forum", label: "Discuss Forum" },
  ];

  // 🔹 Dropdown menu under "More"
  const moreMenu = [
    { path: "/demo", label: "Demo" },
    { path: "/researchref", label: "ResearchRef" },
  ];

  // 🔹 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#more-menu")) {
        setShowMore(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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
        <nav className="hidden md:flex space-x-8 font-medium text-gray-700 relative">
          {mainMenu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="hover:text-green-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}

          {/* 🔹 More dropdown */}
          <div id="more-menu" className="relative">
            <button
              onClick={() => setShowMore((prev) => !prev)}
              className="hover:text-green-600 transition-colors flex items-center gap-1"
            >
              More ▾
            </button>
            {showMore && (
              <div className="absolute top-full left-0 mt-2 w-44 bg-white shadow-lg rounded-md border py-2 z-50">
                {moreMenu.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setShowMore(false)} // close after click
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
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
