import { useState, useEffect } from "react";

const facts = {
  Plastic: "Plastic can be recycled into new products!",
  Paper: "Paper recycling saves trees!",
  Metal: "Metal recycling saves energy!",
};

const trashTypes = [
  { type: "Plastic", emoji: "🥤", color: "bg-red-400" },
  { type: "Paper", emoji: "📄", color: "bg-yellow-400" },
  { type: "Metal", emoji: "🔩", color: "bg-gray-400" },
];

const bins = [
  { label: "Plastic", emoji: "🟩" },
  { label: "Paper", emoji: "🟦" },
  { label: "Metal", emoji: "🟥" },
];

const avatars = ["👦🏻", "🦄", "🐶", "👩🏻", "🐱", "👧🏻", "🤖", "🧑🏻"];

export default function EcoHero() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [milestone, setMilestone] = useState(false);
  const [popup, setPopup] = useState("");
  const [trashList, setTrashList] = useState([]);
  const [collectedTrash, setCollectedTrash] = useState([]);
  const [roundInput, setRoundInput] = useState("");
  const [sortingPhase, setSortingPhase] = useState(false);
  const [charPos, _setCharPos] = useState({
    x: 100,
    y: window.innerHeight - 120,
  });
  const [totalRounds, setTotalRounds] = useState(null);
  const [currentRound, setCurrentRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [targetItems, setTargetItems] = useState(0);
  const [itemsThisRound, setItemsThisRound] = useState(0);
  const [roundScores, setRoundScores] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);

  // ---------------- Spawn trash ----------------
  useEffect(() => {
    if (sortingPhase || totalRounds === null || gameOver) return;
    if (collectedTrash.length >= targetItems && targetItems > 0) return;

    const interval = setInterval(() => {
      const x = Math.random() * (window.innerWidth - 50);
      const type =
        trashTypes[Math.floor(Math.random() * trashTypes.length)];
      setTrashList((prev) => [
        ...prev,
        { id: Date.now() + Math.random(), x, y: 0, ...type, speed: 2 + level },
      ]);
    }, Math.max(600, 2000 - level * 100));

    return () => clearInterval(interval);
  }, [level, sortingPhase, totalRounds, gameOver, collectedTrash.length, targetItems]);

  // ---------------- Move trash + collect ----------------
  useEffect(() => {
    if (sortingPhase || totalRounds === null || gameOver) return;

    const moveInterval = setInterval(() => {
      setTrashList((prev) =>
        prev
          .map((trash) => {
            const newY = trash.y + trash.speed;
            if (
              collectedTrash.length < targetItems &&
              newY + 40 >= charPos.y &&
              trash.x + 40 > charPos.x &&
              trash.x < charPos.x + 60
            ) {
              setCollectedTrash((c) => {
                if (c.find((t) => t.id === trash.id)) return c;
                return [...c, trash];
              });
              return null;
            }
            if (newY > window.innerHeight) return null;
            return { ...trash, y: newY };
          })
          .filter(Boolean)
      );
    }, 30);

    return () => clearInterval(moveInterval);
  }, [charPos, sortingPhase, totalRounds, gameOver, collectedTrash, targetItems]);

  // ---------------- Controls ----------------
  useEffect(() => {
    const handleTouch = (e) => {
      const touchX = e.touches[0].clientX;
      _setCharPos((p) => ({ ...p, x: touchX - 30 }));
    };
    window.addEventListener("touchmove", handleTouch);
    return () => window.removeEventListener("touchmove", handleTouch);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      moveCharacter(
        e.key === "ArrowLeft" || e.key === "a" ? "left" :
        e.key === "ArrowRight" || e.key === "d" ? "right" :
        e.key === "ArrowUp" || e.key === "w" ? "up" :
        e.key === "ArrowDown" || e.key === "s" ? "down" :
        null
      );
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const moveCharacter = (dir) => {
    if (!dir) return;
    _setCharPos((p) => {
      let newX = p.x, newY = p.y;
      if (dir === "left") newX = Math.max(0, p.x - 40);
      if (dir === "right") newX = Math.min(window.innerWidth - 60, p.x + 40);
      if (dir === "up") newY = Math.max(window.innerHeight * 0.6, p.y - 40);
      if (dir === "down") newY = Math.min(window.innerHeight * 0.9, p.y + 40);
      return { x: newX, y: newY };
    });
  };

  // ---------------- Switch to sorting phase ----------------
  useEffect(() => {
    if (collectedTrash.length === targetItems && targetItems > 0 && !sortingPhase) {
      const timeout = setTimeout(() => {
        setSortingPhase(true);
        setTrashList([]);
        setItemsThisRound(collectedTrash.length);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [collectedTrash, targetItems, sortingPhase]);

  // ---------------- Level up + milestones ----------------
  useEffect(() => {
    const newLevel = Math.floor(score / 10) + 1;
    setLevel(newLevel);
    if (score > 0 && score % 20 === 0) {
      setMilestone(true);
      setTimeout(() => setMilestone(false), 2000);
    }
  }, [score]);

  // ---------------- Auto next round / game over ----------------
  useEffect(() => {
    if (sortingPhase && collectedTrash.length === 0 && totalRounds !== null) {
      setTimeout(() => {
        setRoundScores((prev) => [...prev, score]);
        if (currentRound >= totalRounds) {
          setGameOver(true);
        } else {
          setCurrentRound((r) => r + 1);
          setSortingPhase(false);
          setItemsThisRound(0);
          setCollectedTrash([]);
          setTargetItems(Math.floor(Math.random() * 10) + 1);
          setScore(0);
        }
      }, 1000);
    }
  }, [sortingPhase, collectedTrash, currentRound, totalRounds, score]);

  // ------------------ RENDER ------------------
  if (totalRounds === null) {
    return (
      <div className="flex flex-col items-center justify-start h-screen bg-gradient-to-b from-blue-300 to-blue-100 text-center pt-10">
        <h1 className="text-3xl font-bold mb-4">🌱 Eco Hero: Trash Sorter 🌱</h1>
        <p className="text-lg">How many rounds do you want to play?</p>
        <input
          type="number"
          min="1"
          max="10"
          placeholder="Enter rounds"
          value={roundInput}
          onChange={(e) => setRoundInput(e.target.value)}
          className="mt-3 p-2 border-2 border-gray-700 rounded-lg text-lg"
        />
        <p className="mt-2 text-lg">
          You entered: <strong>{roundInput || 0}</strong> rounds
        </p>

        <div className="flex gap-3 mt-4">
          {avatars.map((a, idx) => (
            <button
              key={idx}
              className={`text-3xl px-3 py-1 rounded-lg bg-white border-2 ${
                selectedAvatar === a ? "border-green-500 scale-125" : "border-transparent"
              } transition-transform`}
              onClick={() => setSelectedAvatar(a)}
            >
              {a}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            const value = parseInt(roundInput);
            if (!isNaN(value) && value > 0) {
              setTotalRounds(value);
              setTargetItems(Math.floor(Math.random() * 10) + 1);
            } else {
              alert("Please enter a valid number of rounds!");
            }
          }}
          className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Start Game
        </button>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-red-100">
        <h2 className="text-2xl font-bold mb-3">🎉 Game Over! 🎉</h2>
        <h3 className="text-xl mb-2">🏆 Scoreboard</h3>
        <ul className="mb-3">
          {roundScores.map((s, i) => (
            <li key={i}>Round {i + 1}: {s} marks</li>
          ))}
        </ul>
        <p className="font-bold mb-3">
          Total Score: {roundScores.reduce((a, b) => a + b, 0)}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2 bg-green-500 text-white rounded-lg"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-purple-400 to-pink-200 overflow-hidden font-sans">
      {sortingPhase ? (
        <div className="flex flex-col items-center p-5">
          <h2 className="text-xl mb-3">
            Round {currentRound}/{totalRounds} - Sort the Trash
          </h2>
          <div className="fixed top-3 right-5 bg-black text-white px-3 py-1 rounded-lg">
            Marks: {score}
          </div>
          <div className="flex flex-wrap gap-4 justify-center my-4">
            {collectedTrash.map((item, i) => (
              <div
                key={i}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text", item.type);
                  e.dataTransfer.setData("index", i);
                }}
                className="w-12 h-12 flex items-center justify-center border-2 border-black rounded-lg bg-white shadow-md cursor-grab text-2xl"
              >
                {item.emoji}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-10 mt-4">
            {bins.map((bin) => (
              <div
                key={bin.label}
                className="w-24 h-24 bg-gray-100 border-2 border-dashed border-black rounded-lg flex flex-col items-center justify-center text-xl"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  const type = e.dataTransfer.getData("text");
                  const index = parseInt(e.dataTransfer.getData("index"));
                  if (type === bin.label) {
                    setScore((s) => s + 1);
                    setPopup(facts[type]);
                    setCollectedTrash((items) =>
                      items.filter((_, idx) => idx !== index)
                    );
                  } else {
                    setScore((s) => Math.max(0, s - 1));
                    setPopup("❌ Wrong bin! Marks deducted.");
                  }
                  setTimeout(() => setPopup(""), 2000);
                }}
              >
                {bin.emoji} {bin.label}
              </div>
            ))}
          </div>
          {popup && (
            <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-yellow-100 border border-yellow-300 px-4 py-2 rounded-lg text-yellow-800">
              {popup}
            </div>
          )}
        </div>
      ) : (
        <>
          <h3 className="text-center mt-3 text-lg font-semibold">
            🎯 Target this round: {targetItems} items
          </h3>
          <p className="text-center">
            ✅ Collected: {collectedTrash.length} / {targetItems}
          </p>
          <div
            className="absolute text-4xl transition-all"
            style={{ left: charPos.x, top: charPos.y }}
          >
            {selectedAvatar}
          </div>
          {trashList.map((trash) => (
            <div
              key={trash.id}
              className={`absolute w-10 h-10 rounded-full text-center text-xl shadow-md ${trash.color}`}
              style={{ left: trash.x, top: trash.y }}
            >
              {trash.emoji}
            </div>
          ))}
          {milestone && (
            <div className="absolute top-32 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-300 px-5 py-2 rounded-lg text-green-800">
              🎉 Great Job! 🎉
            </div>
          )}
          <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 rounded-lg font-bold">
            Round {currentRound}/{totalRounds}
          </div>
        </>
      )}
    </div>
  );
}
