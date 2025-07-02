let currentAudio;

// 볼륨 컨트롤 요소 생성
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

volumeSlider.addEventListener('input', () => {
  if (currentAudio) {
    currentAudio.volume = parseFloat(volumeSlider.value);
  }
});
