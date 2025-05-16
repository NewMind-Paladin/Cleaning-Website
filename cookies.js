// Установка куки (на 30 дней)
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + expires + "; path=/";
}

// Получение куки
function getCookie(name) {
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
}

// Сохраняем данные при отправке формы
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cleaningForm");

  if (form) {
    // Восстанавливаем email и телефон
    const email = getCookie("userEmail");
    const phone = getCookie("userPhone");

    if (email) form.email.value = email;
    if (phone) form.phone.value = phone;

    // При отправке сохраняем куки
    form.addEventListener("submit", function () {
      setCookie("userEmail", form.email.value, 30);
      setCookie("userPhone", form.phone.value, 30);
    });
  }
});

function acceptCookies() {
    setCookie("cookiesAccepted", "yes", 365);
    document.getElementById("cookie-banner").style.display = "none";
  }
  
  // Show banner if cookies not accepted
  document.addEventListener("DOMContentLoaded", function () {
    if (!getCookie("cookiesAccepted")) {
      document.getElementById("cookie-banner").style.display = "block";
    }
  });
  