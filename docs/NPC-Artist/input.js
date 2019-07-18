// movement functions
function keyIn(){
	let moveSpeed = 1.5;
	let moving = false;
	if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
		player.move(-moveSpeed, 0);
		moving = true;
  	} if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    	player.move(moveSpeed, 0);
    	moving = true;
  	} if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    	player.move(0,moveSpeed);
    	moving = true;
  	} if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    	player.move(0,-moveSpeed);
    	moving = true;
  	}
  	if(!moving){player.stop()}
}

function keyPressed(){
	if (keyIsDown(32)){
  		// spacebar
  		// draw dialog box
  		if(distance(player.x, player.y, npc.x, npc.y) < 200 && dialogBox.visable == false){
  		  dialogBox.visable = true;	
  		  dialogBox.setPrompt("Hello, my name is Bob. would you like to hear my song? (y/n)");	
  		  dialogBox.displayPrompt();
  		}
  	}
  	if (keyIsDown(89)){
  		// y
  		if(dialogBox.visable && dialogBox.mode == "dialog"){
  			dialogBox.setSong(npc.sing());
  			dialogBox.displayMusic();
  			dialogBox.playSong();
  		}
  	}
  	if (keyIsDown(78)){
  		// n
  		dialogBox.visable = false;
  	}
}

