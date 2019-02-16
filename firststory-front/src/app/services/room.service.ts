import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import {Room} from '../models/room';

import { Observable, of } from 'rxjs';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private serverApi='http://localhost:3000';

  constructor(private http: Http) { }

  public simplefetch(){
    console.log("Fetch data from be");
    let URI = `${this.serverApi}/simplefetch/`;

    return this.http.get(URI).pipe(map(res => res.json()));
  }
}
