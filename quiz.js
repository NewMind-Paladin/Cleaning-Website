// ===== Опросник (Quiz) =====
import { db } from './database.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const quizData = [
  {
    question: "Which type of cleaning services do you need?",
    a: "House Cleaning",
    b: "Office Cleaning",
    c: "Carpet Cleaning",
    d: "Upholstery Cleaning",
    e: "Window Cleaning",
    f: "End of Tenancy Cleaning",
    g: "Leather Cleaning",
    h: "Rug Cleaning",
    i: "Hard Floor Cleaning",
    j: "Power Washing",
    id: "service"
  },
  {
    question: "When do you want the cleaning done?",
    a: "As soon as possible",
    b: "Within next few days",
    c: "Within the next week",
    d: "Within the next month",
    id: "timeframe"
  },
  {
    question: "What email address would you like the quote sent to? This question is required.*",
    input: "email",
    id: "email"
  },
  {
    question: "Can we have your contact number?",
    input: "tel",
    id: "phone"
  },
  {
    question: "What is your name?",
    input: "text",
    id: "name"
  },
];

const quiz = document.getElementById('quiz');
const nextButton = document.getElementById('next');
const submitButton = document.getElementById('submit');
const homeButton = document.getElementById('home');

let currentQuiz = 0;
let answers = {};

function loadQuiz() {
  quiz.innerHTML = '';
  const current = quizData[currentQuiz];

  const qEl = document.createElement('div');
  qEl.classList.add('question');
  qEl.innerText = current.question;
  quiz.appendChild(qEl);

  if (current.input) {
    const input = document.createElement('input');
    input.type = current.input;
    input.id = current.id;
    input.value = answers[current.id] || '';
    quiz.appendChild(input);
  } else {
    ['a','b','c','d','e','f','g','h','i','j'].forEach(key => {
      if (current[key]) {
        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');

        input.type = 'radio';
        input.name = current.id;
        input.id = `${current.id}-${key}`;
        input.value = current[key];
        if (answers[current.id] === current[key]) input.checked = true;

        label.setAttribute('for', input.id);
        label.classList.add('quiz-option');
        span.innerText = current[key];

        label.appendChild(input);
        label.appendChild(span);
        quiz.appendChild(label);
      }
    });
  }
}

nextButton.addEventListener('click', () => {
  const current = quizData[currentQuiz];
  if (current.input) {
    const input = document.getElementById(current.id);
    if (input.value.trim() !== '') {
      answers[current.id] = input.value.trim();
    }
  } else {
    const option = document.querySelector(`input[name="${current.id}"]:checked`);
    if (option) {
      answers[current.id] = option.value;
    }
  }

  if (currentQuiz < quizData.length - 1) {
    currentQuiz++;
    loadQuiz();
  } else {
    nextButton.style.display = 'none';
    submitButton.style.display = 'block';
  }
});

submitButton.addEventListener("click", async (e) => {
  e.preventDefault();

  if (Object.keys(answers).length < quizData.length) {
    alert("Please answer all questions before submitting.");
    return;
  }

  try {
    await addDoc(collection(db, "quiz_responses"), {
      quizAnswers: answers,
      createdAt: new Date()
    });

    alert("Your responses have been submitted successfully!");
    quiz.innerHTML = "<p>Thank you for your submission!</p>";
    submitButton.style.display = 'none';
  } catch (error) {
    console.error("Error saving quiz responses:", error);
    alert("Something went wrong. Please try again.");
  }
});

loadQuiz();
