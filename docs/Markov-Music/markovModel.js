class MarkovModel {
    constructor(){
        this.pd = {};
    }

    generate(){
        let nstate = this.sample("<start>");
        let out = "";

        while(nstate !== "<end>"){
            out += nstate;
            nstate = this.sample(nstate);
            out += " ";
        }

        return out;
    }

    train(data) {
        for(let i = 0; i < data.length - 1; i++){
            if(!(data[i] in this.pd)){
                this.pd[data[i]] = {};
            }
            if(!(data[i+1] in this.pd[data[i]])){
                this.pd[data[i]][data[i+1]] = 0;
            }
            this.pd[data[i]][data[i+1]] += 1;
        }
        this.normalizePD();
    }

    normalizePD(){
        for(let cstate in this.pd) {
            let ctotal = 0;
            for(let nstate in this.pd[cstate]) {
                ctotal += this.pd[cstate][nstate];
            }

            for(let nstate in this.pd[cstate]) {
                this.pd[cstate][nstate] /= ctotal;
            }
        }
    }

    sample(istate){
        let r = random();
        let probSoFar = 0;

        for(let nstate in this.pd[istate]) {
            probSoFar += this.pd[istate][nstate];

            if(r < probSoFar) {
                return nstate;
            }
        }
    }
}