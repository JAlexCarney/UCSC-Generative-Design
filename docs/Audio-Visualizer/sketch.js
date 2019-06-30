// initialize global varibles
  // particle system that emits birds from the center of the canvas
let particleSystem = null;
  // canvas demesions in pixels
let worldH = 600;
let worldW = 600;
  // demo audio : acustic orcistra (free use youtube library)
let Demo = null;
  // Mic input object
let micIn = null;
  // fast fourier transform use to get current pitch
let fft = null;
  // amplitude object used to 
let amplitude = null;
  // html elements
let DemoButton = null;
let VolumeSlider = null;
let MicButton = null;
let SensitivitySlider = null;
  // misc.
let volume = 0.5;
let sensitivity = 50;
let usingMic = false;

function preload() {
  soundFormats('mp3', 'ogg');
  Demo = loadSound('Acoustic_Symphony.mp3');
}

function setup() {
  let div = document.getElementById("content");
  let canvas = createCanvas(worldW, worldW);
  canvas.parent(div);
  
  //set drawing style
  noStroke();
  colorMode(HSB, 1);
  frameRate(30);

  // initialize audio objects
  Demo.setVolume(volume);
  fft = new p5.FFT();
  micIn = new p5.AudioIn();

    // Get html elements
  //find demo button
  DemoButton = document.getElementById("demoButton");
  //find volume slider
  VolumeSlider = document.getElementById("volumeSlider");
  //find mic button
  MicButton = document.getElementById("micButton");
  //find mic sensitivity slider
  SensitivitySlider = document.getElementById("sensitivitySlider");

  // create particle system
  let pos = createVector(worldW/2, worldH/2);
  particleSystem = new ParticleSystem(pos, 40);
}

function draw() {
	
  // draw background
  background("#FF7F2A");
  fill("#E9AFAF");
  circle(worldW/2, worldH/2, worldW);

  //change button when demo audio ends
  if(!Demo.isPlaying() && DemoButton.innerHTML == "Stop Demo Audio"){
    DemoButton.innerHTML = "Play Demo Audio";
  }

  let intensity = 0;
  let emitChance = 0;
  if(!usingMic && Demo.isPlaying()){
    // set emit chance based on volume of audio.
    // squared so that quite moments have much less particles than lound moments
    emitChance = (amplitude.getLevel() * (1/volume))**2;

    // show the current volume/emitChance with an inner circle
    fill("#FACADE");
    circle(worldW/2, worldH/2, worldW * amplitude.getLevel() * (1/volume));

      // set particle intensity (color saturation and value) based on highest pitch.
    // find highest audible pitch relative to selected volume
    let pitchArray = fft.analyze();
    let indexOfMax = 0;
    for(let i = 0; i < pitchArray.length; i++){
      if(pitchArray[i] > 100*volume){
        indexOfMax = i;
      }
    }
    intensity = (indexOfMax/pitchArray.length);
    console.log("I = " + intensity + ", EC = " + emitChance + " , Using Demo input");
  }else if(usingMic){
    let vol = micIn.getLevel() * sensitivity;
    if(vol > 1){vol = 1;}

    // set emit chance based on volume of mic input.
    // squared so that quite moments have much less particles than lound moments
    emitChance = (vol)**2;

    // show the current mic input with an inner circle
    fill("#FACADE");
    circle(worldW/2, worldH/2, worldW * vol);

      // set particle intensity (color saturation and value) based on highest pitch.
    // find highest audible pitch relative to selected volume
    let pitchArray = fft.analyze();
    let indexOfMax = 0;
    let max = 500;
    for(let i = 0; i < max; i++){
      if(pitchArray[i] > 1){
        indexOfMax = i;
      }
    }
    intensity = (indexOfMax/max);
    console.log("I = " + intensity + ", EC = " + emitChance + " , Using mic input");
  }
  // randomly emit up to 5 particles with the given intensity
  for(let i = 0; i < 5; i++){
    if(Math.random() < emitChance){
      particleSystem.emit(intensity);
    }
  }

  // apply transformations and render particles in the particle system
  particleSystem.update();
  particleSystem.draw();
}


// Input Handling
function volumeChange(){
  volume = volumeSlider.value * 0.01;
  Demo.setVolume(volume);
}

function sensitivityChange(){
  sensitivity = SensitivitySlider.value;
}

function demo() {
  if(!usingMic){
    if (Demo.isPlaying() ){
      Demo.stop();
      DemoButton.innerHTML = "Play Demo Audio";
    } else {
      Demo.play();
      DemoButton.innerHTML = "Stop Demo Audio";
      usingMic = false;
      // reset amplitude and fft
      amplitude = new p5.Amplitude();
      fft = new p5.FFT();
    }
  }
}

function useMic() {
  usingMic = !usingMic;
  if(usingMic){
    MicButton.innerHTML = "Stop Using Microphone";
    DemoButton.innerHTML = "Demo Disabled By Mic";
    Demo.stop();
    micIn.start();
    fft.setInput(micIn);
  }else {
    MicButton.innerHTML = "Use defualt Microphone";
    DemoButton.innerHTML = "Play Demo Audio";
    micIn.stop();
  }
}
