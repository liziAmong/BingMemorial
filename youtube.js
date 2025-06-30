const videoIds = [
  "TkzT-8xNaP8", // 너에게 닿기를
  "G33eHNor1Kc", // 자코자코
  "48tTGn9QNHA", // 바니
  "Ydvct6uheHI", // 소원을말해봐 
  "uI53kboOem0", // 디토 
  "pSXa7732k4U", // 써머타임 
  "NCO8v89pNDs", // 비비디
  "aMv1jbqdHY4", // 연예서쿨레이션
  "NCWwaBDlMnE", // 로리신 
  "n1ly5P-DTEU", // 디스코
  "NZK5wT7rq7E", // 아이아이
  "wFa87J4vfik", // 기상야자
  "JRttCcjxzQY", // 데몬로드
  "ytHiCavTqKQ", // 사인은B
  "9mNDxlE3lbA", // 아이돌
];

const videoDates = [
  "2025-06-21", // 너에게 닿기를
  "2025-04-27", // 자코자코
  "2025-03-14", // 바니
  "2024-12-21", // 소원을말해봐 
  "2024-10-13", // 디토 
  "2024-09-01", // 써머타임 
  "2024-05-04", // 비비디
  "2024-02-12", // 연예서쿨레이션
  "2023-11-15", // 로리신 
  "2023-10-22", // 디스코
  "2023-09-02", // 아이아이
  "2023-07-30", // 기상야자
  "2023-07-16", // 데몬로드
  "2023-05-13", // 사인은B
  "2023-05-01", // 아이돌
];
let currentIndex = 0;
let player;

// ✅ 영상 순서 및 날짜 정보 업데이트
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
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  updateVideoInfo();

  document.getElementById("prev-video").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + videoIds.length) % videoIds.length;
    player.loadVideoById(videoIds[currentIndex]);
    updateVideoInfo();
  });

  document.getElementById("next-video").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % videoIds.length;
    player.loadVideoById(videoIds[currentIndex]);
    updateVideoInfo();
  });
}

// ✅ 영상이 끝났을 때 다음 영상 자동 재생
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    currentIndex = (currentIndex + 1) % videoIds.length;
    loadVideo(currentIndex);
  }
}
