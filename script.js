/* ------------------- HTML, CSS & JS questions ------------------- */
const questions = [
  {
    category: "html",
    q: "Which tag is used to create a hyperlink in HTML?",
    options: ["<a>", "<link>", "<href>", "<nav>"],
    correct: 0,
  },
  {
    category: "html",
    q: "Which attribute provides alternate text for an image if it fails to load?",
    options: ["alt", "src", "title", "longdesc"],
    correct: 0,
  },
  {
    category: "html",
    q: "Which HTML element typically holds metadata like the page title and character set?",
    options: ["<head>", "<body>", "<header>", "<meta>"],
    correct: 0,
  },
  {
    category: "css",
    q: "Which property is used to change the text color of an element?",
    options: ["color", "font-color", "text-color", "background-color"],
    correct: 0,
  },
  {
    category: "css",
    q: "Which position value fixes an element relative to the browser viewport, even while scrolling?",
    options: ["static", "relative", "absolute", "fixed"],
    correct: 3,
  },
  {
    category: "css",
    q: "What does box-sizing: border-box do?",
    options: [
      "Includes padding & border within the set width/height",
      "Ignores padding entirely",
      "Only affects margins",
      "Disables the box model",
    ],
    correct: 0,
  },
  {
    category: "css",
    q: "Which CSS property creates spacing between flex or grid items without using margins?",
    options: ["gap", "padding", "justify-content", "align-items"],
    correct: 0,
  },
  {
    category: "js",
    q: "Which array method adds a new element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correct: 0,
  },
  {
    category: "js",
    q: "Which keyword declares a variable that cannot be reassigned after its initial value?",
    options: ["var", "let", "const", "function"],
    correct: 2,
  },
  {
    category: "js",
    q: "Which operator returns the data type of a value?",
    options: ["typeof", "instanceof", "in", "new"],
    correct: 0,
  },
];

const CATEGORY_LABEL = { html: "HTML", css: "CSS", js: "JavaScript" };
const OPTION_LETTERS = ["A", "B", "C", "D"];
const TOTAL = questions.length;
const TIME_PER_QUESTION = 15;
const TIMEOUT_ADVANCE_DELAY = 1400;

/* ------------------- STATE & DOM REFS ------------------- */
let currentIndex = 0;
let pendingIndex = null;
let score = 0;
let timeLeft = TIME_PER_QUESTION;
let timerInterval = null;
let autoAdvanceTimer = null;
let answered = false;

const qCounterEl = document.querySelector(".q-counter");
const timerChip = document.getElementById("timerChip");
const timerFill = document.getElementById("timerFill");
const progressSegments = document.getElementById("progressSegments");
const categoryTag = document.getElementById("categoryTag");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const remainingText = document.getElementById("remainingText");
const nextBtn = document.getElementById("nextBtn");
const cardBody = document.getElementById("cardBody");
const ghost1 = document.getElementById("ghost1");
const ghost2 = document.getElementById("ghost2");

const deckWrapper = document.getElementById("deckWrapper");
const quizCard = document.getElementById("quizCard");
const resultCard = document.getElementById("resultCard");
const scoreValue = document.getElementById("scoreValue");
const scorePercent = document.getElementById("scorePercent");
const scoreMessage = document.getElementById("scoreMessage");
const retakeBtn = document.getElementById("retakeBtn");

/* ------------------- COMPLETED-QUESTIONS INDICATOR (segmented dots) -------------------*/
function renderSegments(activeIndex) {
  progressSegments.innerHTML = "";
  for (let i = 0; i < TOTAL; i++) {
    const seg = document.createElement("span");
    seg.classList.add("segment");
    if (i < activeIndex) seg.classList.add("completed");
    else if (i === activeIndex) seg.classList.add("current");
    progressSegments.appendChild(seg);
  }
}

/* ------------------- RENDER A QUESTION (no transition — used on init / retake) -------------------*/
function renderQuestionContent(index) {
  answered = false;
  clearTimeout(autoAdvanceTimer);
  const current = questions[index];
  const remaining = TOTAL - index - 1;

  qCounterEl.textContent = `Question ${index + 1} of ${TOTAL}`;
  remainingText.textContent = `${remaining} questions remaining`;
  renderSegments(index);

  ghost1.style.display = remaining >= 1 ? "block" : "none";
  ghost2.style.display = remaining >= 2 ? "block" : "none";

  categoryTag.textContent = CATEGORY_LABEL[current.category];
  categoryTag.className = `tag tag-${current.category}`;

  questionText.textContent = current.q;

  optionsContainer.innerHTML = "";
  current.options.forEach((optionLabel, i) => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");

    const letterSpan = document.createElement("span");
    letterSpan.classList.add("opt-letter");
    letterSpan.textContent = OPTION_LETTERS[i];

    const textSpan = document.createElement("span");
    textSpan.classList.add("opt-text");
    textSpan.textContent = optionLabel;

    btn.appendChild(letterSpan);
    btn.appendChild(textSpan);
    btn.addEventListener("click", () => selectOption(btn, i, current.correct));
    optionsContainer.appendChild(btn);
  });

  nextBtn.disabled = true;
  nextBtn.textContent = index === TOTAL - 1 ? "Finish ✓" : "Next →";

  startTimer();
}

