const createAudioElement = (audioSource) => {
  let audio = new Audio();
  audio.src = audioSource;
  audio.controls = true;
  audio.autoplay = false;
  document.getElementById('audioPlayer').appendChild(audio);

  return audio;
};

const init = (soundFile) => {
  const canvas = document.getElementById('musicVisualizer');
  let drawVisual;
  let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let ctx = canvas.getContext('2d');
  let analyser = audioCtx.createAnalyser();

  let audioElement = createAudioElement(soundFile);

  window.addEventListener('load', (e) => {
    let audioSource = audioCtx.createMediaElementSource(audioElement);
    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);
  }, false);
};

export default init;