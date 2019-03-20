import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomchangeService {
  /*
    Room Data Format:
    {
       object_id: Number,
       object_name: String,
       loc_room_id: Number,
       is_key_item: Boolean,
       active_at_roomstate: Number,
       description: String
    }
  */
  private room_data: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public c_room_data: Observable<any> = this.room_data.asObservable();
  
  private room_id: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public c_room_id: Observable<any> = this.room_id.asObservable();

  constructor() { }

  updateRoom(room_data){
    this.room_data.next(room_data);
  }

  updateRoomID(room_id){
    console.log("RMSRVCHANGE:", room_id)
    this.room_id.next(room_id);
  }

}
