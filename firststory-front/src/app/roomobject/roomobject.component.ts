import { Component, OnInit, Input} from '@angular/core';
import { RoomComponent } from '../room/room.component';
import { GameactionService } from '../services/gameaction.service';

@Component({
  selector: 'app-roomobject',
  templateUrl: './roomobject.component.html',
  styleUrls: ['./roomobject.component.scss']
})
export class RoomobjectComponent implements OnInit {

  @Input() room: RoomComponent;

  constructor(private gameactionListener: GameactionService) { }

  ngOnInit() {
  }

  public objectAct(data){

    console.log("You clicked on an object!");

    this.gameactionListener.set_picked_up(data);
    
  }

}
