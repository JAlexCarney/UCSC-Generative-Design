// initialize global varibles
let GenerateButton = null;
let worldGen = null;
let userIn = null;
let canvasSize = 600;

function setup() {
  let div = document.getElementById("content");
  // enable webGL mode
  let canvas = createCanvas(canvasSize, canvasSize, WEBGL);
  canvas.parent(div);
  
  //set drawing style
  noStroke();
  frameRate(60);

  // Get html elements
  GenerateButton = document.getElementById("generateButton");
  
  // make input handler
  userIn = new InputHandler();

  // create world generator
  worldGen = new WorldGenerator();

  // draw background
  background("#FF7F2A");

  // create camera
  camera(width/2, height/2, (height/1.5) / tan(PI*30.0 / 180.0), width/2, height/2, 0, 0, 1, 0);
  perspective();

  //create light
  ambientLight(100, 100, 100);
  directionalLight(150, 150, 150, 0, 0.1, -1);

  // generate sample world
  worldGen.generate();
}

// Input Handling
function generate() {
  // clear current world
  clear();
  // draw background
  background("#FF7F2A");
  // generate sample world
  worldGen.generate();
  
  console.log("generated");
}
