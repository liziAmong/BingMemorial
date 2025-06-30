const totalItems = 20;
let currentIndex = 0;

const imageElement = document.getElementById("main-image");
const soundButton = document.getElementById("sound-btn");

// 이미지 경로 설정
const images = Array.from({ length: totalItems }, (_, i) => `images/image${i + 1}.jpg`);

// 각 이미지에 해당하는 3개 사운드 경로 설정
const sounds = Array.from({ length: totalItems }, (_, i) => ({
  default1: `sounds/sound${i + 1}_1.mp3`,
  default2: `sounds/sound${i + 1}_2.mp3`,
  special: `sounds/sound${i + 1}_special.mp3`
}));

function updateDisplay() {
  imageElement.src = images[currentIndex];
}

document.getElementById("prev-btn").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + totalItems) % totalItems;
  updateDisplay();
});

document.getElementById("next-btn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % totalItems;
  updateDisplay();
});

soundButton.addEventListener("click", () => {
  const r = Math.random();
  let audioSrc;
  const soundSet = sounds[currentIndex];

  if (r < 0.45) {
    audioSrc = soundSet.default1;
  } else if (r < 0.9) {
    audioSrc = soundSet.default2;
  } else {
    audioSrc = soundSet.special;
  }

  const audio = new Audio(audioSrc);
  audio.play();
});

// 자동 슬라이드
setInterval(() => {
  currentIndex = (currentIndex + 1) % totalItems;
  updateDisplay();
}, 5000);

updateDisplay();
