// game.js
const questions = [
  {
    question: "Which of these is recyclable?",
    options: ["Plastic Bottle", "Banana Peel", "Styrofoam"],
    answer: 0
  },
  {
    question: "What gas do trees absorb?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen"],
    answer: 1
  }
];

let currentQuestion = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(index);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (selected === questions[currentQuestion].answer) {
    feedbackEl.textContent = "✅ Correct!";
  } else {
    feedbackEl.textContent = "❌ Try Again!";
  }
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    questionEl.textContent = "🎉 You finished EcoQuest!";
    optionsEl.innerHTML = "";
    feedbackEl.textContent = "";
    nextBtn.style.display = "none";
  }
});

loadQuestion();
