///<reference path="game.ts"/>

module Main{
    var thisgame: Game = null;

    function start(): void{
        console.log("I just executed!!!");
        thisgame = new Game();
    }

    start();

    if(thisgame.loadOK){
        console.log("Game has properly initiated!");
    }

    var body = document.body;
    var statbar_container = document.getElementById("stats");

    console.log(body);
    
    statbar_container.appendChild(thisgame.create_list());

}
