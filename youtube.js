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

// localStorage에서 저장된 인덱스 불러오기
const savedIndex = parseInt(localStorage.getItem("ytCurrentIndex"));
let currentIndex;
if (!isNaN(savedIndex) && savedIndex >= 0 && savedIndex < videoIds.length) {
  currentIndex = savedIndex;
} else {
  currentIndex = 0;
}

let player;
let autoplayEnabled = true;
let randomEnabled = false;
let isEventListenerAdded = false;

function updateVideoInfo() {
  document.getElementById("video-order").textContent = `영상 ${currentIndex + 1} / ${videoIds.length}`;
  document.getElementById("video-date").textContent = `업로드 날짜: ${videoDates[currentIndex]}`;
}

function loadVideo(index) {
  if (player && typeof player.loadVideoById === "function") {
    player.loadVideoById(videoIds[index]);
    // 재생 전 음소거 → 음소거 해제 (autoplay 정책 대응)
    player.mute();
    player.unMute();

    updateVideoInfo();

    // 현재 인덱스 저장 (새로고침/복귀 시 유지)
    localStorage.setItem("ytCurrentIndex", index);
  }
}

// YouTube iframe API가 준비되면 호출되는 함수 (전역에 꼭 있어야 함)
window.onYouTubeIframeAPIReady = function () {
  player = new YT.Player('youtube-player', {
    height: '360',
    width: '640',
    videoId: videoIds[currentIndex],
    playerVars: {
      autoplay: 1,
      mute: 1 // 최초 음소거 상태로 시작
    },
    events: {
      'onReady': (event) => {
        event.target.unMute(); // 음소거 해제
        onPlayerReady();
      },
      'onStateChange': onPlayerStateChange
    }
  });
};

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

// 새로고침 방지 (선택사항)
window.addEventListener("keydown", function (e) {
  if (e.key === "F5" || (e.ctrlKey && e.key.toLowerCase() === "r")) {
    e.preventDefault();
  }
});
