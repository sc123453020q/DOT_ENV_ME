import React, { useState, useEffect } from "react";

export default function EcoQuest() {
  // --------------------
  // GAME DATA
  // --------------------
  const QUESTIONS = [
    {
      text: "Which gas do trees absorb during photosynthesis?",
      choices: ["Oxygen", "Carbon Dioxide", "Methane", "Nitrogen"],
      answer: 1,
      cat: "tree",
      emoji: "🌳",
    },
    {
      text: "Which of the following is the best example of a recyclable item?",
      choices: ["Banana peel", "Plastic bottle", "Styrofoam cup", "Tissue"],
      answer: 1,
      cat: "recycle",
      emoji: "♻",
    },
    {
      text: "Which is a renewable source of energy?",
      choices: ["Coal", "Wind", "Diesel", "Natural Gas"],
      answer: 1,
      cat: "wind",
      emoji: "💨",
    },
    {
      text: "Oceans help regulate Earth's climate by…",
      choices: [
        "Producing plastic",
        "Absorbing heat and CO₂",
        "Blocking sunlight",
        "Stopping winds",
      ],
      answer: 1,
      cat: "ocean",
      emoji: "🌊",
    },
    {
      text: "The 3 R's of waste management stand for…",
      choices: [
        "Reduce, Reuse, Recycle",
        "Remove, Rebuild, Reclaim",
        "Return, Recycle, Repair",
        "Refuse, Reduce, React",
      ],
      answer: 0,
      cat: "recycle",
      emoji: "♻",
    },
  ];

  // --------------------
  // GAME STATE
  // --------------------
  const [screen, setScreen] = useState("home"); // "home" | "quiz" | "result"
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [skipped, setSkipped] = useState(0);

  const [penalty, setPenalty] = useState(0.25);
  const [timeLeft, setTimeLeft] = useState(180); // seconds
  const [timerRunning, setTimerRunning] = useState(false);

  // --------------------
  // TIMER EFFECT
  // --------------------
  useEffect(() => {
    let interval;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft <= 0) {
      finishQuiz();
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // --------------------
  // GAME FLOW
  // --------------------
  const startGame = () => {
    setIdx(0);
    setScore(0);
    setCorrect(0);
    setWrong(0);
    setSkipped(0);
    setTimeLeft(180);
    setTimerRunning(true);
    setScreen("quiz");
  };

  const handleAnswer = (choice) => {
    const q = QUESTIONS[idx];
    if (choice === q.answer) {
      setScore((s) => s + 1);
      setCorrect((c) => c + 1);
    } else {
      setScore((s) => +(s - penalty).toFixed(2));
      setWrong((w) => w + 1);
    }
    if (idx < QUESTIONS.length - 1) {
      setIdx((i) => i + 1);
    } else {
      finishQuiz();
    }
  };

  const skipQuestion = () => {
    setSkipped((s) => s + 1);
    if (idx < QUESTIONS.length - 1) {
      setIdx((i) => i + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setTimerRunning(false);
    setScreen("result");
  };

  // --------------------
  // UI
  // --------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-700 to-green-400 text-white flex items-center justify-center">
      <div className="w-full max-w-4xl p-6 rounded-2xl bg-white/30 backdrop-blur-md shadow-lg">
        <header className="flex justify-between items-center border-b border-white/20 pb-3">
          <h1 className="text-2xl font-bold">🌍 EcoQuest</h1>
          <span className="px-3 py-1 bg-black/30 rounded-full text-sm">
            {screen === "quiz" ? `Time: ${formatTime(timeLeft)}` : "v1.0"}
          </span>
        </header>

        {/* HOME SCREEN */}
        {screen === "home" && (
          <div className="text-center space-y-4 py-8">
            <h2 className="text-3xl font-extrabold">Learn • Play • Protect</h2>
            <p className="opacity-80">
              Master sustainability through quick quizzes.
            </p>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl font-bold shadow-lg"
            >
              ▶ Play
            </button>
          </div>
        )}

        {/* QUIZ SCREEN */}
        {screen === "quiz" && (
          <div className="py-6 space-y-6">
            <div className="flex justify-between bg-black/20 p-3 rounded-lg">
              <span>
                Question {idx + 1}/{QUESTIONS.length}
              </span>
              <span>Score: {score}</span>
            </div>

            <div className="text-center">
              <div className="text-4xl">{QUESTIONS[idx].emoji}</div>
              <h3 className="text-xl font-bold mt-2">{QUESTIONS[idx].text}</h3>
            </div>

            <div className="grid gap-3">
              {QUESTIONS[idx].choices.map((c, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="px-4 py-3 bg-white/20 hover:bg-white/40 rounded-lg font-semibold text-black"
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={skipQuestion}
                className="px-4 py-2 border border-white/30 rounded-lg"
              >
                Skip
              </button>
              <button
                onClick={finishQuiz}
                className="px-4 py-2 bg-red-500 rounded-lg"
              >
                Quit
              </button>
            </div>
          </div>
        )}

        {/* RESULT SCREEN */}
        {screen === "result" && (
          <div className="text-center py-8 space-y-6">
            <h2 className="text-2xl font-extrabold">
              Your EcoQuest Results 🌱
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-left">
              <div className="bg-white/20 p-3 rounded-lg text-black">Score: {score}</div>
              <div className="bg-white/20 p-3 rounded-lg text-black">Correct: {correct}</div>
              <div className="bg-white/20 p-3 rounded-lg text-black">Wrong: {wrong}</div>
              <div className="bg-white/20 p-3 rounded-lg text-black">Skipped: {skipped}</div>
              <div className="bg-white/20 p-3 rounded-lg text-black">
                Accuracy: {Math.round((correct / QUESTIONS.length) * 100)}%
              </div>
              <div className="bg-white/20 p-3 rounded-lg text-black">
                Time Taken: {formatTime(180 - timeLeft)}
              </div>
            </div>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl font-bold shadow-lg"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}