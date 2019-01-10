///<reference path="draw_controller.ts"/>
///<reference path="envitem.ts"/>

///<reference path="room.ts"/>

///<reference path="resource.ts"/>
///<reference path="money.ts"/>
///<reference path="psi.ts"/>
///<reference path="materials.ts"/>
///<reference path="energy.ts"/>
///<reference path="cpu.ts"/>

///<reference path="global_defs.ts"/>

class Game{
    private rooms: Room;
    private doesWork: String;
    private pageViews;
    private drawface: DrawController;

    private Psionics: PSI;
    private Materials: Materials;
    private Energy: Energy;
    private CPU: CPU;
    private moni: Money;

    private oneSecondInterval;

    public loadOK;

    constructor(){
        //Probably make some rooms here!
        console.log("Executing Game Constructor!!!");
        var descrip : string = "dorm_rm_player";

        var firstroom: Room = new Room(descrip);

        this.drawface = new DrawController();

        this.pageViews = 0;

        this.Psionics = new PSI(statNames[0], 0);
        this.Materials = new Materials(statNames[1], 1);
        this.Energy = new Energy(statNames[2], 2);
        this.CPU = new CPU(statNames[3], 3);
        this.moni = new Money(statNames[4], 4);
        this.oneSecondInterval = window.setInterval(this.oneSecondMethod.bind(this), 1000);

        this.loadOK = true;
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

        console.log("Creating items for resources!!!");
        for(var i = 0; i < statNames.length; i++){
            var item = document.createElement('li');
            console.log(statNames[i]);
            item.setAttribute("id", statNames[i]);

            item.appendChild(document.createTextNode(this.det_c_obj(i).count));

            list.append(item);
        }

        return list;
    }

    public det_c_obj(idval: number): Resource{
        if(idval == 0){
            return this.Psionics;
        }
        else if(idval == 1){
            return this.Materials;
        }
        else if(idval == 2){
            return this.Energy;
        }
        else if(idval == 3){
            return this.CPU;
        }
        else if(idval == 4){
            return this.moni;
        }
        else{
            console.log("RETURNING NULL???");
            return null;
        }
    }

    public oneSecondMethod(): void{
        //Resource Counters
        this.incr_all();

        //Draw Interfaces
        this.drawface.updateElement(this.moni);
    }

    public incr_all(): any{
        this.moni.incr();

    }
}
