///<reference path="resource.ts"/>

class PSI extends Resource{

    public reset(){
        this.count = 0;
    }

    constructor(name: String, idval: number){
        super(name, idval);
        this.time_kept = 0;
        this.rate = 1;
        this.update_step = 1;

        console.log("Constructor PSI OK");
    }

    public jsonify(){
        var json_profile = {"count": this.count, "rate": this.rate, "update_step":this.update_step}

        return json_profile;
    }

    public incr(): any{
        //Main incrementing function
        if(this.time_kept == this.update_step){
            //If it's time to get paid...get that paper
            this.count += this.rate;
            this.time_kept = 0;
        }
        else{
            this.time_kept += 1;
        }
    }

}