let world;
let race;
let camera;
let ga;
let cars;
let currentLeaderBoard;
let performanceHistory;

function setup() {
  let div = document.getElementById("content");
  createCanvas(640, 400, WEBGL);
  setAttributes('antialias', true);
  div.appendChild(canvas);

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
        graphPreformanceHistory();
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

    performanceHistory.push(currentLeaderBoard[0].progress);
    console.log(performanceHistory);


    //evolve
    ga.evolve();

    // Restart race with new cars
    for(let i = 0; i < ga.popSize; i++) {
        let pos = createVector(0, -100);
        let car = new Car(pos.x, pos.y, "car" + i, ga.population[i].gens);
        cars[i] = car;
    }

    // update display
    document.getElementById("genCount").innerHTML = "Generation : " + ga.generation;

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


function graphPreformanceHistory(){
  stroke(0);
  strokeWeight(5);
  boxW = 200;
  boxH = 100;
  if(performanceHistory.length > 1){
    let x1 = 0;
    let y1 = performanceHistory[0];
    for(let i = 1; i < performanceHistory.length; i++){
      let x2 = x1 + 1/performanceHistory.length;
      let y2 = performanceHistory[i];

      line(x1 * boxW, (1-y1) * boxH , x2 * boxW, (1-y2) * boxH);

      x1 = x2;
      y1 = y2;
    }
  }
  strokeWeight(1);
}