// initialize global varibles
let canvas = null;
let groundLevel = null;
let npc = null;
let player = null;
let dialogBox = null;

function setup() {
  let div = document.getElementById("content");
  // enable webGL mode
  canvas = createCanvas(800, 600);
  canvas.parent(div);

  // set ground level
  groundLevel = floor(height/2);
  
  // create NPC
  npc = new NPC(120, groundLevel - 75, 50, "yellow");

  // create dialog box
  dialogBox = new DialogBox(width/2, height/8, 7*width/8, height/4);

  // create Player
  player = new Player(width - 120, groundLevel - 75, 50, "pink");

  //set drawing style
  noStroke();
  frameRate(60);
}

function draw(){
  // draw background
  background("#FF7F2A");
  fill("lightblue");
  ellipse(width/2, height/2, width, height);

  // draw floating island
  drawIsland();

  // get input
  keyIn();

  if(player.y > npc.y)
  { 
    // draw NPC
    npc.draw();
    // draw Player
    player.draw();
  }else{
    // draw Player
    player.draw();
    // draw NPC
    npc.draw();
  }

  // draw dialog box
  dialogBox.draw();

}

function distance(x1, y1, x2, y2){
  return sqrt(pow(x2-x1, 2) + pow(y2-y1, 2));
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

function drawBird(x, y, size, color, direction) {
  push();
  translate(x, y);

  if(direction == "left"){
    scale(-1, 1);
  }

  // legs beak and eye
  fill("#FF7F2A");
  triangle(0, 0, size, 0, 0, size);
  rect(size/2, size, size/4, size/2);
  rect(-3*size/4, size, size/4, size/2);

  // body
  fill(color);
  triangle(0, -size, -size, size, size, size);

  // eye
  fill("#FF7F2A");
  circle(0, -size/4, size/8);

  pop();
}