class Individual {
    constructor(indSize) {
        this.indSize = indSize;
        this.gens = new Array(indSize);
        this.fitness = 0;

        this.init();
    }

    init() {
        let feats = Car.randomFeatures();
        for(let i = 0; i < this.indSize; i++){
            this.gens[i] = feats[i];
        }
    }
}

class GeneticAlgorithm {
    constructor(popSize, indSize, fitFunc, mutationRate) {
        this.indSize = indSize;
        this.popSize = popSize;
        this.fitFunc = fitFunc;
        this.mutationRate = mutationRate;
        this.generation = 1;

        this.init();
    }

    init() {
        this.population = new Array(this.popSize);
        for(let i = 0; i < this.popSize; i++) {
            // Initialize individual i randomly
            this.population[i] = new Individual(this.indSize);
        }
    }

    evolve() {
        this.evaluate();

        let matingPool = this.select();
        let newPopulation = this.reproduce(matingPool);
        this.mutate(newPopulation);

        this.population = newPopulation;

        this.generation += 1;
        //this.evaluate();
        //return this.best();
    }

    evaluate() {
        for(let individual of this.population) {
            individual.fitness = this.fitFunc(individual.gens)
        }
    }

    select() {
        let matingPool = new Array();

        // Select this.popSize Individual to be the parents
        for(let i = 0; i < this.popSize; i++) {
            let survivor = this.rouletteWheel();
            matingPool.push(survivor);
        }

        return matingPool;
    }

    rouletteWheel() {
        // normalize fitnesses
        let totalFitness = 0;
        for(let pop of this.population){
            totalFitness += pop.fitness;
        }
        for(let pop of this.population){
            pop.fitness /= totalFitness;
        }

        let r = random();
        let fitnessSoFar = 0;

        for(let i = 0; i < this.popSize; i++) {
            fitnessSoFar += this.population[i].fitness;

            if(r < fitnessSoFar) {
                return this.population[i];
            }
        }

         return this.population[this.population.length - 1];
    }

    reproduce(matingPool) {
        let newPopulation = new Array(this.popSize);

        for(let i = 0; i < this.popSize; i++) {
            let a = int(random(this.popSize));
            let b = int(random(this.popSize));

            newPopulation[i] = this.crossover(matingPool[a], matingPool[b]);
        }

        return newPopulation;
    }

    crossover(parentA, parentB) {
        let child = new Individual(this.indSize);
        let newGene = new Array(this.indSize);
        for(let i = 0; i < this.indSize; i++){
            if(Math.random() < 0.5){
                newGene[i] = parentA.gens[i];
            }else{
                newGene[i] = parentB.gens[i];
            }
        }
        child.gens = newGene;
        return child;
    }

    mutate(newPopulation) {
        for(let pop of newPopulation){
            if(Math.random() <= this.mutationRate){
                let feats = Car.randomFeatures();
                for(let i = 0; i < 5; i++){
                    let index = floor(Math.random()*this.indSize);
                    pop.gens[index] = feats[index]; 
                }
            }
        }
    }

    best() {

    }
}
