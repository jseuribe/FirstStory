import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomchangeService {
  private room_data: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public c_room_data: Observable<any> = this.room_data.asObservable();

  constructor() { }

  updateRoom(room_data){
    this.room_data.next(room_data);
  }
}
