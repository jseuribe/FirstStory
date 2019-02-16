///<reference path="envitem.ts"/>
import {EnvItem} from './envitem';

export class Room{

    private conn_rooms: Room;
    private items : EnvItem;
    private descrip: string;

    constructor(descrip){
        //Something might go here!

        this.descrip = descrip;
    }

}