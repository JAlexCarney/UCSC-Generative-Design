class NPC {
	constructor(x, y, size, color){
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;
		this.grammar = new GenerativeGrammar(
			[
				["A", "aBc"],
				["A", "abC"], 
				["A", "eFg"],
				["B", "bb"],
				["B", "Abc"],
				["C", "fg"],
				["D", "AC"],
				["E", "ee"],
				["F", "aB"],
				["G", "Ba"]
			]);
	}

	draw(){
		drawBird(this.x, this.y, this.size, this.color, "right");
	}

	sing(){
		let axiom = "ABC";
		let generations = 5;

		let song = this.grammar.generateFromAxiom(axiom, generations);
		return song;
	}
}