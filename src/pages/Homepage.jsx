// src/pages/Homepage.jsx
import React from "react";
import { Link } from "react-router-dom";
import logo2 from "../assets/logo2.png";

export default function Homepage() {
  return (
    <main className="pt-0.5">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center">
          {/* Left */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Learn Exciting Concepts in a Gamified Manner
            </h1>
            <p className="mt-4 text-lg text-gray-600">Learn, play, and grow!</p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link to="/games">
                <button className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700">
                  Explore Games
                </button>
              </Link>
              <Link to="/leaderboard">
                <button className="px-6 py-3 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600">
                  View Leaderboard
                </button>
              </Link>
              <button className="px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-blue-50">
                Download App
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="flex-1 mt-8 md:mt-0">
            <img
              src="/hero-image.png"
              alt="Hero"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
      Our Popular Games
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { name: "EcoQuest", img: "/ecoquest.png", desc: "An engaging quest game that teaches eco-friendly habits." },
        { name: "EcoHero", img: "/ecohero.png", desc: "Become an EcoHero by sorting and recycling correctly." },
        { name: "Puzzle", img: "/puzzle.png", desc: "Challenge your mind with eco-themed puzzles." },
      ].map((game, index) => (
        <div
          key={index}
          className="bg-white border rounded-lg shadow hover:shadow-lg transition p-6"
        >
          <img
            src={game.img}
            alt={game.name}
            className="rounded-md mb-4"
          />
          <h3 className="font-semibold text-lg text-gray-800">{game.name}</h3>
          <p className="text-gray-600 mt-2">{game.desc}</p>
          <button className="mt-4 text-green-600 hover:underline">
            ⓘ Learn More
          </button>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Stats Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { number: "5+", label: "Students" },
            { number: "1", label: "Educators" },
            { number: "3", label: "Courses" },
          ].map((stat, i) => (
            <div key={i}>
              <h3 className="text-4xl font-bold text-green-600">{stat.number}</h3>
              <p className="text-gray-700 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Students Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((t) => (
              <div
                key={t}
                className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                <p className="text-gray-700">
                  “XYZ has changed my learning journey completely. Highly
                  recommended!”
                </p>
                <div className="mt-4 flex items-center space-x-3">
                  <img
                    src={`/student-${t}.png`}
                    alt="Student"
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-semibold text-gray-900">
                    Student {t}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <img src={logo2} alt="Logo" className="h-15 mb-4" />
            <p>Affordable & quality education for all.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/course" className="hover:underline">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:underline">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-white">Follow Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  YouTube
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3 text-white">Get Our App</h3>
            <img src="/playstore.png" alt="Play Store" className="h-10" />
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          © 2025 . All rights reserved.
        </div>
      </footer>
    </main>
  );
}
