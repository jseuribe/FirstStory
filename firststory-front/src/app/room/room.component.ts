import { Component, OnInit, OnChanges, SimpleChange, Input, Output} from '@angular/core';
import {RoomService} from '../services/room.service';
import {Room} from '../models/room';

import {GameRunner} from '../game/gamerunner';
import { EventEmitter } from 'events';
import { RoomchangeService } from '../services/roomchange.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  public data: JSON;

  constructor(private roomServ: RoomService, private roomchangeServ: RoomchangeService) {
    this.roomchangeServ.updateRoom(this.data);
   }

  ngOnInit() {
    this.simplefetch();
  }

  public simplefetch(){
    this.roomServ.simplefetch().subscribe(response => this.parse_room(response),)
  }

  public parse_room(response: JSON){
    this.data = response;
    this.roomchangeServ.updateRoom(this.data);
    //this.roomChange.emit(this.data);
  }

  /*
  public ngOnChanges(changes: {[key: string]: SimpleChange}){
   console.log("Change!");
   
   for(let propName in changes){
     let changedProp = changes[propName];
     console.log("Change in value:", changedProp);
   }
  }
  */
}
