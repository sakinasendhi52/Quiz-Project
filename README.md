<div align="center">

# 🎮 Web Dev Quiz

**A neon-themed, timed quiz that tests your HTML, CSS &amp; JavaScript knowledge.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/Status-Complete-3ECF8E?style=for-the-badge)

<img src="assets/quiz-screen.png" width="640" alt="Web Dev Quiz preview">

</div>

---

## 📑 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [How It Works](#-how-it-works)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Demo](#-demo)
- [Author](#-author)

---

## 📖 About

**Web Dev Quiz** is a 10-question, timed multiple-choice quiz covering HTML, CSS, and JavaScript fundamentals. Each question gives you 15 seconds to answer, with instant feedback, an animated card-deck interface, and a final score screen — all wrapped in a neon synthwave visual theme built with vanilla HTML, CSS, and JavaScript.

---

## ✅ Features

| | |
|---|---|
| ✅ | 10 questions across HTML, CSS & JavaScript |
| ✅ | 15-second countdown timer per question |
| ✅ | Auto-advances when time runs out |
| ✅ | Instant ✓ / ✕ answer feedback |
| ✅ | Color-coded category tags (HTML · CSS · JS) |
| ✅ | Animated "card deck" with shrinking ghost cards |
| ✅ | Segmented progress bar (completed / current / upcoming) |
| ✅ | Smooth slide transitions between questions |
| ✅ | Glowing flash effect on correct/wrong answers |
| ✅ | Final score screen with percentage + message |
| ✅ | Retake Quiz button |
| ✅ | Fully responsive · respects `prefers-reduced-motion` |

---

## 🛠 Tech Stack

| Layer | Tools |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 — custom properties, gradients, keyframe animations, `backdrop-filter`, `color-mix()` |
| Logic | JavaScript (ES6) — arrays, arrow functions, template literals, DOM APIs |
| Fonts | Orbitron · JetBrains Mono · Sora (Google Fonts) |

---

## ⚙️ How It Works

```text
Load question  →  Start 15s timer  →  User answers OR timer hits 0
                                              │
                          ┌───────────────────┴───────────────────┐
                          ▼                                       ▼
                Reveal correct answer                   Reveal correct answer
                  + manual "Next" click                  + auto-advance (1.4s)
                          │                                       │
                          └───────────────┬───────────────────────┘
                                          ▼
                          Last question? → Show score screen
                                  │
                                  ▼
                          "Retake Quiz" → reset & restart
```

---

## ▶️ Getting Started

No build tools or dependencies required.

```bash
git clone https://github.com/sakinasendhi52/web-dev-quiz.git
cd web-dev-quiz
```

Then simply open `index.html` in your browser — that's it.

---

## 📂 Project Structure

```text
Web-Dev-Quiz/
│
├── assets/
│   └── quiz.png
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## 🎬 Demo

| | |
|---|---|
| 🔗 Live Demo | _(add your live demo link here)_ |
| 🎥 Walkthrough Video | _(add your video link here)_ |

<div align="center">
<img src="assets/result-screen.png" width="500" alt="Quiz result screen">
</div>

---

## 👩‍💻 Author

<div align="center">

**Sakina Sendhi**

[![GitHub](https://img.shields.io/badge/GitHub-sakinasendhi52-181717?style=for-the-badge&logo=github)](https://github.com/sakinasendhi52)

⭐ If you liked this project, consider giving it a star!

</div>

















```
╔══════════════════════════════════════════╗
║              WEB DEV QUIZ                ║
║       HTML  ·  CSS  ·  JAVASCRIPT        ║
╚══════════════════════════════════════════╝
```

```bash
$ whoami
```
A 10-question, timed multiple-choice quiz that tests your HTML, CSS, and
JavaScript fundamentals — built with vanilla HTML, CSS, and JS, wrapped in
a neon synthwave interface.

---

```bash
$ ls ./features
```
```
✓ 10 questions   → HTML · CSS · JavaScript
✓ timer.js       → 15s countdown per question
✓ auto-advance   → moves on automatically when time runs out
✓ feedback.css   → instant ✓ / ✕ highlighting on every answer
✓ tags.css       → color-coded category badges (orange / blue / yellow)
✓ deck.css       → animated "ghost card" stack that shrinks as you progress
✓ segments.js    → 10-dot progress tracker (completed / current / upcoming)
✓ transitions.js → slide animation between questions
✓ glow.css       → flash effect on the card for correct/wrong answers
✓ result.js      → final score, percentage, performance message
✓ retake.js      → resets state and restarts the quiz
✓ a11y           → respects prefers-reduced-motion
```

---

```bash
$ cat ./stack.txt
```
```
HTML5   structure
CSS3    custom properties · gradients · keyframes · backdrop-filter · color-mix()
JS(ES6) arrays · arrow functions · template literals · DOM APIs
fonts   Orbitron · JetBrains Mono · Sora
```

---

```bash
$ man how-it-works
```
```
NAME
    quiz-loop — the main render/answer/advance cycle

FLOW
    1. renderQuestionContent(index)   build question + options, start timer
    2. user clicks an option      OR  timer hits 0
    3. selectOption() / handleTimeout() lock options, reveal correct answer
    4. flashCard()                    glow pulse: green = correct, red = wrong
    5. nextBtn click OR 1.4s auto-delay → transitionToQuestion(index + 1)
    6. index === TOTAL - 1            → showResult()
    7. retakeBtn click                → reset score + index, go to step 1
```

---

```bash
$ ./run.sh
```
```
> no build tools
> no dependencies
> no install step

$ open index.html
```
Just clone it and open `index.html` in your browser. That's the whole setup.

---

```bash
$ tree
```
```
Web-Dev-Quiz/
├── assets/
│   └── quiz.png
├── index.html
├── style.css
├── script.js
└── README.md
```

---

```bash
$ cat ./demo.txt
```
```
live   : (add your live demo link here)
video  : (add your walkthrough video link here)
```

---

```bash
$ whoami --author
```
```
Sakina Sendhi
github.com/sakinasendhi52
```

```bash
$ echo "thanks for stopping by" | star ⭐
```
