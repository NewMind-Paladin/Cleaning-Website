// ===== Калькулятор стоимости =====
function calculateTotal() {
  const propertySelect = document.getElementById('propertyType');
  const bathroomSelect = document.getElementById('bathroomCount');

  const propertyPrice = parseInt(propertySelect.options[propertySelect.selectedIndex].dataset.price);
  const bathroomPrice = parseInt(bathroomSelect.options[bathroomSelect.selectedIndex].dataset.price);

  const extras = document.querySelectorAll('.extras input[type="checkbox"]:checked');
  let extrasTotal = 0;
  extras.forEach(extra => {
    extrasTotal += parseInt(extra.dataset.price);
  });

  const total = propertyPrice + bathroomPrice + extrasTotal;
  document.getElementById('totalAmount').innerText = `€${total}`;
}

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
  window.addEventListener('scroll', animOnScroll);
  animOnScroll(); // Запускаем анимацию сразу при загрузке страницы

  function animOnScroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4; // Точка начала анимации (1/4 высоты элемента)

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
        animItem.classList.add('_active');
      } else {
        if (!animItem.classList.contains('_anim-no-hide')) {
          animItem.classList.remove('_active');
        }
      }
    }
  }

  function offset(el) {
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX
    };
  }
}
// ===== FAQ аккордеон =====
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const parent = question.parentElement;

    document.querySelectorAll('.faq-item').forEach(item => {
      if (item !== parent) item.classList.remove('active');
    });

    parent.classList.toggle('active');
  });
});

// ===== Инициализация Swiper =====
if (document.querySelector('.mySwiper')) {
  const swiper = new Swiper(".mySwiper", {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    keyboard: {
      enabled: true,
    },
  });
}

// ===== Опросник (Quiz) =====
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


