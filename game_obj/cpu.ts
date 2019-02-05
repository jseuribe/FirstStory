///<reference path="resource.ts"/>

class CPU extends Resource{
    
    public reset(){
        this.count = 0;
    }

    public jsonify(){
        return {};
    }
}