import * as express from 'express'
import * as session from 'express-session'
import * as cookieParser from 'cookie-parser'
import { Session } from 'inspector'
import {fsdb_client} from '../libs/fsdb';

const config = require('../../config.json')
const rootpath = require('path')
const fs = require('fs')

const appDir = rootpath.dirname(require.main.filename);

const cfg_viewspath = config['viewspath']
const src_path = config['resourcepath']
const style_path = config['stylepath']
const angular_path = config['angularpath']
const bodyParser = require('body-parser')

const cors = require('cors');
const fsdb_conn = new fsdb_client(config['dbuser'], config['dbhost'], config['database'], config['password']);

class App {
    public express;
    public session;

    constructor () {
        this.express = express();
        const sess = require('express-session')
        this.express.use(sess({'secret':'itsasecret'}))
        this.express.use(cors());
        this.express.use(bodyParser.json());
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

        router.get('/domtest', (req, res, next) =>{

            res.sendFile(cfg_viewspath + 'main.html');

        })

        router.get('/fgame.js', (req, res, next) =>{
            res.sendFile(src_path + 'fgame.js');

        })

        router.get('/navbar.css', (req, res, next) =>{
            res.sendFile(style_path + '/navbar.css');
        })

        router.get('/simplefetch', (req, res, next)=>{
            res.set({
                'Content-Type': 'application/json'
            });

            res.json({name: 'Dorm_1', objects: ['o:1:1', 'o:1:2', 'o:1:3'], events: ['e:1:1', 'e:1:2'], id:1});
        })

        /*
         * Main Room Fetch Function
         *
         */
        router.get('/retrieve_room', (req,res,next)=>{
            console.log("Attempting to retrieve room...");
            
            var user_json = req.body;
            fsdb_conn.fetch_room(user_json['id']).then(db_ret =>{
                res.json(db_ret);
            });
        })

        router.get('/getangularfe', (req, res, next)=>{
            res.sendFile(angular_path+'/index.html')
        })

        router.get('/runtime.js', (req, res, next) =>{
            res.sendFile(angular_path+'/runtime.js');
        })

        router.get('/polyfills.js', (req, res, next) =>{
            res.sendFile(angular_path+'/polyfills.js');
        })

        
        router.get('/styles.js', (req, res, next) =>{
            res.sendFile(angular_path+'/styles.js');
        })

        router.get('/vendor.js', (req, res, next) =>{
            res.sendFile(angular_path+'/vendor.js');
        })
       
        router.get('/main.js', (req, res, next) =>{
            res.sendFile(angular_path+'/main.js');
        })
        this.express.use('/', router);
    }
}

export default new App().express