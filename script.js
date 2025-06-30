const images = [];
const sounds = [];
const totalItems = 20; // 필요한 이미지+사운드 개수

for (let i = 1; i <= totalItems; i++) {
  images.push(`images/image${i}.jpg`);
  sounds.push(`sounds/sound${i}.mp3`);
}

let currentIndex = 0;
const imageElement = document.getElementById("main-image");
const soundButton = document.getElementById("sound-btn");

document.getElementById("prev-btn").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateDisplay();
});

document.getElementById("next-btn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateDisplay();
});

soundButton.addEventListener("click", () => {
  const audio = new Audio(sounds[currentIndex]);
  audio.play();
});

function updateDisplay() {
  imageElement.src = images[currentIndex];
}

// 자동 슬라이드 기능 (5초마다)
setInterval(() => {
  currentIndex = (currentIndex + 1) % images.length;
  updateDisplay();
}, 5000);

// 초기 표시
updateDisplay();
