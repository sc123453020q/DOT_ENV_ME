import { useEffect, useRef, useState } from "react";

const PASSAGE = `In recent years, cities around the world have been planting urban forests to cool neighborhoods, 
reduce air pollution, and improve residents' mental health. A single mature tree can transpire hundreds of liters 
of water on a hot day, lowering local temperatures through evaporative cooling. Beyond climate benefits, tree canopies 
provide habitats for birds and insects, encourage people to walk more, and even increase local business revenue by making 
streets more pleasant. However, success depends on choosing diverse species, ensuring long-term maintenance, and working 
with communities to plant trees where shade and clean air are needed most.`;

const QUESTIONS = [
  {
    q: "Which is NOT mentioned as a benefit of urban forests?",
    options: [
      "Cooling neighborhoods",
      "Improving mental health",
      "Increasing water pollution",
      "Encouraging people to walk more",
    ],
    correct: 2,
  },
  {
    q: "What physical process helps lower temperatures according to the passage?",
    options: [
      "Photosynthesis",
      "Evaporative cooling via transpiration",
      "Carbon sequestration",
      "Albedo effect from buildings",
    ],
    correct: 1,
  },
  {
    q: "Which factor is important for the long-term success of urban forests?",
    options: [
      "Planting only one fast-growing species",
      "Relying solely on rainfall",
      "Choosing diverse species and ensuring maintenance",
      "Avoiding community input",
    ],
    correct: 2,
  },
];

