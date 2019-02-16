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

  constructor(private game: GameRunner, private roomchangeListener: RoomchangeService){

    game = new GameRunner();
    this.roomchangeListener.c_room_data.subscribe(result => this.c_room_data = result);
  }

  ngOnInit(){

    this.game.start();

  }
}
