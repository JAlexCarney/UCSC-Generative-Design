class Player {
	constructor(x, y, size, color){
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;
		this.isMoving = false;
		this.frame = 0;
	}

	draw(){
		if(this.isMoving){
			if(this.frame > 15){
				drawBird(this.x, this.y, this.size, this.color, "left", "up");	
			}else {
				drawBird(this.x, this.y, this.size, this.color, "left", "down");
			}
			if(this.frame == 30){
				this.frame = 0;
			}
			this.frame++;
		}else{
			drawBird(this.x, this.y, this.size, this.color, "left", "down");
			this.frame = 0;
		}
	}

	move(hor, vert){
		let newX = this.x + hor;
		let newY = this.y + vert;
		if(this.checkBoundry(newX, newY)){
			this.x = newX;
			this.y = newY;
		}
		this.isMoving = true;
	}

	stop(){
		this.isMoving = false;
	}

	checkBoundry(x, y){
		return true;
	}
}