export default function Ecomind() {
  const [voices, setVoices] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selections, setSelections] = useState(Array(QUESTIONS.length).fill(null));
  const [results, setResults] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [passageVisible, setPassageVisible] = useState(true);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const synth = window.speechSynthesis;
  const utterRef = useRef(null);
  const timerRef = useRef();

  const marks = { correct: 4, wrong: 1, unanswered: 0 };

  useEffect(() => {
    const populate = () => setVoices(synth.getVoices());
    populate();
    synth.onvoiceschanged = populate;
  }, [synth]);

  const speak = () => {
    if (synth.speaking) synth.cancel();
    const utter = new SpeechSynthesisUtterance(PASSAGE);
    utter.voice = voices[0];
    utter.rate = 1;
    utter.pitch = 1;
    utter.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    utterRef.current = utter;
    synth.speak(utter);
    setIsSpeaking(true);
    setIsPaused(false);
  };

  const pauseSpeech = () => {
    if (synth.speaking && !synth.paused) {
      synth.pause();
      setIsPaused(true);
    }
  };

  const resumeSpeech = () => {
    if (synth.paused) {
      synth.resume();
      setIsPaused(false);
    }
  };

  const stopSpeech = () => {
    synth.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const startQuiz = () => {
    setIdx(0);
    setSelections(Array(QUESTIONS.length).fill(null));
    setResults([]);
    setShowResult(false);
    setPassageVisible(false);
    startTimer();
  };

  const startTimer = () => {
    clearInterval(timerRef.current);
    let t = parseInt(document.getElementById("timePerQ").value || 20, 10);
    setTimeLeft(t);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          lockQuestion();
          if (idx < QUESTIONS.length - 1) setIdx((i) => i + 1);
          else finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const selectOption = (i) => {
    const newSel = [...selections];
    newSel[idx] = i;
    setSelections(newSel);
  };

  const lockQuestion = () => {
    clearInterval(timerRef.current);
    const q = QUESTIONS[idx],
      sel = selections[idx];
    const isCorrect = sel === q.correct;
    const chosen = sel !== null;
    const score = chosen ? (isCorrect ? marks.correct : -marks.wrong) : -marks.unanswered;
    const newResults = [...results];
    newResults[idx] = { chosen: sel, isCorrect, score };
    setResults(newResults);
  };

  const nextQ = () => {
    lockQuestion();
    setIdx((i) => i + 1);
    startTimer();
  };

  const submitQ = () => {
    lockQuestion();
    finishQuiz();
  };

  const finishQuiz = () => {
    clearInterval(timerRef.current);
    setShowResult(true);
  };

  const retry = () => {
    clearInterval(timerRef.current);
    setPassageVisible(true);
    setIdx(0);
    setSelections(Array(QUESTIONS.length).fill(null));
    setResults([]);
    setShowResult(false);
  };

  const total = results.reduce((a, b) => a + (b?.score || 0), 0);
  const max = QUESTIONS.length * marks.correct;

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 flex justify-center px-4 py-12">
      <div className="w-full max-w-5xl bg-slate-800/60 rounded-2xl border border-white/10 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4 bg-green-500/20 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-400 grid place-items-center font-bold text-green-950">
              LC
            </div>
            <h1 className="text-lg font-semibold">Listening Comprehension — Quiz Game</h1>
          </div>
          <div className="px-3 py-1 text-xs bg-white/10 rounded-full">
            {showResult ? "Finished" : "Ready"}
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 grid grid-cols-1 md:grid-cols-2 overflow-y-auto">
          {/* Left */}
          <section className="p-6 space-y-6">
            {passageVisible && (
              <div className="bg-slate-800/80 border border-white/10 rounded-2xl p-5 space-y-4">
                <h2 className="text-xl font-bold">Passage</h2>
                <div className="text-slate-300 leading-relaxed">{PASSAGE}</div>
                <div className="flex flex-wrap gap-3">
                  {!isSpeaking && (
                    <button onClick={speak} className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg font-medium">
                      ▶ Listen
                    </button>
                  )}
                  {isSpeaking && !isPaused && (
                    <button onClick={pauseSpeech} className="px-4 py-2 bg-white/10 rounded-lg">⏸ Pause</button>
                  )}
                  {isPaused && (
                    <button onClick={resumeSpeech} className="px-4 py-2 bg-white/10 rounded-lg">▶ Resume</button>
                  )}
                  {isSpeaking && (
                    <button onClick={stopSpeech} className="px-4 py-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg">
                      ⏹ Stop
                    </button>
                  )}
                </div>
              </div>
            )}

            {!showResult && (
              <div className="bg-slate-800/80 border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <div className="px-3 py-1 bg-white/10 rounded-full">
                    Question {idx + 1} / {QUESTIONS.length}
                  </div>
                  <div className="px-3 py-1 bg-white/10 rounded-full">⏱ {timeLeft}s</div>
                </div>
                <h3 className="text-lg font-semibold">{QUESTIONS[idx]?.q || "Press Start"}</h3>
                <div className="grid gap-3">
                  {QUESTIONS[idx]?.options.map((o, i) => (
                    <div
                      key={i}
                      onClick={() => selectOption(i)}
                      className={`p-3 rounded-xl cursor-pointer bg-white/10 hover:bg-white/20 ${
                        selections[idx] === i ? "outline outline-2 outline-green-500" : ""
                      }`}
                    >
                      {o}
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={startQuiz} className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg font-medium">
                    Start Quiz
                  </button>
                  {idx < QUESTIONS.length - 1 && (
                    <button onClick={nextQ} className="px-4 py-2 bg-white/10 rounded-lg">
                      Next ▶
                    </button>
                  )}
                  {idx === QUESTIONS.length - 1 && (
                    <button onClick={submitQ} className="px-4 py-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg text-white">
                      Submit
                    </button>
                  )}
                </div>
              </div>
            )}

            {showResult && (
              <div className="bg-slate-800/80 border border-white/10 rounded-2xl p-6 text-center space-y-4">
                <h2 className="text-xl font-bold">Results</h2>
                <div className="text-4xl font-extrabold text-green-400">
                  {total} / {max}
                </div>
                <button onClick={retry} className="px-5 py-2 bg-white/10 rounded-lg">
                  ↻ Try Again
                </button>
              </div>
            )}
          </section>

          {/* Right */}
          <aside className="p-6">
            <div className="bg-slate-800/80 border border-white/10 rounded-2xl p-5">
              <h3 className="text-lg font-semibold mb-3">Settings</h3>
              <label className="flex items-center gap-2 text-sm">
                Time per Question
                <input id="timePerQ" type="number" defaultValue="20" className="w-16 px-2 py-1 rounded-md bg-slate-700 border border-white/10 text-center" />
              </label>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
}
