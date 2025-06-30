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

let currentIndex = 0;
let player;

// ✅ 영상 순서 및 날짜 정보 업데이트
function updateVideoInfo() {
  document.getElementById("video-order").textContent = `영상 ${currentIndex + 1} / ${videoIds.length}`;
  // 여기서 날짜 정보도 추가로 처리하고 싶다면 videoIds와 함께 날짜 배열을 만들 수도 있어요
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
  updateVideoInfo(); // 초기 표시

  document.getElementById("prev-video").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + videoIds.length) % videoIds.length;
    player.loadVideoById(videoIds[currentIndex]);
    updateVideoInfo(); // 변경 후 표시
  });

  document.getElementById("next-video").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % videoIds.length;
    player.loadVideoById(videoIds[currentIndex]);
    updateVideoInfo(); // 변경 후 표시
  });
}
