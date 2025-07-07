/* const totalItems = 20;
let currentIndex = 0;

const imageElement = document.getElementById("main-image");
const soundButton = document.getElementById("sound-btn");

// 이미지 경로 설정
const images = Array.from({ length: totalItems }, (_, i) => `images/image${i + 1}.jpg`);

const sounds = Array.from({ length: totalItems }, (_, i) => ({
  default1: `sounds/sound${i + 1}_1.mp3`,
  default2: `sounds/sound${i + 1}_2.mp3`,
  special: `sounds/sound${i + 1}_special.mp3`
}));

function updateDisplay() {
  imageElement.src = images[currentIndex];
  document.getElementById("counter").textContent = `${currentIndex + 1} / ${totalItems}`;
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

updateDisplay();

// 🎉 이스터에그 기능 (슬라이더 이미지 클릭)
let eggClickCount = 0;
const playerDiv = document.getElementById('easter-egg-player');
const counterText = document.getElementById('click-counter');

// 메인 이미지 클릭 시
imageElement.addEventListener('click', () => {
  if (currentIndex === 19) {
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
      eggClickCount = 13; // 제한
    }
  }
});

// 이스터에그 음성 재생
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

*/
