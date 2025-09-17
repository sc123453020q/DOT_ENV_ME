// src/pages/DailyMission.jsx
import React, { useState } from "react";

export default function DailyMission() {
  const missions = [
    { id: 1, label: "Login", points: 2 },
    { id: 2, label: "Complete 1 course", points: 5 },
    { id: 3, label: "Play 1 game", points: 5 },
    { id: 4, label: "Share a photo/video of planting a tree", points: 10 },
    { id: 5, label: "Share the website link", points: 2 },
  ];

  const [completed, setCompleted] = useState([]);

  // ✅ Toggle mission completion
  const toggleMission = (id) => {
    setCompleted((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  // ✅ Calculate Eco Points
  const totalPoints = completed.reduce((sum, id) => {
    const mission = missions.find((m) => m.id === id);
    return sum + (mission ? mission.points : 0);
  }, 0);

  const maxPoints = missions.reduce((sum, m) => sum + m.points, 0);
  const progressPercent = (totalPoints / maxPoints) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        {/* Title */}
        <h2 className="text-xl font-bold text-center text-gray-800 flex items-center justify-center gap-2 mb-4">
          🌱 Daily Missions
        </h2>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Total Eco Points: {totalPoints}</span>
            <span>{maxPoints}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Mission List */}
        <ul className="space-y-3">
          {missions.map((mission) => (
            <li
              key={mission.id}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-green-50 transition"
            >
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={completed.includes(mission.id)}
                  onChange={() => toggleMission(mission.id)}
                  className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-gray-700">{mission.label}</span>
              </label>
              <span className="text-green-600 font-semibold text-sm">
                +{mission.points} Eco Points
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
