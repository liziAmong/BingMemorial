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

let currentIndex = 0;
let player;
let autoplayEnabled = true;
let randomEnabled = false;

function updateVideoInfo() {
  document.getElementById("video-order").textContent = `영상 ${currentIndex + 1} / ${videoIds.length}`;
  document.getElementById("video-date").textContent = `업로드 날짜: ${videoDates[currentIndex]}`;
}

function loadVideo(index) {
  player.loadVideoById(videoIds[index]);
  updateVideoInfo();
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtube-player', {
    height: '360',
    width: '640',
    videoId: videoIds[currentIndex],
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange  // ✅ 추가됨
    }
  });
}

function onPlayerReady() {
  updateVideoInfo();

  document.getElementById("prev-video").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + videoIds.length) % videoIds.length;
    loadVideo(currentIndex);
  });

  document.getElementById("next-video").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % videoIds.length;
    loadVideo(currentIndex);
  });

  const autoplayBtn = document.getElementById("toggle-autoplay");
  const randomBtn = document.getElementById("toggle-random");

  // ✅ 중복 없이 딱 한 번만 등록
  autoplayBtn.addEventListener("click", () => {
    autoplayEnabled = !autoplayEnabled;
    autoplayBtn.textContent = `⏯ 자동재생: ${autoplayEnabled ? '켜짐' : '꺼짐'}`;
    autoplayBtn.className = `toggle-btn ${autoplayEnabled ? 'on' : 'off'}`;
  });

  randomBtn.addEventListener("click", () => {
    randomEnabled = !randomEnabled;
    randomBtn.textContent = `🔀 랜덤재생: ${randomEnabled ? '켜짐' : '꺼짐'}`;
    randomBtn.className = `toggle-btn ${randomEnabled ? 'on' : 'off'}`;
  });
}

// ✅ 영상이 끝났을 때 다음 영상 처리
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED && autoplayEnabled) {
    if (randomEnabled) {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * videoIds.length);
      } while (nextIndex === currentIndex); // 현재 영상 제외
      currentIndex = nextIndex;
    } else {
      currentIndex = (currentIndex + 1) % videoIds.length;
    }
    loadVideo(currentIndex);
  }
}
