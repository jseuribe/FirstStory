import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomComponent } from './room/room.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import {RoomService} from './services/room.service';
import { ScriptinjectorComponent } from './scriptinjector/scriptinjector.component';
import { RoomobjectComponent } from './roomobject/roomobject.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    ScriptinjectorComponent,
    RoomobjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [RoomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
