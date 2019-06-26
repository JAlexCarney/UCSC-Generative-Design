
function setup() {
  createCanvas(700, 700);
  background("#facade");
  noStroke();
  frameRate(30);
}

function draw() {
	for(var i = 0; i < 30; i++){
		randomShape();
	}
}

function randomShape() {
	var numShapes = 4;
	var chosenShape = Math.floor(Math.random() * numShapes);
	var centerX = Math.random()*700;
	var	centerY = Math.random()*700;
	var size = Math.random()*50 + 25;

	fill(Math.random()*255,Math.random()*255,Math.random()*255);
	if(chosenShape === 0){
		square(centerX, centerY, size);
	}else if(chosenShape === 1){
		circle(centerX, centerY, size)
	}else if(chosenShape === 2){
		triangle(centerX + size, centerY + size, centerX - size, centerY + size, centerX, centerY - size);
	}else if(chosenShape === 3){
		triangle(centerX + size, centerY + size, centerX - size, centerY + size, centerX, centerY - size);
		triangle(centerX + size, centerY - size, centerX - size, centerY - size, centerX, centerY + size);	
	}
}