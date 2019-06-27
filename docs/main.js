
function setup() {
  createCanvas(700, 700);
  background("#facade");
  noStroke();
  noLoop();
  frameRate(30);
}

function draw() {
	for(var i = 0; i < 30; i++){
		randomBird();
	}
}

function randomBird(){
	var centerX = Math.random()*700;
	var	centerY = Math.random()*700;
	var size = Math.random()*50 + 25;
	var color = '#'+Math.floor(Math.random()*16777215).toString(16);

	var bird = new Bird(centerX, centerY, size, color);
	var angle = Math.random() * Math.PI * 2;
	bird.draw(angle);
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

class Bird {

	constructor(x, y, size, color){
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;
	}

	draw(angle){
		push();
		translate(this.x, this.y);
		rotate(angle);

		// legs beak and eye
		fill("orange");
		triangle(0, 0, this.size, 0, 0, this.size);
		rect(this.size/2, this.size, this.size/4, this.size/2);
		rect(-this.size/2-this.size/4, this.size, this.size/4, this.size/2);

		// body
		fill(this.color);
		triangle(0, -this.size, -this.size, this.size, this.size, this.size);

		// eye
		fill("orange");
		circle(0, -this.size/4, this.size/8);

		pop();
	}

}