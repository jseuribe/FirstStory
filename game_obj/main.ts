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

    console.log(body);
    
    body.appendChild(thisgame.create_list());

}
