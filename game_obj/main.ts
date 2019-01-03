///<reference path="game.ts"/>

//import {Game} from './game_obj/game'
module Main{
    var thisgame: Game = null;

    function start(): void{
        console.log("I just executed!!!");
        thisgame = new Game();
    }

    start();

    var button = document.getElementById("tstbutton");
    var cntbutton = document.getElementById("cntbutton");

    console.log(button.id);

    button.addEventListener('click', function(){
        thisgame.demand();
    }, false);

    cntbutton.addEventListener('click', function(){
        thisgame.getCount();
    }, false);


}