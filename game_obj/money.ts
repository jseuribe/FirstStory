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

    public reset(){
        this.count = 0;
        this.wage_rate = 1000;
        this.time_to_get_paid = 10;
        this.time_kept = 0;
    }

    public jsonify(){

        var json_profile = {"count": this.count, "wage_rate": this.wage_rate, "time_to_get_paid":this.time_to_get_paid}

        return json_profile;

    }

    public load_in(resource_data, start_time, profile_ts){
        //Set the amt

        this.count = Number(resource_data.count);
        this.wage_rate = Number(resource_data.wage_rate);
        this.time_to_get_paid = Number(resource_data.time_to_get_paid);

        //Compute the residual amount from the last ts to right now, system wise.

        var ts_diff = start_time - profile_ts;
        console.log("ts_diff:", ts_diff);

        var incr_amount = Math.ceil(ts_diff / this.time_to_get_paid);
        console.log("incr amt:", incr_amount);
        
        console.log("prevamt:", this.count, "added amt:", incr_amount*this.wage_rate)
        this.count += incr_amount*this.wage_rate;
    }
}