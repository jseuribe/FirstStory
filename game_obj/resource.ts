class Resource{
    public count;
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
}