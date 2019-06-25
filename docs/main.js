
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
	var numShapes = 3;
	var chosenShape = Math.floor(Math.random() * numShapes);

	fill(Math.random()*255,Math.random()*255,Math.random()*255);
	if(chosenShape === 0){
		square(Math.random()*700, Math.random()*700, Math.random()*50  + 25);
	}else if(chosenShape === 1){
		circle(Math.random()*700, Math.random()*700, Math.random()*50 + 25)
	}else if(chosenShape === 2){
		centerX = Math.random()*700;
		centerY = Math.random()*700;
		size = Math.random()*50 + 25;
		triangle(centerX + size, centerY + size, centerX - size, centerY + size, centerX, centerY - size);
	}
}