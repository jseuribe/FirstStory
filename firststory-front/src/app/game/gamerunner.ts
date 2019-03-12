import * as $ from 'jquery';
import {Injectable, OnChanges, SimpleChange} from '@angular/core';
import {Game} from './game';
import {Saver} from './saver';
import { Globals } from './global_defs';
import { RoomchangeService } from '../services/roomchange.service';

///<reference path="game.ts"/>
///<reference path="saver.ts"/>

@Injectable({
    providedIn: 'root',
})
export class GameRunner{

    public game: Game = null;
    public saver: Saver = null;

    constructor(private roomChangeListener: RoomchangeService){}

    public start(): void{
        console.log("I just executed!!!");
        this.game = new Game(new Globals(), this.roomChangeListener);
        this.saver = new Saver(this.game);

        this.game.set_saver(this.saver);

        if(this.game.resume_from_save(decodeURIComponent(document.cookie))){
            console.log("Game has properly initiated!");
        }
        else{
            console.log("Game was not loaded properly; treating as fresh save");
        }
        
        var body = document.body;
        var statbar_container = document.getElementById("stats");
    
        console.log(body);
        
        /*UI Generation*/
    
        statbar_container.appendChild(this.game.create_resource_table());
        statbar_container.appendChild(this.saver.generate_save_button());
        statbar_container.appendChild(this.saver.generate_delete_save_button());
    
        if(true){
            //This will prooobably get changed to something controlled externally, instead of being always set..
            var devmenu = this.game.display_dev_options();
    
            body.appendChild(devmenu);
        }
    
    }


}
