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

import { DrawController } from "./draw_controller";
import { Energy } from './energy';
import { CPU } from './cpu';
import { Room } from './room';
import { PSI } from './psi';
import { Materials } from './materials';
import { Money } from './money';
import {Resource} from './resource';
import {Globals} from './global_defs';
import { BehaviorSubject, Observable } from 'rxjs';
import { RoomchangeService } from '../services/roomchange.service';

export class Game{
    private rooms: Room;
    private doesWork: String;
    private pageViews;
    private drawface: DrawController;

    private Psionics: PSI;
    private Materials: Materials;
    private Energy: Energy;
    private CPU: CPU;
    private Money: Money;

    private c_room_data: JSON;

    public c_room_id: number;
  
    private oneSecondInterval;

    public loadOK;

    public saver_ref = null;

    constructor(private globals: Globals, private roomChangeListener: RoomchangeService)
    {
        //Probably make some rooms here!
        console.log("Executing Game Constructor!!!");
        var descrip : string = "dorm_rm_player";

        var firstroom: Room = new Room(descrip);
        this.c_room_id = 1;
        this.roomChangeListener.c_room_id.subscribe(result => this.set_room_id(result));

        this.drawface = new DrawController();

        this.pageViews = 0;

        this.Psionics = new PSI(globals.statNames[0], 0);
        this.Materials = new Materials(globals.statNames[1], 1);
        this.Energy = new Energy(globals.statNames[2], 2);
        this.CPU = new CPU(globals.statNames[3], 3);
        this.Money = new Money(globals.statNames[4], 4);

        this.oneSecondInterval = window.setInterval(this.oneSecondMethod.bind(this), 1000);

        this.loadOK = true;

        this.globals = globals;
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

    public create_resource_table(): HTMLTableElement{
        /* initializes the stats table.
        * creates the table element which holds the stats bar values
        * <table> id: stb, class: stats
        * individual elements:
        * <th>: holds the names of the stats.
        * <tr>: No special values
        * <td>: id: ResourceName; holds the resource count
        */

        var stat_table = document.createElement('table');
        stat_table.setAttribute("id", "stb");
        stat_table.setAttribute("class", "stats");
        console.log("Creating items for resources!!!");
    
        var name_row = document.createElement('tr');
        for(var i = 0; i < this.globals.statNames.length; i++){

            var row_descrip = document.createElement('th');
            row_descrip.appendChild(document.createTextNode(this.globals.statNames[i]));
            name_row.append(row_descrip);

        }
        stat_table.append(name_row);

        var val_row = document.createElement('tr');

        for(var i = 0; i < this.globals.statNames.length; i++){
            var item = document.createElement("td");
            console.log(this.globals.statNames[i]);
            item.setAttribute("id", this.globals.statNames[i]);

            item.appendChild(document.createTextNode(this.det_c_obj(i).count));

            val_row.append(item);

        }
        stat_table.append(val_row);

        return stat_table;
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

    public get_profile_data(req_item){

        switch(req_item){
            case 0:
                return this.Psionics.jsonify();
                break;
            case 1:
                return this.Materials.jsonify();
                break;
            case 2:
                return this.Energy.jsonify();
                break;
            case 3:
                return this.CPU.jsonify();
                break;
            case 4:
                return this.Money.jsonify();
            default:
                return {"null":"value"};

        }
    }

    public oneSecondMethod(): void{
        /* update and draw all forward facing updates to their appropriate elements.
        * Steps taken are:
        * 1. Increment Resource Counts 2. Draw Updates
        * 
        */

        //Resource Counters get incremented first.
        this.incr_all();

        //Draw Interfaces
        this.draw_updates();
    }

    public incr_all(): any{
        this.Money.incr();
        this.Psionics.incr();

    }

    public draw_updates(): any{
        this.drawface.updateElement(this.Money);
        this.drawface.updateElement(this.Psionics);

    }

    public resume_from_save(parsed_cookie){

        if(parsed_cookie.length > 0)
        {
            var start_time = Date.now();
            var cookie_fields = parsed_cookie.split(";");
    
            console.log("parsing cookie!!!");
            console.log(cookie_fields);
    
            var resource_arr;
            var profile_ts;
            var b_found_file = false;
            var b_bad_file = false;
            for(var field of cookie_fields){

                console.log(field);

                if(field.split("=")[0] == "fsfile"){
                    //This is the game file! Load this json object into the resource objects
    
                    try{

                        var parsed_file_json = JSON.parse(field.split("=")[1]);
                        console.log("parsed json:", parsed_file_json);
                        resource_arr = parsed_file_json.resources
                        if(resource_arr === null){
                            console.log("Corrupted resource object");
                        }
                        
                        profile_ts = Number(parsed_file_json.timestamp);
        
                        b_found_file = true;
                        b_bad_file = false;

                    }
                    catch(e){
                        console.log("Malformed cookie; treating the connection as a fresh game");
                        document.cookie = "";
                        b_bad_file = true;
                    }
                }
                else{
                    b_bad_file = true;
                }
            }
    
            if(b_found_file){
                console.log("Found file");
                this.load_in_stats(resource_arr, start_time/1000, profile_ts);
                
                return b_found_file;
            }
            else if(b_bad_file){
                console.log("Corrupt file found...Setting to defaults");
                this.roomChangeListener.updateRoomID(1);
            }
    
        }
        else{
            //This SHOULD get called when a profile isn't able to be loaded!
            //Note: Then this should be called in the upper if statement, with the save file's room id
            this.roomChangeListener.updateRoomID(1);
        }

        return false;
    }

    public load_in_stats(resource_arr, start_time, profile_ts){
        for(var i = 0; i<this.globals.statNames.length; i++){
            switch(i){
                case 0:
                    this.Psionics.load_in(resource_arr[0], start_time, profile_ts);
                    break;
                case 1:
                    this.Materials.load_in(resource_arr[1], start_time, profile_ts);
                    break;
                case 2:
                    this.Energy.load_in(resource_arr[2], start_time, profile_ts);
                    break;
                case 3:
                    this.CPU.load_in(resource_arr[3], start_time, profile_ts);
                    break;
                case 4:
                    this.Money.load_in(resource_arr[4], start_time, profile_ts);
                    break;
                default:
                    console.log("There's no fifth resource!!!?");
            }
        }
    }

    public update_room(room_data){
        this.c_room_data = room_data;
    }

    public get_current_room(){
        return this.c_room_data;
    }
 
    public get_current_room_id(){
        return this.c_room_id;
    }
    public set_room_id(room_id){
        this.c_room_id = room_id;
    }
}
