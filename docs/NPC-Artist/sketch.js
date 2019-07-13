// initialize global varibles
let canvas = null;
let groundLevel = null;

function setup() {
  let div = document.getElementById("content");
  // enable webGL mode
  canvas = createCanvas(800, 600);
  canvas.parent(div);

  groundLevel = floor(height/2);
  
  //set drawing style
  noStroke();
  frameRate(60);
}

function draw(){
  // draw background
  background("#FF7F2A");
  
  // draw floating island
  drawIsland();
}

function drawIsland(){
  fill("#573b0c"); // brown dirt
  beginShape();
  vertex(20        , groundLevel);
  vertex(width/6, 5.5*groundLevel/4);
  vertex(width/3, 3*groundLevel/2);
  vertex(2*width/3, 3*groundLevel/2);
  vertex(5*width/6, 5.5*groundLevel/4);
  vertex(width - 20, groundLevel);
  endShape(CLOSE);
  fill("#77dd77"); // green grass
  beginShape();
  vertex(20        , groundLevel);
  vertex(width/6, 6*groundLevel/5);
  vertex(width/3, 5*groundLevel/4);
  vertex(2*width/3, 5*groundLevel/4);
  vertex(5*width/6, 6*groundLevel/5);
  vertex(width - 20, groundLevel);
  vertex(5*width/6, 4*groundLevel/5);
  vertex(2*width/3, 3*groundLevel/4);
  vertex(width/3, 3*groundLevel/4);
  vertex(width/6, 4*groundLevel/5);
  endShape(CLOSE);
}