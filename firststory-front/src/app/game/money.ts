///<reference path="resource.ts"/>
///<reference path="global_defs.ts"/>
import {Resource} from './resource';

export class Money extends Resource{
    constructor(name: String, idval: number){
        super(name, idval);
        this.rate = 100;
        this.update_step = 60*60;
        this.time_kept = 0;

        this.count = 1000;
        console.log("Constructor Moni OK");
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

    public reset(){
        this.count = 0;
        this.rate = 1000;
        this.update_step = 10;
        this.time_kept = 0;
    }

    public jsonify(){

        var json_profile = {"count": this.count, "rate": this.rate, "update_step":this.update_step}

        return json_profile;

    }

    public load_in(resource_data, start_time, profile_ts){
        console.log("MONEY LOAD-IN");
        //Set the amt

        this.count = Number(resource_data.count);
        this.rate = Number(resource_data.rate);
        this.update_step = Number(resource_data.update_step);

        //Compute the residual amount from the last ts to right now, system wise.

        var ts_diff = start_time - profile_ts;
        console.log("ts_diff:", ts_diff);

        var incr_amount = Math.ceil(ts_diff / this.update_step);
        console.log("incr amt:", incr_amount);
        
        console.log("prevamt:", this.count, "added amt:", incr_amount*this.rate)
        this.count += incr_amount*this.rate;
    }
}