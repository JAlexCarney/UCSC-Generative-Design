class ParticleSystem {

	constructor(center, N){
		this.particles = [];
		for(let i = 0; i < N; i++){
			this.particles.push(new Particle(center))
		}
	}

	update(){
		for(let i = 0; i < this.particles.length; i++){
			if(this.particles[i].isAlive()){
		      this.particles[i].update();
			}
	    }
	}

	draw(){
		for(let i = 0; i < this.particles.length; i++){
			if(this.particles[i].isAlive()){
	      		this.particles[i].draw();
	    	}
	    }
	}

	emit(){
		let i = 0;
		let particle = this.particles[i];
		while(particle.isAlive() && i != this.particles.length){
		  particle = this.particles[i];
		  i++;
		}
		if(i != this.particles.length){
		  let mag = Math.random() + 1;
		  let vel = createVector(mag, 0);
		  vel.rotate(Math.random() * Math.PI * 2);
		  let pos = createVector(worldW/2, worldH/2);
		  let lifetime = floor(Math.random()*120 + 60);
		  particle.randomizeVisual();
		  particle.emit(vel, lifetime);
		}
	}
}