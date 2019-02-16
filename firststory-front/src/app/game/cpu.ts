///<reference path="resource.ts"/>
import {Resource} from './resource';

export class CPU extends Resource{
    
    public reset(){
        this.count = 0;
    }

    public jsonify(){
        return {};
    }
}