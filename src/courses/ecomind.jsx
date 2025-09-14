import React, { useState, useEffect, useRef } from "react";

const ListeningQuiz = () => {
  // ---------------- State ----------------
  const [marks, setMarks] = useState({ correct: 0, wrong: 0, unanswered: 0 });
  const [questions, setQuestions] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 min
  const [difficulty, setDifficulty] = useState("easy");
  const [qCount, setQCount] = useState(5);

  const timerRef = useRef(null);

  // ---------------- Sample Questions ----------------
  const easyQuestions = [
    {
      audio: "/audio/q1.mp3",
      options: ["Cat", "Dog", "Bird", "Fish"],
      answer: "Dog",
    },
    {
      audio: "/audio/q2.mp3",
      options: ["Apple", "Banana", "Orange", "Mango"],
      answer: "Banana",
    },
  ];

  // ---------------- Effects ----------------
  useEffect(() => {
    generateQuiz();
    startTimer();

    return () => clearInterval(timerRef.current);
  }, [difficulty, qCount]);

  // ---------------- Timer ----------------
  const startTimer = () => {
    clearInterval(timerRef.current);
    setTimeLeft(300);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // ---------------- Generate Quiz ----------------
  const generateQuiz = () => {
    setMarks({ correct: 0, wrong: 0, unanswered: qCount });
    setShowAnswers(false);

    let qs = [];
    if (difficulty === "easy") {
      qs = easyQuestions.slice(0, qCount);
    }

    setQuestions(
      qs.map((q, i) => ({
        ...q,
        userAnswer: null,
        id: i,
      }))
    );
  };

  // ---------------- Handle Answer ----------------
  const selectAnswer = (qid, opt) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qid
          ? {
              ...q,
              userAnswer: opt,
            }
          : q
      )
    );

    setMarks((prev) => {
      const correctAnswer = questions.find((q) => q.id === qid)?.answer;
      const isCorrect = correctAnswer === opt;
      return {
        correct: prev.correct + (isCorrect ? 1 : 0),
        wrong: prev.wrong + (isCorrect ? 0 : 1),
        unanswered: Math.max(prev.unanswered - 1, 0),
      };
    });
  };

  // ---------------- Format Time ----------------
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="quiz-container">
      {/* ---------------- Settings ---------------- */}
      <div className="settings">
        <label>
          Difficulty:
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <label>
          Questions:
          <input
            type="number"
            min="1"
            max="20"
            value={qCount}
            onChange={(e) => setQCount(Number(e.target.value))}
          />
        </label>

        <button onClick={generateQuiz}>Start Quiz</button>
      </div>

      {/* ---------------- Status ---------------- */}
      <div className="status">
        <span>
          Correct: {marks.correct} | Wrong: {marks.wrong} | Unanswered:{" "}
          {marks.unanswered}
        </span>
        <span>⏳ {formatTime(timeLeft)}</span>
      </div>

      {/* ---------------- Questions ---------------- */}
      <div className="questions">
        {questions.map((q) => (
          <div key={q.id} className="question">
            <audio controls src={q.audio}></audio>
            <div className="options">
              {q.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => selectAnswer(q.id, opt)}
                  className={
                    showAnswers
                      ? opt === q.answer
                        ? "correct"
                        : q.userAnswer === opt
                        ? "wrong"
                        : ""
                      : q.userAnswer === opt
                      ? "selected"
                      : ""
                  }
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ---------------- Show Answers ---------------- */}
      <button onClick={() => setShowAnswers(true)}>Show Answers</button>

      {/* ---------------- CSS Inline ---------------- */}
      <style>{`
        .quiz-container {
          max-width: 600px;
          margin: auto;
          font-family: Arial, sans-serif;
          padding: 1rem;
        }

        .settings {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .status {
          display: flex;
          justify-content: space-between;
          margin: 1rem 0;
        }

        .question {
          margin-bottom: 1.5rem;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: #fafafa;
        }

        .options {
          margin-top: 0.5rem;
        }

        .options button {
          margin: 0.25rem;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          border: 1px solid #ccc;
          cursor: pointer;
          background: white;
        }

        .options button.selected {
          background-color: #ddd;
        }

        .options button.correct {
          background-color: #4caf50;
          color: white;
        }

        .options button.wrong {
          background-color: #f44336;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default ListeningQuiz;
