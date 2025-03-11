document.addEventListener("DOMContentLoaded", function () {
  let messages = [];
  let index = 0;
  let intervalTime = 2000;
  let interval;

  const announcementBar = document.getElementById("announcement-bar");
  const announcementText = document.getElementById("announcement-text");

  function startInterval() {
    clearInterval(interval);
    interval = setInterval(changeMessage, intervalTime);
  }

  function changeMessage() {
    if (messages.length === 0) return;

    announcementBar.classList.add("fade-out");

    setTimeout(() => {
      index = (index + 1) % messages.length;
      announcementText.textContent = messages[index];
      announcementBar.classList.remove("fade-out");
    }, 500);
  }

  announcementBar.addEventListener("click", function () {
    changeMessage();
    startInterval();
  });

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      announcementBar.classList.add("hidden");
    } else {
      announcementBar.classList.remove("hidden");
    }
  });

  fetch("/settings.json")
    .then((response) => response.json())
    .then((data) => {
      messages = data.announcementBar.messages;
      intervalTime = data.announcementBar.interval;
      startInterval();
    })
    .catch((error) =>
      console.error("Erro ao carregar o settings.json:", error)
    );
});
