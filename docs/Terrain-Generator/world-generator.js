class WorldGenerator {
	constructor() {
		this.cubeSize = 10;
		this.terrainDic = this.loadTextures();
		this.noiseScale = null;
		this.width = null;
		this.amplitude = null;
		this.seed = null;

		this.getInput();
	}

	generate() {
		let width = this.width;
		let depth = this.width; 
		let height = this.amplitude;
		this.cubeSize = canvasSize/width;
		noiseSeed(this.seed);		


		// create world
		let cubeSize = this.cubeSize;
		for(let x = 0; x < width; x++){
			for(let y = 0; y < depth; y++){
				
				let noiseVal = noise(x/this.noiseScale, y/this.noiseScale);
				let z = noiseVal * height;


				let terTexture = this.terrainDic[this.terrainType(noiseVal)];

				push();
				translate(x*cubeSize, y*cubeSize, z*cubeSize);
				for(; z > 0; z--){
					texture(terTexture);
					box(cubeSize);
					translate(0, 0, -cubeSize);
				}
				pop();
			}
		}

		// create water
		push();
		translate(width * cubeSize * 0.5, depth  * cubeSize * 0.5, height * cubeSize * 0.55);
		texture(this.terrainDic["waterSurface"]);
		plane(width*cubeSize, depth*cubeSize);//, width, depth);
		pop();

		// reset camera
		camera(canvasSize/2, canvasSize/2, 1.5 * this.cubeSize * this.width, canvasSize/2, canvasSize/2, 0, 0, 1, 0);
  		perspective();
	}

	terrainType(val){
		if(val < 0.3){
			return "deepWater";
		}else if(val < 0.5){
			return "shallowWater";
		}else if(val < 0.6){
			return "sand";
		}else if(val < 0.7){
			return "grass";
		}else if(val < 0.8){
			return "mountain";
		}else{
			return "snow";
		}
	}

	loadTextures(){
		let dic = {}
		dic["deepWater"] = loadImage("textures/clay.png");
		dic["shallowWater"] = loadImage("textures/dirt.png");
		dic["grass"] = loadImage("textures/grass.png");
		dic["sand"] = loadImage("textures/sand.png");
		dic["mountain"] = loadImage("textures/mountain.png");
		dic["snow"] = loadImage("textures/snow.png");
		dic["waterSurface"] = loadImage("textures/water.png");
		return dic;
	}

	getInput(){
		this.noiseScale = userIn.scale;
		this.width = userIn.width;
		this.amplitude = userIn.amplitude;
		this.seed = userIn.seed;
	}
}