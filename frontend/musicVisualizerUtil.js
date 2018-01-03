const createAudioElement = (audioSource) => {
  let audio = new Audio();
  audio.src = audioSource;
  audio.controls = true;
  audio.autoplay = false;
  document.getElementById('audioPlayer').appendChild(audio);

  return audio;
};

const max255Scale = (num) => {
  let scale = num / 100;
  let newVal = 255 - (scale * 255);
  if (newVal > 255) {
    newVal = 255;
  }
  return newVal;
};

const init = (soundFile) => {
  // Web Audio Init
  let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048; // Fast Fourier Transform
  let bufferLength = analyser.fftSize;
  let dataArray = new Uint8Array(bufferLength); // ? look it up

  let bufferLengthF = analyser.frequencyBinCount;
  let dataArrayF = new Uint8Array(bufferLengthF);

  // Canvas Init
  const canvas = document.getElementById('musicVisualizer');
  let ctx = canvas.getContext('2d');
  let WIDTH = canvas.width;
  let HEIGHT = canvas.height;
  console.log('CANVAS DIMENSIONS (Sine Graph): WIDTH', WIDTH, '| HEIGHT:', HEIGHT);
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  const canvasFreqGraph = document.getElementById('musicVisualizerFreq');
  let ctxf = canvasFreqGraph.getContext('2d');
  let WIDTH_F = canvasFreqGraph.width;
  let HEIGHT_F = canvasFreqGraph.height;
  ctxf.clearRect(0, 0, WIDTH_F, HEIGHT_F);
  console.log('CANVAS DIMENSIONS (Freq Graph): WIDTH', WIDTH_F, '| HEIGHT:', HEIGHT_F);
  
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
    ctx.lineWidth = 1; // width of line
    ctx.strokeStyle = 'rgb(0, 0, 0)'; // color of line
  
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
  
  const drawFreq = () => {
    requestAnimationFrame(drawFreq);

    analyser.getByteFrequencyData(dataArrayF);

    // Background box
    ctxf.fillStyle = 'rgb(255, 255, 255)';
    ctxf.fillRect(0, 0, WIDTH_F, HEIGHT_F);

    let sliceWidth = (WIDTH_F / bufferLengthF) * 1.6;
    let x = 0;

    for (let i = 0; i < dataArrayF.length; i++) {
      let barHeight = dataArrayF[i] - 70;
      // let colorVal = max255Scale(barHeight);
      let colorVal = 0;
      ctxf.fillStyle = `rgb(${colorVal}, ${colorVal}, ${colorVal})`;
      ctxf.fillRect(x, HEIGHT_F-barHeight/2, sliceWidth, barHeight/2);
      x += sliceWidth;
    }
  };

  // Wait for track to load
  window.addEventListener('load', (e) => {
    let audioSource = audioCtx.createMediaElementSource(audioElement);
    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);

    drawSineVis();
    drawFreq();
  }, false);
};

export default init;