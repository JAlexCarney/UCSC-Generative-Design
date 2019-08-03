
let isClicked = false;
let loading = true;
let frame = 0;
let model = null;

function setup() {
    let canvas = createCanvas(windowWidth - 200, windowHeight - 100);
    //let div = document.getElementById("content");
    //div.appendChild(canvas);
    background(240);

    textSize(40);
    textAlign(CENTER);

    midiPlayer = new MidiPlayer();
    midiPlayer.loadMidis("data/midi_files.json", onMIDIsLoaded);
}

function draw() {
    midiPlayer.draw();
    if(loading){
        fill(0);
        if(frame < 10){
            text("LOADING",width/2, height/2);
        } else if(frame < 20 ){
            text("LOADING.",width/2, height/2);
        } else if(frame < 30 ){
            text("LOADING..",width/2, height/2);
        } else if(frame < 40 ){
            text("LOADING...",width/2, height/2);
        }else {
            text("LOADING...",width/2, height/2);
            frame = 0;
        }
        frame++;
    }
}

function onButtonClicked() {
    isClicked = !isClicked;

    if(isClicked) {
        // console.log("start");
        button.elt.innerHTML = "Pause";
        midiPlayer.start();
    }
    else {
        button.elt.innerHTML = "Play";
        midiPlayer.pause();
    }
}

function onMIDIsLoaded(pianoRolls) {
    loading = false;

    // show interaction buttons
    button = createButton('Play');
    button.position(width - 150, 80);
    button.mousePressed(onButtonClicked);
    button.elt.className = "buttonTwo";

    button2 = createButton('NewSong');
    button2.position(width - 20, 80);
    button2.mousePressed(newSong);
    button2.elt.className = "buttonTwo";

    // create data set
    let data = [];
    let max = 500;
    for(let pianoRoll of pianoRolls){
        if(data.length < max){
            data.push("<start>");
            let midiText = midiPlayer.pianoRoll2Text(pianoRoll);
            let midiTextArray = split(midiText, " ");
            for(let note of midiTextArray){
                data.push(note);
            }
            data.push("<end>");
        }
    }
    
    model = new MarkovModel();
    model.train(data);

    newSong();
}

function tsCallback(currentTs, notesOn) {
    // console.log(currentTs, notesOn);
}

function newSong(){
    let NewMidiText = model.generate();
    let NewMidi = midiPlayer.text2Midi(NewMidiText);
    let midiData = midiPlayer.parseMidi(NewMidi);
    let NewPianoRoll = midiPlayer.notes2PianoRoll(midiData.duration, midiData.notes);

    midiPlayer.setPianoRoll(NewPianoRoll, tsCallback);
    console.log(NewMidiText);
}