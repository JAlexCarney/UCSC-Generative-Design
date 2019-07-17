class GenerativeGrammar{
	constructor(ProductionRules){
		this.rules = ProductionRules;
		this.symbols = ["A", "B", "C", "D", "E", "F", "G"];
		this.terminalSymbols = ["a", "b", "c", "d", "e", "f", "g"];
	}

	generateFromAxiom(Axiom, generations){
		let result = Axiom;
		console.log(result);
		for(let i = 0; i < generations; i++){
			result = this.nextGen(result);
		}
		console.log(result);
		return result;
	}

	nextGen(axiom){
		let result = "";
		for(let i = 0; i < axiom.length; i++){
			if(this.symbols.includes(axiom[i]))
			{
				let possibleInjections = [];
				for(let r = 0; r < this.rules.length; r++){
					if(this.rules[r][0] == axiom[i]){
						possibleInjections.push(this.rules[r][1]);
					}
				}
				if(possibleInjections.length > 0){
					result += possibleInjections[floor(possibleInjections.length * Math.random())];
				}
			}else if(this.terminalSymbols.includes(axiom[i])){
				result += axiom[i];
			}
		}
		console.log(result);
		return result;
	}
}