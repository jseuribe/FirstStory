///<reference path="resource.ts"/>
import {Resource} from './resource';

export class DrawController{

    constructor(){
        
    }

    public updateElement(Resource){
        $('#'+Resource.name).html(Resource.count);
    }
}

