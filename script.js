const quizData = {
  math: [
    { question: "5 + 3 = ?", answers: ["6", "8", "9", "7"], correct: "8" },
    { question: "9 x 2 = ?", answers: ["18", "16", "21", "19"], correct: "18" },
    { question: "12 ÷ 4 = ?", answers: ["2", "3", "4", "6"], correct: "3" }
  ],
  gk: [
    { question: "Capital of India?", answers: ["New Delhi", "Andhra Pradesh", "Karnataka", "Hydrabed"], correct: "New Delhi" },
    { question: "Who wrote 'Ramayana'?", answers: ["Tulsidas", "Valmiki", "Kalidas", "Kabir"], correct: "Valmiki" },
    { question: "Largest ocean?", answers: ["Atlantic", "Pacific", "Indian", "Arctic"], correct: "Pacific" }
  ],
  science: [
    { question: "Water formula?", answers: ["H2O", "CO2", "O2", "HCl"], correct: "H2O" },
    { question: "Sun is a?", answers: ["Planet", "Star", "Comet", "Galaxy"], correct: "Star" },
    { question: "Human skeleton has?", answers: ["200", "206", "210", "180"], correct: "206" }
  ]
};

let currentQuiz = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;
let highScore = localStorage.getItem("highScore") || 0;

const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("high-score");
const timerElement = document.getElementById("timer");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");

function startSelectedQuiz() {
  const selectedModel = document.getElementById("quiz-model").value;
  currentQuiz = shuffleArray([...quizData[selectedModel]]);
  currentQuestionIndex = 0;
  score = 0;

  document.getElementById("model-selector").classList.add("hide");
  document.getElementById("question-box").classList.remove("hide");
  nextButton.classList.remove("hide");

  showQuestion();
}

function showQuestion() {
  resetAnswers();
  startTimer();

  const currentQuestion = currentQuiz[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.addEventListener("click", () => selectAnswer(answer));
    answersContainer.appendChild(button);
  });
}

function resetAnswers() {
  answersContainer.innerHTML = "";
  clearInterval(timer);
  timeLeft = 10;
  timerElement.textContent = `Time: ${timeLeft}s`;
}

function selectAnswer(answer) {
  clearInterval(timer);
  const correctAnswer = currentQuiz[currentQuestionIndex].correct;

  if (answer === correctAnswer) {
    correctSound.play();
    score++;
  } else {
    wrongSound.play();
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuiz.length) {
    setTimeout(showQuestion, 500);
  } else {
    showResult();
  }
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time: ${timeLeft}s`;
    if (timeLeft === 0) {
      clearInterval(timer);
      wrongSound.play();
      currentQuestionIndex++;
      if (currentQuestionIndex < currentQuiz.length) {
        showQuestion();
      } else {
        showResult();
      }
    }
  }, 1000);
}

function showResult() {
  document.getElementById("question-box").classList.add("hide");
  resultBox.classList.remove("hide");
  nextButton.classList.add("hide");

  scoreElement.textContent = `You scored ${score} out of ${currentQuiz.length}`;
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
  }
  highScoreElement.textContent = `🏆 High Score: ${highScore}`;
}

function resetApp() {
  resultBox.classList.add("hide");
  document.getElementById("model-selector").classList.remove("hide");
}

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}
window.addEventListener('click', () => {
  document.getElementById("correct-sound").play();
  console.log("Sound unlocked by user click");
}, { once: true });
