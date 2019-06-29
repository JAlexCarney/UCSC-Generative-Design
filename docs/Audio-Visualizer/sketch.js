let particleSystem = null;
let worldH = 700;
let worldW = 700;
let Demo = null;
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
  noStroke();

  Demo.setVolume(volume);
  amplitude = new p5.Amplitude();

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

  particleSystem.update();
  particleSystem.draw();

  // set emit chance based on volume of audio.
  let emitChance = (amplitude.getLevel()**2) * (1/volume);

  for(let i = 0; i < 5; i++){
    if(Math.random() < emitChance){
      particleSystem.emit();
    }
  }
}