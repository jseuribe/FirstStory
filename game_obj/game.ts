///<reference path="drawface.ts"/>
///<reference path="envitem.ts"/>
///<reference path="resource.ts"/>
///<reference path="room.ts"/>
///<reference path="money.ts"/>
///<reference path="..\\node_modules\\@types\\jquery\\JQuery.d.ts"/>

class Game{
    private rooms: Room;
    private doesWork: String;
    private pageViews;
    private drawface: DrawFace;
    private moni: Money;

    private oneSecondInterval;

    constructor(){
        //Probably make some rooms here!
        var descrip : string = "dorm_rm_player";

        var firstroom: Room = new Room(descrip);

        this.doesWork = "yes!";

        this.drawface = new DrawFace();

        this.pageViews = 0;

        this.moni = new Money('Money');

        this.oneSecondInterval = window.setInterval(this.oneSecondMethod.bind(this), 1000);

    }

    public demand(): void{
        this.pageViews++;
        alert(this.doesWork);
    }

    public getCount(): void{
        alert(this.pageViews);
    }

    public create_list(): HTMLUListElement{
        var list = document.createElement('ul');

        for(var i = 0; i < 1; i++){
            var item = document.createElement('li');
            item.setAttribute("id", "counter");
            item.appendChild(document.createTextNode("help!"));

            list.append(item);
        }

        return list;
    }

    public oneSecondMethod(): void{
        this.moni.incr();
        $('#counter').html(this.moni.count);
    }

    public incr_test(): any{
        this.moni.incr();

    }
}