/* ------------------- ANIMATED PAGE TRANSITION BETWEEN QUESTIONS -------------------*/
function transitionToQuestion(newIndex) {
  pendingIndex = newIndex;
  cardBody.classList.add("page-out");
}

cardBody.addEventListener("animationend", (e) => {
  if (e.animationName === "pageOut" && pendingIndex !== null) {
    cardBody.classList.remove("page-out");
    currentIndex = pendingIndex;
    pendingIndex = null;
    renderQuestionContent(currentIndex);
    cardBody.classList.add("page-in");
  } else if (e.animationName === "pageIn") {
    cardBody.classList.remove("page-in");
  }
});

/* ------------------- TIMER -------------------*/
function startTimer() {
  clearInterval(timerInterval);
  timeLeft = TIME_PER_QUESTION;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 1000);
}

function updateTimerDisplay() {
  timerChip.textContent = `${timeLeft}s`;
  timerFill.style.width = `${(timeLeft / TIME_PER_QUESTION) * 100}%`;
  const isLow = timeLeft <= 5;
  timerChip.classList.toggle("low", isLow);
  timerFill.classList.toggle("low", isLow);
}

/* ------------------- ANSWER HANDLING -------------------*/
function lockOptions() {
  const buttons = optionsContainer.querySelectorAll(".option-btn");
  buttons.forEach((btn) => {
    btn.disabled = true;
  });
  return buttons;
}

function markIcon(btn, symbol) {
  const icon = document.createElement("span");
  icon.classList.add("opt-icon");
  icon.textContent = symbol;
  btn.appendChild(icon);
}

function flashCard(type) {
  quizCard.classList.remove("flash-correct", "flash-wrong");
  quizCard.classList.add(type);
  quizCard.addEventListener("animationend", function handler(e) {
    if (e.animationName === "flashGlow") {
      quizCard.classList.remove(type);
      quizCard.removeEventListener("animationend", handler);
    }
  });
}

function selectOption(selectedBtn, selectedIndex, correctIndex) {
  if (answered) return;
  answered = true;
  clearInterval(timerInterval);

  const buttons = lockOptions();

  if (selectedIndex === correctIndex) {
    score++;
    selectedBtn.classList.add("correct");
    markIcon(selectedBtn, "✓");
    flashCard("flash-correct");
  } else {
    selectedBtn.classList.add("wrong");
    markIcon(selectedBtn, "✕");
    buttons[correctIndex].classList.add("correct");
    markIcon(buttons[correctIndex], "✓");
    flashCard("flash-wrong");
  }

  nextBtn.disabled = false;
}

function handleTimeout() {
  if (answered) return;
  answered = true;

  const buttons = lockOptions();
  const correctIndex = questions[currentIndex].correct;
  buttons[correctIndex].classList.add("correct");
  markIcon(buttons[correctIndex], "✓");
  flashCard("flash-wrong");

  nextBtn.disabled = false;
  autoAdvanceTimer = setTimeout(goToNextOrFinish, TIMEOUT_ADVANCE_DELAY);
}

/* ------------------- NAVIGATION -------------------*/
function goToNextOrFinish() {
  clearTimeout(autoAdvanceTimer);
  autoAdvanceTimer = null;
  if (currentIndex < TOTAL - 1) {
    transitionToQuestion(currentIndex + 1);
  } else {
    showResult();
  }
}

nextBtn.addEventListener("click", goToNextOrFinish);

function showResult() {
  deckWrapper.classList.add("hidden");
  resultCard.classList.add("visible");

  const percent = Math.round((score / TOTAL) * 100);
  scoreValue.textContent = `${score}/${TOTAL}`;
  scorePercent.textContent = `${percent}% correct`;

  let message;
  if (score >= 9) message = "Outstanding! 🏆";
  else if (score >= 7) message = "Great job! 👏";
  else if (score >= 5) message = "Not bad — keep practicing 💪";
  else message = "Keep learning, you'll get there 🌱";
  scoreMessage.textContent = message;
}

retakeBtn.addEventListener("click", () => {
  clearTimeout(autoAdvanceTimer);
  currentIndex = 0;
  score = 0;
  resultCard.classList.remove("visible");
  deckWrapper.classList.remove("hidden");
  renderQuestionContent(currentIndex);
});

/* ------------------- INIT -------------------*/
renderQuestionContent(currentIndex);