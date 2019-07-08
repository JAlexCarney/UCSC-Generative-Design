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