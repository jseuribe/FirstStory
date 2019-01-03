import * as express from 'express'
import * as session from 'express-session'
import * as cookieParser from 'cookie-parser'
import { Session } from 'inspector'

const config = require('../config.json')
const rootpath = require('path')
const fs = require('fs')

const appDir = rootpath.dirname(require.main.filename);

const cfg_viewspath = config['viewspath']
const src_path = config['resourcepath']

class App {
    public express;
    public session;

    constructor () {
        this.express = express();
        const sess = require('express-session')
        this.express.use(sess({'secret':'itsasecret'}))
        this.mountRoutes();

    }

    private render(resource): any {

        var rfile;

        fs.readFile(src_path + resource, (err, file) =>{
            if (err) return false;
            else rfile = file;
        })

        return rfile;
    }

    private mountRoutes (): void {
        const router = express.Router();
        router.get('/', (req, res, next) => {

            //Order matters!!! call .set before json
            //res.json will send back the response
            //So the headers will never have been set
            res.set({
                'Content-Type': 'application/json',
                'Yeet': 'yote..'
            });

            res.json({
                message: 'Hello World!'
            });

        })

        router.get('/sess', (req, res, next) => {
            if(req.session.page_views){
                req.session.page_views++;
                res.send("You visited this page " + req.session.page_views + " times");

            }
            else{
                req.session.page_views = 1;
                res.send(req.session.game.doesWork);
            }
        })

        router.get('/testgame', (req, res, next) =>{
            /*
            if(req.session.game){
                req.session.game.page_views++;
                res.send("You have an active game session! Also you've viewed this page: " + String(req.session.game.page_views));
            }
            else{
                req.session.game = new Game();
                req.session.game.page_views = 1;
                var pg_view = req.session.game.page_views;

                res.send("Visited Room: " + String(pg_view) + " Putting player in room; Status: " + req.session.game.doesWork);
            }
            */
        })

        router.get('/domtest', (req, res, next) =>{

            res.sendFile(cfg_viewspath + 'main.html');

        })

        router.get('/fgame.js', (req, res, next) =>{
            res.sendFile(src_path + 'fgame.js');

        })

        this.express.use('/', router);
    }
}

export default new App().express