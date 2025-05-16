// database.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBuOPXb-9caqRfAzQStgNulnJ_9vkJsZV8",
  authDomain: "cleaning-website-70808.firebaseapp.com",
  projectId: "cleaning-website-70808",
  storageBucket: "cleaning-website-70808.appspot.com",
  messagingSenderId: "548948017624",
  appId: "1:548948017624:web:863df816c9d8840df572ad",
  measurementId: "G-WBW3MSG46S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Обработка всех форм после загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
  // === FAQ form на странице FAQ.html ===
  const faqForm = document.getElementById("faqForm");

  if (faqForm) {
    faqForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = {
        phone: faqForm.name.value,
        email: faqForm.email.value,
        message: faqForm.message.value,
        createdAt: new Date()
      };

      try {
        await addDoc(collection(db, "faq_messages"), formData);
        alert("Thank you! Your question has been sent.");
        faqForm.reset();
      } catch (error) {
        console.error("Error submitting FAQ message:", error);
        alert("Failed to send your message. Please try again.");
      }
    });
  }

  // === Contact Us form на странице Contact Us.html ===
  const contactForm = document.getElementById("contactform");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = {
        phone: contactForm.name.value,
        email: contactForm.email.value,
        subject: contactForm.Subject?.value || "",
        message: contactForm.message.value,
        createdAt: new Date()
      };

      try {
        await addDoc(collection(db, "contact_messages"), formData);
        alert("Thanks! Your message has been sent.");
        contactForm.reset();
      } catch (error) {
        console.error("Error submitting contact form:", error);
        alert("Failed to send your message. Please try again.");
      }
    });
  }
});

// === QUIZ logic ===
const submitButton = document.getElementById("submit");

if (submitButton) {
  submitButton.addEventListener("click", async (e) => {
    e.preventDefault();

    if (typeof quizData === "undefined") {
      console.warn("quizData is not defined");
      return;
    }

    const userAnswers = getSelectedAnswersFromQuiz();
    const totalQuestions = quizData.length;
    const answeredQuestions = Object.keys(userAnswers).length;

    if (answeredQuestions < totalQuestions) {
      alert(`Please answer all ${totalQuestions} questions before submitting. You answered only ${answeredQuestions}.`);
      return;
    }

    try {
      await addDoc(collection(db, "quiz_responses"), {
        quizAnswers: userAnswers,
        createdAt: new Date()
      });

      alert("Your responses have been submitted successfully!");
    } catch (error) {
      console.error("Error saving quiz responses:", error);
      alert("Something went wrong. Please try again.");
    }
  });
}

function getSelectedAnswersFromQuiz() {
  const selected = {};
  quizData.forEach((q) => {
    if (q.input) {
      const input = document.getElementById(q.id);
      if (input && input.value.trim() !== "") {
        selected[q.id] = input.value.trim();
      }
    } else {
      const option = document.querySelector(`input[name="${q.id}"]:checked`);
      if (option) {
        selected[q.id] = option.value;
      }
    }
  });
  return selected;
}
