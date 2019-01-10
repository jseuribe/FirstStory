///<reference path="resource.ts"/>
///<reference path="global_defs.ts"/>

class Money extends Resource{
    private wage_rate;
    private time_to_get_paid;
    private time_kept;

    constructor(name: String, idval: number){
        super(name, idval);
        this.wage_rate = 1000;
        this.time_to_get_paid = 10;
        this.time_kept = 0;
        console.log("Constructor Moni OK");
    }

    public incr(): any{
        //Main incrementing function
        if(this.time_kept == this.time_to_get_paid){
            //If it's time to get paid...get that paper
            this.count += this.wage_rate;
            this.time_kept = 0;
        }
        else{
            this.time_kept += 1;
        }
    }
}