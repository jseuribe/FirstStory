import {Room} from "./room"
import {Resource} from "./resource"

export class Game{
    private rooms: Room;
    private doesWork: String;
    private pageViews;

    constructor(){
        //Probably make some rooms here!
        var descrip : string = "dorm_rm_player";

        var firstroom: Room = new Room(descrip);

        this.doesWork = "yes!";

    }
}

export default new Game()