///<reference path="resource.ts"/>

class Energy extends Resource{
    
    public reset(){
        this.count = 0;
    }

    public jsonify(){
        return {};
    }

}