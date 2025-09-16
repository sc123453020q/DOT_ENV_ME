import { useState } from "react";

const topics = [
  { category: "transport", items: ["car", "bus", "bike", "walk", "train"] },
  { category: "diet", items: ["meat", "vegetables", "plant-based meals", "fast food", "dairy"] },
  { category: "energy", items: ["AC", "fan", "LED bulbs", "solar panels"] },
  { category: "waste", items: ["recycle", "reuse", "compost", "throw away"] },
  { category: "fashion", items: ["new clothes", "thrift", "fast fashion"] },
  { category: "technology", items: ["streaming HD", "downloading content", "charging devices"] },
];

const names = [
  "Alex", "Samantha", "Jordan", "Priya", "Ravi", "Liam", "Mia",
  "Noah", "Emma", "Oliver", "Ava", "Ethan", "Sophia", "Arjun",
  "Zara", "Lucas", "Isabella", "Leo", "Chloe", "Nathan"
];

function getRandomName() {
  const firstName = names[Math.floor(Math.random() * names.length)];
  const initial = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return `${firstName} ${initial}.`;
}

// Generate AI-style lesson content
function generateLesson(topic) {
  const item = topic.items[Math.floor(Math.random() * topic.items.length)];
  const facts = [
    `Using ${item} regularly contributes to CO₂ emissions and affects the environment.`,
    `Switching from ${item} to more sustainable options can reduce emissions significantly.`,
    `Studies show that reducing ${item} usage helps improve air quality.`,
    `Choosing alternatives to ${item} helps conserve resources and energy.`,
    `Planning trips or usage carefully can lower your personal carbon footprint.`,
    `Sharing or reusing items related to ${item} decreases waste.`,
    `Small changes in how you use ${item} can accumulate into large environmental benefits.`,
    `Tracking your usage of ${item} helps identify ways to reduce emissions.`,
    `Encouraging others to make sustainable choices with ${item} spreads positive impact.`,
    `Being aware of how ${item} affects carbon emissions helps make informed decisions.`
  ];

  const shuffled = facts.sort(() => 0.5 - Math.random());
  return { category: topic.category, item, content: shuffled.join(" ") };
}

// Generate quiz question
function generateQuestion(module) {
  const name = getRandomName();
  const optionsPool = {
    transport: [
      { text: "Drive a car daily", footprint: 5, points: -3 },
      { text: "Use public transport occasionally", footprint: 2, points: 2 },
      { text: "Bike or walk whenever possible", footprint: -2, points: 4 }
    ],
    diet: [
      { text: "Eat meat at every meal", footprint: 6, points: -3 },
      { text: "Include vegetables regularly", footprint: 2, points: 2 },
      { text: "Adopt mostly plant-based meals", footprint: -2, points: 4 }
    ],
    energy: [
      { text: "Leave AC/fans on constantly", footprint: 5, points: -3 },
      { text: "Use energy-efficient devices occasionally", footprint: 2, points: 2 },
      { text: "Use LED bulbs and solar panels", footprint: -2, points: 4 }
    ],
    waste: [
      { text: "Throw everything away", footprint: 4, points: -3 },
      { text: "Recycle and reuse sometimes", footprint: 2, points: 2 },
      { text: "Compost, recycle, and reuse consistently", footprint: -2, points: 4 }
    ],
    fashion: [
      { text: "Buy fast fashion frequently", footprint: 4, points: -3 },
      { text: "Occasionally thrift or reuse clothes", footprint: 2, points: 2 },
      { text: "Mostly buy second-hand or sustainable clothing", footprint: -2, points: 4 }
    ],
    technology: [
      { text: "Stream or download unlimited HD content", footprint: 3, points: -2 },
      { text: "Manage device usage moderately", footprint: 1, points: 2 },
      { text: "Minimize usage and charge efficiently", footprint: -1, points: 4 }
    ]
  };

  const options = optionsPool[module.category];
  const story = `${name} often uses ${module.item}. Consider their habits and choose the most sustainable option.`;

  return { story, options };
}

// Generate course
function generateCourse(n) {
  const shuffledTopics = topics.sort(() => 0.5 - Math.random());
  const selectedTopics = shuffledTopics.slice(0, n);
  return selectedTopics.map(topic => {
    const lesson = generateLesson(topic);
    const question = generateQuestion(lesson);
    return { lesson, question };
  });
}

// Tracker Component
function Tracker({ footprint }) {
  let message = "";
  if (footprint > 15) message = "🔥 High CO₂ footprint! Try greener choices.";
  else if (footprint > 5) message = "🌿 Moderate footprint. Room to improve.";
  else message = "🌍 Low footprint. Excellent!";
  return (
    <div className="fixed bottom-5 right-5 bg-white/90 p-4 rounded-xl shadow-md w-56 text-left text-sm">
      <h4 className="font-bold text-green-700">🌱 Carbon Tracker</h4>
      <p>Current footprint: {footprint} kg CO₂</p>
      <p className="font-semibold mt-1">{message}</p>
    </div>
  );
}

