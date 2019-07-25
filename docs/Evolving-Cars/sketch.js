let world;
let race;
let camera;
let ga;
let cars;
let currentLeaderBoard;

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
  ga = new GeneticAlgorithm(popSize, 20, fitnessFunction, 0.2);
  cars = new Array(popSize);
  for(let i = 0; i < ga.popSize; i++) {
      let pos = createVector(0, -100);
      let car = new Car(pos.x, pos.y, "car" + i, ga.population[i].gens);
      cars[i] = car;
  }

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
    console.log(finalLeaderboards); 
    currentLeaderBoard = finalLeaderboards;

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