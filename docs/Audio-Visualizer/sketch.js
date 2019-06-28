let particleSystem = null;
let worldH = 700;
let worldW = 700;

function setup() {
  let div = document.getElementById("content");
  let canvas = createCanvas(worldW, worldW);
  canvas.parent(div);
  noStroke();
  
  // create particle system
  let pos = createVector(worldW/2, worldH/2);
  particleSystem = new ParticleSystem(pos, 30);
}

function draw() {
	background("#facade");
	
  particleSystem.update();
  particleSystem.draw();

  let emitChance = 0.2;

  if(Math.random() < emitChance){
    particleSystem.emit();
  }
}