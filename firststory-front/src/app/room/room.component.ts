import { Component, OnInit, OnChanges, SimpleChange, Input, Output} from '@angular/core';
import {RoomService} from '../services/room.service';
import {Room} from '../models/room';

import {GameRunner} from '../game/gamerunner';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnChanges {

  @Input() data: JSON;
  @Output() roomChange = new EventEmitter<JSON>();

  constructor(private roomServ: RoomService) { }

  ngOnInit() {
    this.simplefetch();
  }

  public simplefetch(){
    this.roomServ.simplefetch().subscribe(response => this.parse_room(response),)
  }

  public parse_room(response: JSON){
    this.data = response;
    this.roomChange.emit(this.data);
  }

  public ngOnChanges(changes: {[key: string]: SimpleChange}){
   console.log("Change!");
   
   for(let propName in changes){
     let changedProp = changes[propName];
     console.log("Change in value:", changedProp);
   }
  }
}
