import { Component, OnInit, Input} from '@angular/core';
import { RoomComponent } from '../room/room.component';

@Component({
  selector: 'app-roomobject',
  templateUrl: './roomobject.component.html',
  styleUrls: ['./roomobject.component.scss']
})
export class RoomobjectComponent implements OnInit {

  @Input() room: RoomComponent;

  constructor() { }

  ngOnInit() {
  }

  public objectAct(obj_id){
    console.log("Reacted to", obj_id);
  }

}
