///<reference path="..\\node_modules\\@types\\jquery\\JQuery.d.ts"/>
///<reference path="resource.ts"/>

class DrawController{

    constructor(){

    }

    public updateElement(Resource){
        $('#'+Resource.name).html(Resource.count);
    }
}