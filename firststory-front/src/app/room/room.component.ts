import { Component, OnInit, OnChanges, SimpleChange, Input, Output} from '@angular/core';
import {RoomService} from '../services/room.service';
import {Room} from '../models/room';

import {GameRunner} from '../game/gamerunner';
import { EventEmitter } from 'events';
import { RoomchangeService } from '../services/roomchange.service';
import {Http, Headers} from '@angular/http';
import {map} from 'rxjs/operators'

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  public data: JSON;
  private serverApi='http://localhost:3000';

  constructor(private http: Http, private roomServ: RoomService, private roomchangeServ: RoomchangeService) {
    this.roomchangeServ.c_room_id.subscribe(result => this.fetch_active_room(result));
   }

  ngOnInit() {
    //this.simplefetch();
  }

  public simplefetch(){
    this.roomServ.simplefetch().subscribe(response => this.parse_room(response),)
  }

  public fetch_active_room(room_id){
    this.roomServ.get_room_details(room_id).subscribe(response => this.parse_room(response),)
  }

  public parse_room(response: JSON){
    this.data = response;
    this.roomchangeServ.updateRoom(this.data);
  }

}
