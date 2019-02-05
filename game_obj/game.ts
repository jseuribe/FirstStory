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
    private Money: Money;

    private oneSecondInterval;

    public loadOK;

    public saver_ref = null;

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
        this.Money = new Money(statNames[4], 4);
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

    public set_saver(saver){
        this.saver_ref = saver;
    }

    public reset_all(): void{
    /** 
    *Summary. Resets the main 4 stats of the game
    *Description. Calls each material's resource object to handle deletion
    * 
    * 
    */        
        this.Psionics.reset();
        this.Materials.reset();
        this.Energy.reset();
        this.CPU.reset();
        this.Money.reset();

        this.saver_ref.delete_cookie();

    }

    public display_dev_options(): HTMLDivElement {
        var dev_menu = document.createElement("div");
        dev_menu.setAttribute("id", "devmenu");

        var reset_all_button = document.createElement("button");

        reset_all_button.appendChild(document.createTextNode("Reset Stats"));

        reset_all_button.onclick = this.reset_all.bind(this);

        dev_menu.appendChild(reset_all_button);

        return dev_menu;
    }

    public create_list(): HTMLTableElement{
        
        var list = document.createElement('table');
        list.setAttribute("id", "stb");
        list.setAttribute("class", "stats");
        console.log("Creating items for resources!!!");
    
        var name_row = document.createElement('tr');
        for(var i = 0; i < statNames.length; i++){

            var row_descrip = document.createElement('th');
            row_descrip.appendChild(document.createTextNode(statNames[i]));
            name_row.append(row_descrip);

        }
        list.append(name_row);

        var val_row = document.createElement('tr');

        for(var i = 0; i < statNames.length; i++){
            var item = document.createElement("td");
            console.log(statNames[i]);
            item.setAttribute("id", statNames[i]);

            item.appendChild(document.createTextNode(this.det_c_obj(i).count));

            val_row.append(item);

        }
        list.append(val_row);

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
            return this.Money;
        }
        else{
            console.log("RETURNING NULL???");
            return null;
        }
    }

    public get_profile_data(req_item, ts){

        switch(req_item){
            case 0:
                return this.Psionics.jsonify(ts);
                break;
            case 1:
                return this.Materials.jsonify(ts);
                break;
            case 2:
                return this.Energy.jsonify(ts);
                break;
            case 3:
                return this.CPU.jsonify(ts);
                break;
            case 4:
                return this.Money.jsonify(ts);
            default:
                return {"null":"value"};

        }
    }

    public oneSecondMethod(): void{
        //Resource Counters
        this.incr_all();

        //Draw Interfaces
        this.drawface.updateElement(this.Money);
    }

    public incr_all(): any{
        this.Money.incr();

    }
}
