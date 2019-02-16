import { Component, OnInit } from '@angular/core';
import { GameRunner } from './game/gamerunner';
import { Globals } from './game/global_defs';
import { RoomchangeService } from './services/roomchange.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [GameRunner, Globals]
})
export class AppComponent implements OnInit  {
  title = 'firststory';
  c_room_data = {var: "val"};

  constructor(private gamerunner: GameRunner, private roomchangeListener: RoomchangeService){

    gamerunner = new GameRunner();
    this.roomchangeListener.c_room_data.subscribe(result => this.update_gamerunner_room(result));
  }

  public update_gamerunner_room(room_data){

    this.gamerunner.game.update_room(room_data);
    this.c_room_data = room_data;

  }

  ngOnInit(){

    this.gamerunner.start();

  }
}
