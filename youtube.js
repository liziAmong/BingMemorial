const videoIds = [
  "TkzT-8xNaP8", //너에게 닿기를
  "G33eHNor1Kc", //자코자코
  "48tTGn9QNHA", // 바니
  "Ydvct6uheHI", //소원을말해봐 
  "uI53kboOem0", //디토 
  "pSXa7732k4U",//써머타임 
  "NCO8v89pNDs",//비비디
  "aMv1jbqdHY4",//연예서쿨레이션
  "NCWwaBDlMnE",//로리신 
  "n1ly5P-DTEU",//디스코
  "NZK5wT7rq7E",//아이아이
  "wFa87J4vfik",//기상야자
  "JRttCcjxzQY",//데몬로드
  "ytHiCavTqKQ",//사인은B
  "9mNDxlE3lbA",//아이돌
];

let currentIndex = 0;
let player;

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
  document.getElementById("prev-video").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + videoIds.length) % videoIds.length;
    player.loadVideoById(videoIds[currentIndex]);
  });

  document.getElementById("next-video").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % videoIds.length;
    player.loadVideoById(videoIds[currentIndex]);
  });
}
