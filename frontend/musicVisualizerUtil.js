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
  analyser.fftSize = 2048; // size of audio data chunks
  let bufferLength = analyser.fftSize;
  let dataArray = new Uint8Array(bufferLength); // ? look it up

  // Canvas Init
  const canvas = document.getElementById('musicVisualizer');
  let ctx = canvas.getContext('2d');
  let WIDTH = canvas.width;
  let HEIGHT = canvas.height;
  console.log('CANVAS DIMENSIONS: WIDTH', WIDTH, '| HEIGHT:', HEIGHT);
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // Create Audio Element
  let audioElement = createAudioElement(soundFile);

  // Visualizers
  const drawSineVis = () => {
    // Draw next frame
    requestAnimationFrame(drawSineVis);
    
    // Update DataArray with values from track
    analyser.getByteTimeDomainData(dataArray);
  
    // Background Box
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  
    // Style for Sine wave
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgb(0, 0, 0)';
  
    // Start drawing sine wave
    ctx.beginPath();
  
    let sliceWidth = WIDTH * 1.0 / bufferLength; // divides drawable canvas space
    let x = 0; // start of sine of wave
  
    // draw data points for sine wave across canvas's slicewidths
    for (let i = 0; i < bufferLength; i++) {
      let v = dataArray[i] / 128.0; // 128 is x16 of fftSize -- related to amplitude
      let y = v * HEIGHT / 2;
  
      if (i === 0 ) {
        ctx.moveTo(x, y); // init line position
      } else {
        ctx.lineTo(x, y); // continue to plot next chunk       
      }
  
      x += sliceWidth; // increment to next canvas chunk
    }
  
    ctx.lineTo(WIDTH, HEIGHT / 2); // end sinewave at middle
    ctx.stroke(); // draw the line
  };
  

  // Wait for track to load
  window.addEventListener('load', (e) => {
    let audioSource = audioCtx.createMediaElementSource(audioElement);
    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);

    drawSineVis();
  }, false);
};

export default init;