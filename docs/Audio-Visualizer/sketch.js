let particleSystem = null;
let worldH = 600;
let worldW = 600;
let Demo = null;
let fft = null;
let amplitude = null;
let DemoButton = null;
let VolumeSlider = null;
let volume = 0.5;

function preload() {
  soundFormats('mp3', 'ogg');
  Demo = loadSound('Acoustic_Symphony.mp3');
}

function volumeChange(){
  volume = volumeSlider.value * 0.01;
  Demo.setVolume(volume);
}

function demo() {
  if (Demo.isPlaying() ){
    Demo.stop();
    DemoButton.innerHTML = "Play Demo Audio";
  } else {
    Demo.play();
    DemoButton.innerHTML = "Stop Demo Audio";
  }
}

function setup() {
  let div = document.getElementById("content");
  let canvas = createCanvas(worldW, worldW);
  canvas.parent(div);
  
  //set drawing style
  noStroke();
  colorMode(HSB, 1);
  frameRate(30);

  Demo.setVolume(volume);
  amplitude = new p5.Amplitude();
  fft = new p5.FFT();

  //find demo button
  DemoButton = document.getElementById("demoButton");
  //find volume slider
  VolumeSlider = document.getElementById("volumeSlider");
  
  // create particle system
  let pos = createVector(worldW/2, worldH/2);
  particleSystem = new ParticleSystem(pos, 40);
}

function draw() {
	background("#FF7F2A");
  fill("#E9AFAF");
  circle(worldW/2, worldH/2, worldW);

  // set emit chance based on volume of audio.
  let emitChance = (amplitude.getLevel() * (1/volume))**2;
  
  // show the volume with an inner circle
  fill("#FACADE");
  circle(worldW/2, worldH/2, worldW * amplitude.getLevel() * (1/volume));

  // set particle saturation and value based on pitch.
  // find highest audible pitch
  let pitchArray = fft.analyze();
  let indexOfMax = 0;
  for(let i = 0; i < pitchArray.length; i++){
    if(pitchArray[i] > 100){
      indexOfMax = i;
    }
  }
  let intensity = (indexOfMax/pitchArray.length);

  for(let i = 0; i < 5; i++){
    if(Math.random() < emitChance){
      particleSystem.emit(intensity);
    }
  }

  particleSystem.update();
  particleSystem.draw();
}