export default function EcoCarbonQuest() {
  const [step, setStep] = useState("start");
  const [course, setCourse] = useState([]);
  const [current, setCurrent] = useState(0);
  const [footprint, setFootprint] = useState(0);
  const [ecoPoints, setEcoPoints] = useState(0);
  const [numModules, setNumModules] = useState(5);
  const [selectedOption, setSelectedOption] = useState(null);

  const startCourse = () => {
    setCourse(generateCourse(numModules));
    setStep("lesson");
    setCurrent(0);
    setFootprint(0);
    setEcoPoints(0);
    setSelectedOption(null);
  };

  const handleAnswer = (option) => {
    setFootprint(prev => prev + option.footprint);
    setEcoPoints(prev => prev + option.points);
    setSelectedOption(option);
    setStep("tip");
  };

  const nextStep = () => {
    if (step === "lesson") setStep("question");
    else if (step === "tip") {
      if (current + 1 < course.length) {
        setCurrent(current + 1);
        setStep("lesson");
        setSelectedOption(null);
      } else setStep("result");
    }
  };

  const resetCourse = () => {
    setStep("start");
    setCourse([]);
    setCurrent(0);
    setFootprint(0);
    setEcoPoints(0);
    setSelectedOption(null);
  };

  const currentModule = course[current];

  const getTip = () => {
    if (!selectedOption) return "";
    if (selectedOption.points >= 3) {
      return `✅ Good choice! "${selectedOption.text}" keeps your carbon footprint low.`;
    }
    if (selectedOption.points === 2) {
      return `⚠ Neutral choice. "${selectedOption.text}" added some CO₂ here (${selectedOption.footprint} kg). You can still do better.`;
    }
    return `❌ Bad choice. "${selectedOption.text}" increased CO₂ a lot here (+${selectedOption.footprint} kg). Try greener alternatives next time!`;
  };

  const getBadge = () => {
    if (ecoPoints >= numModules * 3) return "🌍 Green Guardian";
    if (ecoPoints >= numModules) return "🌿 Eco Explorer";
    return "🔥 Carbon Culprit";
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 p-6">
      <Tracker footprint={footprint} />

      {step === "start" && (
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg text-center">
          <h1 className="text-3xl font-bold text-green-800">🌱 Eco Carbon Quest</h1>
          <p className="italic text-green-700 mb-4">Every choice leaves a mark. How green is yours?</p>
          <p className="text-sm text-left mb-4">
            🎯 Scoring Rules:<br />
            ✅ Good choice = +4 Eco Points, very low CO₂<br />
            ⚠ Neutral choice = +2 Eco Points, adds some CO₂<br />
            ❌ Bad choice = -3 Eco Points (or -2 for tech), adds high CO₂
          </p>
          <label className="block mb-3">
            Number of lessons:{" "}
            <select
              className="ml-2 border rounded px-2 py-1"
              value={numModules}
              onChange={e => setNumModules(Number(e.target.value))}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map(n =>
                <option key={n} value={n}>{n}</option>
              )}
            </select>
          </label>
          <button
            onClick={startCourse}
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Start Course
          </button>
        </div>
      )}

      {step === "lesson" && (
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg text-left">
          <h2 className="text-xl font-bold text-green-700 mb-2">📖 Lesson {current + 1}</h2>
          <p className="mb-4">{currentModule.lesson.content}</p>
          <button
            onClick={nextStep}
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Take Question
          </button>
        </div>
      )}

      {step === "question" && (
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg text-left">
          <h2 className="text-xl font-bold text-green-700 mb-2">❓ Question</h2>
          <p className="mb-4">{currentModule.question.story}</p>
          <div className="flex flex-col items-center">
            {currentModule.question.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg m-1 w-full"
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "tip" && (
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg text-center">
          <h2 className="text-xl font-bold text-green-700 mb-2">💡 Feedback</h2>
          <p className="mb-4">{getTip()}</p>
          <button
            onClick={nextStep}
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Next Lesson
          </button>
        </div>
      )}

      {step === "result" && (
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg text-center">
          <h2 className="text-xl font-bold text-green-700 mb-2">🎉 Course Complete!</h2>
          <p>Total Carbon Footprint: {footprint} kg CO₂</p>
          <p>Total Eco Points: {ecoPoints}</p>
          <p>You earned the badge: <strong>{getBadge()}</strong></p>
          <button
            onClick={resetCourse}
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg mt-3"
          >
            Restart Course
          </button>
        </div>
      )}
    </div>
  );
}
