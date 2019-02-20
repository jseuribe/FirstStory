///<reference path="game.ts"/>
import {Game} from './game';

export class Saver{

    private game = null;
    private cookie_name = 'fsfile=';
    public expiry_amt = null;

    constructor(game){
        this.game = game;
        this.expiry_amt = 30*24*60*60*1000;//Set amt to +30 days of when the game gets saved
    }

    public save_to_cookie(){
        this.jsonify_data();
    }

    public access_cookie(){

    }

    public delete_cookie(){
        document.cookie = this.cookie_name+"expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        this.game.reset_all();

        //Reload the page. Don't want any pesky room changes to stay!
        location.reload();

    }

    public jsonify_data(){

        //Stats order: 'PSI', 'Materials', 'Energy', 'CPU', 'Money'
        var stats_arr = [];

        var c_ts = Date.now();
        stats_arr.push(this.game.get_profile_data(0));
        stats_arr.push(this.game.get_profile_data(1));
        stats_arr.push(this.game.get_profile_data(2));
        stats_arr.push(this.game.get_profile_data(3));
        stats_arr.push(this.game.get_profile_data(4));

        var master_json = {"resources": stats_arr, "timestamp": c_ts/1000, "currentroom": this.game.get_current_room()};

        var cookie_str = this.cookie_name+JSON.stringify(master_json)+";";
        var expiry_date = new Date(c_ts + this.expiry_amt);

        cookie_str += "expires="+expiry_date.toUTCString()+";";

        document.cookie = cookie_str;
        
        //Set expiration date
        console.log("data saved!!!");
        console.log(document.cookie);

    }

    public generate_save_button(){
        var save_button = document.createElement("button");
        save_button.appendChild(document.createTextNode("Save!"));
        save_button.onclick = this.save_to_cookie.bind(this);

        return save_button;
    }

    public generate_delete_save_button(){
        var delete_button = document.createElement("button");
        delete_button.appendChild(document.createTextNode("DeleteSave!"));

        delete_button.onclick = this.delete_cookie.bind(this);

        return delete_button;
        
    }
}