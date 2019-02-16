import { Component, OnInit } from '@angular/core';

import {Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-scriptinjector',
  templateUrl: './scriptinjector.component.html',
  styleUrls: ['./scriptinjector.component.scss']
})
export class ScriptinjectorComponent implements OnInit {

  constructor(private renderer2: Renderer2, @Inject(DOCUMENT) private _document) { 
    
  }

  ngOnInit() {

    //Developer's note. this kind of sucks?????
    this.renderer2.appendChild(this._document.body, this.gen_jquery_tag());

  }

  private gen_jquery_tag(){
    const jq = this.renderer2.createElement('script');
    const src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';

    jq.type = 'text/javascript';
    jq.src = src;
    jq.text = ``;

    return jq;
  }
}
