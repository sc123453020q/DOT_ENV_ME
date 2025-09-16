// src/pages/Leaderboard.jsx
import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

export default function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "users/");

    onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        // Convert object -> array
        const userArray = Object.keys(data).map((id) => ({
          id,
          name: data[id].email, // use email as name
          score: data[id].totalScore || 0, // use totalScore
          ecoQuestScore: data[id].ecoQuestScore || 0,
        }));

        // Sort by score (descending)
        userArray.sort((a, b) => b.score - a.score);

        setScores(userArray);
      } else {
        setScores([]);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">🏆 Leaderboard</h1>

      {scores.length === 0 ? (
        <p className="text-gray-500">No scores yet. Play to get started!</p>
      ) : (
        <table className="bg-white shadow-lg rounded-lg w-3/4 md:w-1/2">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="p-3 text-left">Rank</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Total Score</th>
              <th className="p-3 text-left">EcoQuest Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((user, index) => (
              <tr
                key={user.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-3 font-semibold">#{index + 1}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.score}</td>
                <td className="p-3">{user.ecoQuestScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
