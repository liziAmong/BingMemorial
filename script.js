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

 // ✅ 인덱스 표시 업데이트
  const counter = document.getElementById("counter");
  counter.textContent = `${currentIndex + 1} / ${totalItems}`;
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

/*
// 자동 슬라이드
setInterval(() => {
  currentIndex = (currentIndex + 1) % totalItems;
  updateDisplay();
}, 5000);
*/
updateDisplay();

let eggClickCount = 0;
const eggImg = document.getElementById('easter-egg-img');
const playerDiv = document.getElementById('easter-egg-player');
const counterText = document.getElementById('click-counter');

if (eggImg) {
  eggImg.addEventListener('click', () => {
    eggClickCount++;
    counterText.innerText = `${eggClickCount} / 13`;
    counterText.style.display = 'block';

    if (eggClickCount === 13) {
      playerDiv.style.display = 'block';
      counterText.innerText = `🎉 완료!`;
      counterText.style.background = '#ff85c1';
      setTimeout(() => {
        counterText.style.display = 'none';
      }, 2000);

      // 부드럽게 등장
      playerDiv.style.opacity = 0;
      playerDiv.style.transition = "opacity 1s";
      setTimeout(() => playerDiv.style.opacity = 1, 10);

      alert("🎊 이스터에그가 해제되었습니다!");
    } else if (eggClickCount > 13) {
      eggClickCount = 13; // 클릭수 제한
    }
  });
}

function playEasterEgg(type) {
  let src = '';
  switch (type) {
    case 'normal': src = 'sounds/sound20_1.mp3'; break;
    case 'rare': src = 'sounds/sound20_2.mp3'; break;
    case 'special': src = 'sounds/sound20_special.mp3'; break;
  }
  const audio = new Audio(src);
  audio.play();
}

