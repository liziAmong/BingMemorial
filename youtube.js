// youtube.js

const videoIds = [
  "TkzT-8xNaP8", "G33eHNor1Kc", "48tTGn9QNHA", "Ydvct6uheHI",
  "uI53kboOem0", "pSXa7732k4U", "NCO8v89pNDs", "aMv1jbqdHY4",
  "NCWwaBDlMnE", "n1ly5P-DTEU", "NZK5wT7rq7E", "wFa87J4vfik",
  "JRttCcjxzQY", "ytHiCavTqKQ", "9mNDxlE3lbA"
];

const videoDates = [
  "2025-06-21", "2025-04-27", "2025-03-14", "2024-12-21",
  "2024-10-13", "2024-09-01", "2024-05-04", "2024-02-12",
  "2023-11-15", "2023-10-22", "2023-09-02", "2023-07-30",
  "2023-07-16", "2023-05-13", "2023-05-01"
];

const bgColors = [
  "#a8d0ff",  // 연한 하늘
  "#f9c5d1",  // 연한 핑크
  "#6e6e6e",  // 검은 회색
  "#2a2a2a",  // 검은색
  "#ffad60",  // 노을색
  "#76c7c0",  // 바다색
  "#fbe992",  // 빛나는 황금색
  "#f8a5c2",  // 핑크색
  "#7d5ba6",  // 검은 보라색
  "linear-gradient(135deg, #a8d0ff 0%, #f9c5d1 100%)", // 핑크 하늘 그라데이션
  "#1e213a",  // 밤 도시 색
  "#f9e79f",  // 노란색
  "#6d295b",  // 검정 핑크색
  "#f8d7da",  // 핑크 하늘 하양색
  "#e3f2fd"   // 핑크 하늘 하양색
];

let currentIndex = 0;
let player = null;
let autoplayEnabled = true;
let randomEnabled = false;
let isEventListenerAdded = false;

function createPlayer() {
  if (player) {
    player.destroy();
    player = null;
  }
  player = new YT.Player('youtube-player', {
    height: '360',
    width: '640',
    videoId: videoIds[currentIndex],
    playerVars: {
      autoplay: 1,
      mute: 1
    },
    events: {
      'onReady': (event) => {
        event.target.unMute();
        onPlayerReady();
      },
      'onStateChange': onPlayerStateChange
    }
  });
}

window.onYouTubeIframeAPIReady = function () {
  createPlayer();
};

document.addEventListener('DOMContentLoaded', () => {
  const savedIndex = parseInt(localStorage.getItem("ytCurrentIndex"));
  if (!isNaN(savedIndex) && savedIndex >= 0 && savedIndex < videoIds.length) {
    currentIndex = savedIndex;
  }

  if (window.YT && YT.Player) {
    createPlayer();
  }
});

function updateVideoInfo() {
  document.getElementById("video-order").textContent = `영상 ${currentIndex + 1} / ${videoIds.length}`;
  document.getElementById("video-date").textContent = `업로드 날짜: ${videoDates[currentIndex]}`;

  const color = bgColors[currentIndex];
  document.body.style.background = color; // 무조건 background만 설정
}

function loadVideo(index) {
  if (player && typeof player.loadVideoById === "function") {
    currentIndex = index;
    player.loadVideoById(videoIds[index]);
    player.mute();
    player.unMute();
    updateVideoInfo();
    localStorage.setItem("ytCurrentIndex", index);
  }
}

function onPlayerReady() {
  updateVideoInfo();

  if (isEventListenerAdded) return;
  isEventListenerAdded = true;

  document.getElementById("prev-video").addEventListener("click", () => {
    currentIndex = randomEnabled
      ? getRandomIndex(currentIndex)
      : (currentIndex - 1 + videoIds.length) % videoIds.length;
    loadVideo(currentIndex);
  });

  document.getElementById("next-video").addEventListener("click", () => {
    currentIndex = randomEnabled
      ? getRandomIndex(currentIndex)
      : (currentIndex + 1) % videoIds.length;
    loadVideo(currentIndex);
  });

  document.getElementById("toggle-autoplay").addEventListener("click", (e) => {
    autoplayEnabled = !autoplayEnabled;
    e.target.textContent = `⏯ 자동재생: ${autoplayEnabled ? '켜짐' : '꺼짐'}`;
    e.target.className = `toggle-btn ${autoplayEnabled ? 'on' : 'off'}`;
  });

  document.getElementById("toggle-random").addEventListener("click", (e) => {
    randomEnabled = !randomEnabled;
    e.target.textContent = `🔀 랜덤재생: ${randomEnabled ? '켜짐' : '꺼짐'}`;
    e.target.className = `toggle-btn ${randomEnabled ? 'on' : 'off'}`;
  });
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED && autoplayEnabled) {
    currentIndex = randomEnabled
      ? getRandomIndex(currentIndex)
      : (currentIndex + 1) % videoIds.length;
    loadVideo(currentIndex);
  }
}

function getRandomIndex(current) {
  let index;
  do {
    index = Math.floor(Math.random() * videoIds.length);
  } while (index === current);
  return index;
}

window.addEventListener("keydown", function (e) {
  if (e.key === "F5" || (e.ctrlKey && e.key.toLowerCase() === "r")) {
    e.preventDefault();
  }
});
