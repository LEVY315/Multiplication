let currentScore = 0;
let timer;
let timeRemaining = 60;
let questionInterval;
const maxQuestions = 10;
let questionCount = 0;

const startBtn = document.getElementById('start-btn');
const gameScreen = document.getElementById('game-screen');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const submitBtn = document.getElementById('submit-btn');
const answerInput = document.getElementById('answer');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const questionDisplay = document.getElementById('question');
const finalScoreDisplay = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');

startBtn.addEventListener('click', startGame);
submitBtn.addEventListener('click', checkAnswer);
restartBtn.addEventListener('click', restartGame);

function startGame() {
  startScreen.style.display = 'none';
  gameScreen.style.display = 'block';
  startTimer();
  generateQuestion();
}

function startTimer() {
  timer = setInterval(() => {
    timeRemaining--;
    timerDisplay.innerText = `Time: ${timeRemaining}s`;

    if (timeRemaining <= 0 || questionCount >= maxQuestions) {
      endGame();
    }
  }, 1000);
}

function generateQuestion() {
  const num1 = Math.floor(Math.random() * 12) + 1;
  const num2 = Math.floor(Math.random() * 12) + 1;
  questionDisplay.innerText = `${num1} x ${num2}`;
  questionDisplay.dataset.answer = num1 * num2;
}

function checkAnswer() {
  const userAnswer = parseInt(answerInput.value);
  const correctAnswer = parseInt(questionDisplay.dataset.answer);

  if (userAnswer === correctAnswer) {
    currentScore += 10;
  } else {
    currentScore -= 5;
  }

  scoreDisplay.innerText = `Score: ${currentScore}`;
  questionCount++;
  generateQuestion();
  answerInput.value = '';
}

function endGame() {
  clearInterval(timer);
  finalScoreDisplay.innerText = currentScore;
  gameScreen.style.display = 'none';
  gameOverScreen.style.display = 'block';
}

function restartGame() {
  currentScore = 0;
  timeRemaining = 60;
  questionCount = 0;
  scoreDisplay.innerText = `Score: 0`;
  timerDisplay.innerText = `Time: 60s`;
  startGame();
}

