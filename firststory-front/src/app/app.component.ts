import { Component, OnInit } from '@angular/core';
import { GameRunner } from './game/gamerunner';
import { Globals } from './game/global_defs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [GameRunner, Globals]
})
export class AppComponent implements OnInit  {
  title = 'firststory';
  c_room_data = {var: "val"};

  constructor(private game: GameRunner){

    game = new GameRunner();

  }

  ngOnInit(){

    this.game.start();

  }
}
