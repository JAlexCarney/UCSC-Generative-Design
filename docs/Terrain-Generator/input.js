class InputHandler {
	constructor(){
		this.widthSlider = document.getElementById("widthSlider");
		this.amplitudeSlider = document.getElementById("amplitudeSlider");
		this.scaleSlider = document.getElementById("scaleSlider");
		this.seedSlider = document.getElementById("seedSlider");

		this.width = this.widthSlider.value;
		this.amplitude = this.amplitudeSlider.value;
		this.scale = this.scaleSlider.value;
		this.seed = this.seedSlider.value;

		this.widthSlider.onchange = 
		function(){
			userIn.setWidth();
		}
		this.amplitudeSlider.onchange = 
		function(){
			userIn.setAmplitude();
		}
		this.scaleSlider.onchange = 
		function(){
			userIn.setScale();
		}
		this.seedSlider.onchange =
		function(){
			userIn.setSeed();
		}
	}

	setWidth(){
		this.width = this.widthSlider.value;
		worldGen.getInput();
	}

	setScale(){
		this.scale = this.scaleSlider.value;
		worldGen.getInput();
	}

	setAmplitude(){
		this.amplitude = this.amplitudeSlider.value;
		worldGen.getInput();
	}

	setSeed(){
		this.seed = this.seedSlider.value;
		worldGen.getInput();
	}
}

// movement functions
function keyIn(){
	let MoveSpeed = 10;
	if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    	playerCam.move(-MoveSpeed,0,0);
  	} if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    	playerCam.move(MoveSpeed,0,0);
  	} if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    	playerCam.move(0,0,MoveSpeed);
  	} if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    	playerCam.move(0,0,-MoveSpeed);
  	}
}


let mouseDown = false;
let oldX = null;
let oldY = null;
function mousePressed() {
  mouseDown = true;
  oldX = mouseX;
  oldY = mouseY;
}

function mouseDragged() {
  if (mouseDown) {
    xOff = mouseX - oldX;
    yOff = mouseY - oldY;
  	
    //pan(xOff);
    playerCam.pan(-1*xOff/100);
    //tilt(yOff);
    playerCam.tilt(yOff/100);

  	oldX = mouseX;
  	oldY = mouseY;
  }
}

function mouseReleased() {
  mouseDown = false;
}

// Button functions
function generate() {
  // clear current world
  clear();
  // draw background
  background("#FF7F2A");
  // generate sample world
  worldGen.generate();
  worldGen.draw();
  
  console.log("generated");
}

function resetView() {
  // reset camera
  exploring = false;
  worldCam.camera(canvasSize/2, canvasSize/2, 1.5 * canvasSize, canvasSize/2, canvasSize/2, 0, 0, 1, 0);
  setCamera(worldCam);
  worldCam.perspective();
  background("#FF7F2A");
  worldGen.draw();
}

function enableExplore(){
  // set explore view
  exploring = true;
  setCamera(playerCam);
  playerCam.perspective(PI/3.0, width/height, 1, 1000);
}

//dollyOld(dir){
//		var delta = this.atVec.mul(this.speed);
//		this.eye = this.eye.add(delta.mul(dir));
//		this.center = this.center.add(delta.mul(dir));
//		this.updateView();
//}

//truckOld(dir){
//	var delta = this.atVec.cross(this.up).mul(this.speed);
//	this.eye = this.eye.add(delta.mul(dir));
//	this.center = this.center.add(delta.mul(dir));
//	this.updateView();
//}

// Rotations
//tilt(dir){
//	var axis = this.atVec.cross(this.up).mul(this.speed);
//	var tiltStep = new Matrix4().setRotate(this.angularSpeed * dir, axis.elements[0], axis.elements[1], axis.elements[2]);
//	this.atVec = tiltStep.multiplyVector3(this.atVec);
//	this.center = this.eye.add(this.atVec);
//	this.updateView();
//	}
//
//pan(dir){
//	var horizontal = this.atVec.cross(this.up)
//	var axis = this.atVec.cross(horizontal).normalize();
//	var panStep = new Matrix4().setRotate(this.angularSpeed * -1 * dir, axis.elements[0], axis.elements[1], axis.elements[2]);
//	this.atVec = panStep.multiplyVector3(this.atVec);
//	this.center = this.eye.add(this.atVec);
//	this.updateView();
//}