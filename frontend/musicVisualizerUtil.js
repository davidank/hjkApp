const createAudioElement = (audioSource) => {
  let audio = new Audio();
  audio.src = audioSource;
  audio.controls = true;
  audio.autoplay = false;
  document.getElementById('audioPlayer').appendChild(audio);

  return audio;
};

const init = (soundFile) => {
  // Web Audio Init
  let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048;
  let bufferLength = analyser.fftSize;
  let dataArray = new Uint8Array(bufferLength);

  // Canvas Init
  const canvas = document.getElementById('musicVisualizer');
  // let drawVisual;
  let ctx = canvas.getContext('2d');
  let WIDTH = canvas.width;
  let HEIGHT = canvas.height;
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // Create Audio Element
  let audioElement = createAudioElement(soundFile);

  // Visualizer on Canvas
  const draw = () => {
    requestAnimationFrame(draw);
  
    analyser.getByteTimeDomainData(dataArray);
  
    ctx.fillStyle = 'rgb(200, 200, 200)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgb(0, 0, 0)';
  
    ctx.beginPath();
  
    let sliceWidth = WIDTH * 1.0 / bufferLength;
    let x = 0;
  
    for (let i = 0; i < bufferLength; i++) {
      let v = dataArray[i] / 128.0;
      let y = v * HEIGHT / 2;
  
      if (i === 0 ) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
  
      x += sliceWidth;
    }
  
    ctx.lineTo(WIDTH, HEIGHT / 2);
    ctx.stroke();
  };
  

  // Wait for track to load
  window.addEventListener('load', (e) => {
    let audioSource = audioCtx.createMediaElementSource(audioElement);
    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);

    draw();
  }, false);
};

export default init;