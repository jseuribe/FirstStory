///<reference path="game.ts"/>
///<reference path="saver.ts"/>

module Main{
    var thisgame: Game = null;
    var saver: Saver = null;

    function start(): void{
        console.log("I just executed!!!");
        thisgame = new Game();
        saver = new Saver(thisgame);

        thisgame.set_saver(saver);

        thisgame.resume_from_save(decodeURIComponent(document.cookie));

    }

    start();

    if(thisgame.loadOK){
        console.log("Game has properly initiated!");
    }

    var body = document.body;
    var statbar_container = document.getElementById("stats");

    console.log(body);
    
    statbar_container.appendChild(thisgame.create_list());
    statbar_container.appendChild(saver.generate_save_button());
    statbar_container.appendChild(saver.generate_delete_save_button());
    if(true){
        //This will prooobably get changed to something controlled externally, instead of being always set..
        var devmenu = thisgame.display_dev_options();

        body.appendChild(devmenu);
    }

}
