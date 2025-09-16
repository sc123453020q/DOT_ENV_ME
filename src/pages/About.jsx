// src/pages/About.jsx
import React from "react";
import { FaLinkedin } from "react-icons/fa";

// ✅ Import team member images
import member1 from "../assets/member1.jpg";
import member2 from "../assets/member2.jpg";
import member3 from "../assets/member3.jpg";
import member4 from "../assets/member4.jpg";
import member5 from "../assets/member5.jpg";
import member6 from "../assets/member6.jpg";

export default function About() {
  const team = [
    {
      id: 1,
      name: "Chandrakanta Rana",
      role: "Team Leader/Project Manager",
      image: member1,
      linkedin: "https://www.linkedin.com/in/chandrakanta-rana-15a06832a/",
    },
    {
      id: 2,
      name: "Ipsita Mahato",
      role: "Games Developer",
      image: member2,
      linkedin: "https://www.linkedin.com/in/ipsita-mahato-1b4984328/",
    },
    {
      id: 3,
      name: "Oindrila Banerjee",
      role: "UI/UX Designer",
      image: member3,
      linkedin: "https://www.linkedin.com/in/oindrilab/",
    },
    {
      id: 4,
      name: "Anurabha Manna",
      role: "Front-end Developer",
      image: member4,
      linkedin: "https://www.linkedin.com/in/arunabha-manna-022bb7318/",
    },
    {
      id: 5,
      name: "Laxmikant Thakur",
      role: "Content Creator",
      image: member5,
      linkedin: "https://www.linkedin.com/in/laxmikant-thakur-693a28321/",
    },
    {
      id: 6,
      name: "Saraswata Chatterjee",
      role: "Back-end Developer",
      image: member6,
      linkedin: "https://www.linkedin.com/in/saraswata-chatterjee-b560972b3/",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-100 to-cyan-200 py-16 px-6">
      {/* Stylish Heading */}
      <h1 className="text-5xl font-extrabold text-center mb-12 tracking-wide">
        <span className="bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent drop-shadow-lg">
          Meet Our Team
        </span>
      </h1>

      {/* Team Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {team.map((member) => (
          <div
            key={member.id}
            className="bg-white bg-opacity-80 backdrop-blur-md rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 text-center transform hover:scale-105"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-cyan-500 shadow-lg"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              {member.name}
            </h2>
            <p className="text-gray-600">{member.role}</p>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 transition-colors"
            >
              <FaLinkedin className="text-2xl" /> LinkedIn
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
