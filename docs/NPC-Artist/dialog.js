let synth = null;

class DialogBox {
	constructor(x, y, width, height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.treble = loadImage("treble.png");
		this.song = "";
		this.dialog = "";
		this.mode = "song";
		this.visable = false;
		this.indexOfPlaying = -1;

		synth = new p5.PolySynth();
		synth.connect();

		//textFont(inconsolata);
  		textSize(this.height / 6);
  		textAlign(CENTER, CENTER);
	}

	draw(){
		if(this.visable)
		{
			push();
			translate(this.x, this.y);

			fill("#ffffff")
			rectMode(CENTER);
			rect(0, 0, this.width, this.height, 50);

			if(this.mode == "song"){
				// draw 7 bars
				fill("black");
				for(let i = -2; i < 3; i++)
				{
					rect(0, i*(this.height/8), this.width - 50, 2);
				}
				image(this.treble, -this.width/2, -2*this.height/8, 50, 5*this.height/8)
				push()
				translate(-this.width/2 + 75, 0);
				// draw notes
				for(let i = 0; i < this.song.length; i++){
					let y = 0;
					if(this.song[i] == 'f' || this.song[i] == 'F'){
						y = (3/16) * this.height;
					}else if(this.song[i] == 'g' || this.song[i] == 'G'){
						y = (2/16) * this.height;
					}else if(this.song[i] == 'a' || this.song[i] == 'A'){
						y = (1/16) * this.height;
					}else if(this.song[i] == 'b' || this.song[i] == 'B'){
						y = (0/16) * this.height;
					}else if(this.song[i] == 'c' || this.song[i] == 'C'){
						y = (-1/16) * this.height;
					}else if(this.song[i] == 'd' || this.song[i] == 'D'){
						y = (-2/16) * this.height;
					}else if(this.song[i] == 'e' || this.song[i] == 'E'){
						y = (-3/16) * this.height;
					}
					if(i == this.indexOfPlaying){
						fill("#facade");
					}else{
						fill(0);
					}
					ellipse(0, y, this.height/8, this.height/8);
					fill(255);
					ellipse(0, y, this.height/9, this.height/14);
					translate(25, 0);
				}
				pop();
			}
			else if(this.mode == "dialog")
			{
				// draw words
				fill(0);
				text(this.dialog, 0, 0, (7/8)*this.width, this.height);

			}

			rectMode(CORNER);
			pop();
		}
	}

	setSong(song){
		this.song = song;
	}

	displayMusic(){
		this.mode = "song";
	}

	playSong(){
		let i = 0;
		for(; i < this.song.length; i++){
			let midiNumber = 0;
			if(this.song[i] == 'f' || this.song[i] == 'F'){
				midiNumber = 65;
			}else if(this.song[i] == 'g' || this.song[i] == 'G'){
				midiNumber = 67;
			}else if(this.song[i] == 'a' || this.song[i] == 'A'){
				midiNumber = 69;
			}else if(this.song[i] == 'b' || this.song[i] == 'B'){
				midiNumber = 71;
			}else if(this.song[i] == 'c' || this.song[i] == 'C'){
				midiNumber = 72;
			}else if(this.song[i] == 'd' || this.song[i] == 'D'){
				midiNumber = 74;
			}else if(this.song[i] == 'e' || this.song[i] == 'E'){
				midiNumber = 76;
			}
			setTimeout(this.playNote, i * 1000/3, midiNumber, i);
		}
		setTimeout(this.resetNote, (i+1) * 1000/3);
	}

	resetNote(){
		dialogBox.indexOfPlaying = -1;
	}

	playNote(note, index){
		dialogBox.indexOfPlaying = index;
		synth.play(midiToFreq(note), 1, 0, 0.2);
	}

	setPrompt(dialog){
		this.dialog = dialog;
	}

	displayPrompt(){
		this.mode = "dialog";
	}
}