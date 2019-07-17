class Player {
	constructor(x, y, size, color){
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;
	}

	draw(){
		drawBird(this.x, this.y, this.size, this.color, "left");
	}

	move(hor, vert){
		let newX = this.x + hor;
		let newY = this.y + vert;
		if(this.checkBoundry(newX, newY)){
			this.x = newX;
			this.y = newY;
		}
	}

	checkBoundry(x, y){
		return true;
	}
}