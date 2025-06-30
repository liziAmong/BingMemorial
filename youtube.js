const videoIds = [
  "TkzT-8xNaP8"
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
