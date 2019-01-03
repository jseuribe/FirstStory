///<reference path="drawface.ts"/>
///<reference path="envitem.ts"/>
///<reference path="resource.ts"/>
///<reference path="room.ts"/>


class Game{
    private rooms: Room;
    private doesWork: String;
    private pageViews;
    private drawface: DrawFace;

    constructor(){
        //Probably make some rooms here!
        var descrip : string = "dorm_rm_player";

        var firstroom: Room = new Room(descrip);

        this.doesWork = "yes!";

        this.drawface = new DrawFace();

        this.pageViews = 0;


    }

    public demand(): void{
        this.pageViews++;
        alert(this.doesWork);
    }

    public getCount(): void{
        alert(this.pageViews);
    }
}
