// src/pages/Games.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; 
import EcoQuestImg from "../assets/EcoQuest.jpg";
import EcoHeroImg from "../assets/EcoHero.jpg";

export default function Games() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center 
        bg-gradient-to-tr from-green-900 via-lime-600 to-green-400 text-white overflow-hidden">
        
        {/* Floating "Games" Title */}
        <motion.h1
          animate={{ y: [0, -80, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="text-9xl md:text-[12rem] font-extrabold drop-shadow-lg tracking-widest"
          style={{
            fontFamily: "'Press Start 2P', cursive", // Gaming font
          }}
        >
          Games
        </motion.h1>

        {/* Scroll Down Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-12 flex flex-col items-center"
        >
          <span className="text-lg font-semibold">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center items-start mt-2">
            <motion.div
              className="w-2 h-2 bg-white rounded-full mt-2"
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Games Thumbnails */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">Available Games</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
          
          {/* EcoQuest game card (clickable) */}
          <Link
            to="/games/ecoquest"
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all"
          >
            <img
              src={EcoQuestImg}
              alt="EcoQuest"
              className="w-full h-60 object-contain mx-auto"
            />
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold text-gray-800">EcoQuest</h3>
            </div>
          </Link>

          {/* EcoHero game card (clickable) */}
          <Link
            to="/games/ecohero"
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all"
          >
            <img
              src={EcoHeroImg}
              alt="EcoHero"
              className="w-full h-60 object-contain mx-auto"
            />
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold text-gray-800">EcoHero</h3>
            </div>
          </Link>

          {/* Puzzle game card (clickable → Coming Soon) */}
          <Link
            to="/games/puzzle"
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all"
          >
            <img 
              src="https://via.placeholder.com/300x200?text=Puzzle" 
              alt="Puzzle" 
              className="w-full h-48 object-cover" 
            />
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold text-gray-800">Puzzle</h3>
              <p className="text-gray-500 mt-2 italic">Coming Soon</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
