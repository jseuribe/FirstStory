import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import {Room} from '../models/room';

import { Observable, of } from 'rxjs';
import {map} from "rxjs/operators";
import { RoomchangeService } from './roomchange.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private serverApi='http://localhost:3000';
  private c_room_id;

  constructor(private http: Http) {
    //this.roomChangeListener.c_room_id.subscribe(result => this.get_room_details(result));
  }

  public simplefetch(){
    console.log("Fetch data from be");
    let URI = `${this.serverApi}/simplefetch/`;
    return this.http.get(URI).pipe(map(res => res.json()));
  }

  public get_room_details(room_id){
    let URI = `${this.serverApi}/retrieve_room`;

    return this.http.post(URI, {id: room_id}).pipe(map(res => res.json()));

  }
}
