class Resource{
    public count;    
    public rate;
    public update_step;
    public time_kept;

    public name;
    public internal_id;

    constructor(name: String, idval: number){
        this.count = 0;
        this.name = name;
        this.internal_id = idval;
        console.log("Constructor Resource OK");

    }

    public incr() {
        //Default incr method! Each resource should have its own methods...
    }

    public reset(){
        //Default reset method. Each resource will (probably) need unique reset procedures.
    }

    public jsonify(){
        //Default jsonify method. Used to store stat values
    }

    public load_in(resource_data, start_time, profile_ts){
        //Default load in method, to initiate a session
    }

}