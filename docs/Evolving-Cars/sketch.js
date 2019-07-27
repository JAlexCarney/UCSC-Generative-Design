let world;
let race;
let camera;
let ga;
let cars;
let currentLeaderBoard;
let performanceHistory;
let avgPerformanceHistory;
let font;
let BestCar;
let displayMode = "best";

function preload() {
  font = loadFont('Oswald-Medium.ttf');
}

function setup() {
  let div = document.getElementById("content");
  createCanvas(640, 600, WEBGL);
  setAttributes('antialias', true);
  div.appendChild(canvas);

  textFont(font);
  textAlign(LEFT, TOP)

  // Initialize box2d physics and create the world
  world = createWorld();
  camera = createCamera();

  // Create Camera
  camera.ortho(-width / 2, width / 2, -height / 2, height /2, 0, 10);
  camera.setPosition(0, 0, 0);

  // Create a list of cars
  let popSize = 20;
  ga = new GeneticAlgorithm(popSize, 20, fitnessFunction, 0.3);
  cars = new Array(popSize);
  for(let i = 0; i < ga.popSize; i++) {
      let pos = createVector(0, -100);
      let car = new Car(pos.x, pos.y, "car" + i, ga.population[i].gens);
      cars[i] = car;
  }

  performanceHistory = [];
  avgPerformanceHistory = [];

  // Create a terrain
  let pos = createVector(-width/2, 10);
  terrain = new Terrain(pos.x, pos.y, 100, 100, 1);

  // Create a world to manage the cars
  race = new Race(terrain, cars, raceOverCallback);
  race.start();
}

function draw() {
    if (race.running) {
        background("#FF7F2A");
        if(displayMode == "best"){
          graphPreformanceHistory(camera.eyeX - 310, camera.eyeY - 290, 300, 150);
        }else if(displayMode == "avg"){
          graphAvgPreformanceHistory(camera.eyeX - 310, camera.eyeY - 290, 300, 150);
        }
        ShowBest(camera.eyeX + 200, camera.eyeY - 220);
    }

    race.update();
    race.draw();

    if(race.running) {
        // Update physics. 2nd and 3rd arguments are velocity and position iterations
        let timeStep = 1.0 / 30;
        world.Step(timeStep, 10, 10);

        // Get race leaderboards
        let leaderboard = race.getLeaderboards();

        // Follow first car with the camera
        let firstCar = leaderboard[0].car;

        if (firstCar) {
            let firstPos = firstCar.getPosition();
            camera.setPosition(firstPos.x + width/5, firstPos.y, camera.eyeZ);
        }
    }
}

// ========================================
// Callback function for when the race is over
// ========================================
function raceOverCallback(finalLeaderboards) {
    console.log("race over!");
    //console.log(finalLeaderboards); 
    currentLeaderBoard = finalLeaderboards;

    BestCar = currentLeaderBoard[0].car;

    performanceHistory.push(currentLeaderBoard[0].progress);


    //evolve
    ga.evolve();

    // Restart race with new cars
    for(let i = 0; i < ga.popSize; i++) {
        let pos = createVector(0, -100);
        let car = new Car(pos.x, pos.y, "car" + i, ga.population[i].gens);
        cars[i] = car;
    }

    // get average progress
    let totalProgress = 0;
    for(let position of finalLeaderboards){
      totalProgress += position.progress;
    }
    let avgProgress = totalProgress / finalLeaderboards.length;
    avgPerformanceHistory.push(avgProgress);

    // update display
    document.getElementById("genCount").innerHTML = "" + ga.generation;
    document.getElementById("bestProgress").innerHTML = "" + performanceHistory[performanceHistory.length - 1];
    document.getElementById("avgProgress").innerHTML = "" + avgProgress;

    race.setCars(cars);
    race.start();
}


function fitnessFunction(gene){
  for(let i = 0; i < currentLeaderBoard.length; i++){
    let isCar = true;
    for(let j = 0; j < gene.length; j++){
      if(gene[j] != currentLeaderBoard[i].car.feats[j]){
        isCar = false;
      }
    }
    if(isCar){
      return currentLeaderBoard[i].progress;
    }
  }
  return -1;
}


function graphPreformanceHistory(x0, y0, boxW, boxH){
  strokeWeight(2);
  fill("#FF7F2A");
  stroke("yellow");
  rect(x0, y0, boxW, boxH);
  strokeWeight(5);
  if(performanceHistory.length > 1){
    let x1 = 0;
    let y1 = performanceHistory[0];
    for(let i = 1; i < performanceHistory.length; i++){
      let x2 = x1 + 1/(performanceHistory.length-1);
      let y2 = performanceHistory[i];

      line(x0 + (x1 * boxW), y0 + ((1-y1) * boxH), x0 + (x2 * boxW), y0 + ((1-y2) * boxH));

      x1 = x2;
      y1 = y2;
    }
  }else if(performanceHistory[0]){line(x0, y0 + ((1-performanceHistory[0]) * boxH), x0 + boxW, y0 + ((1-performanceHistory[0]) * boxH))}
  strokeWeight(1);
  stroke(0);
  //stroke(128);
  textSize(25);
  fill("yellow")
  text("Performance History (best)", x0 + 20, y0-5);
  text("100%", x0 + boxW + 2, y0-5);
  text("0%", x0 + boxW + 2, y0+boxH-32);
}

function graphAvgPreformanceHistory(x0, y0, boxW, boxH){
  strokeWeight(2);
  fill("#FF7F2A");
  stroke("yellow");
  rect(x0, y0, boxW, boxH);
  strokeWeight(5);
  if(avgPerformanceHistory.length > 1){
    let x1 = 0;
    let y1 = avgPerformanceHistory[0];
    for(let i = 1; i < avgPerformanceHistory.length; i++){
      let x2 = x1 + 1/(avgPerformanceHistory.length-1);
      let y2 = avgPerformanceHistory[i];

      line(x0 + (x1 * boxW), y0 + ((1-y1) * boxH), x0 + (x2 * boxW), y0 + ((1-y2) * boxH));

      x1 = x2;
      y1 = y2;
    }
  }else if(avgPerformanceHistory[0]){line(x0, y0 + ((1-avgPerformanceHistory[0]) * boxH), x0 + boxW, y0 + ((1-avgPerformanceHistory[0]) * boxH))}
  strokeWeight(1);
  stroke(0);
  //stroke(128);
  textSize(25);
  fill("yellow")
  text("Performance History (Avg)", x0 + 20, y0-5);
  text("100%", x0 + boxW + 2, y0-5);
  text("0%", x0 + boxW + 2, y0+boxH-32);
}

function ShowBest(x0, y0){
  if(BestCar !== undefined){
    BestCar.drawStatic(x0, y0);
    textSize(25);
    fill("yellow")
    text("Best Car Last Gen", x0 - 100, y0 - 70);
  }
}

function toggle(){
  if(displayMode == "best"){
    displayMode = "avg";
  }else if(displayMode == "avg"){
    displayMode = "best";
  }
}