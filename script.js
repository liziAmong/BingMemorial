const totalItems = 20;
let currentIndex = 0;

const imageElement = document.getElementById("main-image");
const soundButton = document.getElementById("sound-btn");

// 현재 재생 중인 오디오 추적
let currentAudio;

// 🔊 볼륨 컨트롤 UI 생성
const volumeWrapper = document.createElement('div');
volumeWrapper.id = "volume-control";
const volumeSlider = document.createElement('input');
volumeSlider.type = "range";
volumeSlider.min = "0";
volumeSlider.max = "1";
volumeSlider.step = "0.01";
volumeSlider.value = "0.7";  // 기본 볼륨
volumeWrapper.appendChild(volumeSlider);
document.body.appendChild(volumeWrapper);

// 슬라이더 조작 시 오디오 볼륨 변경
volumeSlider.addEventListener('input', () => {
  if (currentAudio) {
    currentAudio.volume = parseFloat(volumeSlider.value);
  }
});

// 이미지 경로 배열
const images = Array.from({ length: totalItems }, (_, i) => `images/image${i + 1}.jpg`);

// 각 이미지에 해당하는 3개 사운드 경로
const sounds = Array.from({ length: totalItems }, (_, i) => ({
  default1: `sounds/sound${i + 1}_1.mp3`,
  default2: `sounds/sound${i + 1}_2.mp3`,
  special: `sounds/sound${i + 1}_special.mp3`
}));

// 가챠 실행 함수
function playSoundForCurrentImage() {
  const sound = sounds[currentIndex];
  const options = [sound.default1, sound.default2, sound.special];
  const selected = options[Math.floor(Math.random() * options.length)];

  const audio = new Audio(selected);
  audio.volume = parseFloat(volumeSlider.value); // 볼륨 설정
  audio.play();
  volumeWrapper.style.display = 'block'; // 슬라이더 표시
  currentAudio = audio;
}

// 다음 이미지로
function showNextImage() {
  currentIndex = (currentIndex + 1) % totalItems;
  updateImage();
}

// 이전 이미지로
function showPreviousImage() {
  currentIndex = (currentIndex - 1 + totalItems) % totalItems;
  updateImage();
}

// 이미지 표시 함수
function updateImage() {
  imageElement.src = images[currentIndex];
}
