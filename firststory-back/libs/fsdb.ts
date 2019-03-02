import * as pg from 'pg'; 

export class fsdb_client {
    public client;

    constructor(user,host,database,password){
        this.client = new pg.Client({
            user: user,
            host: host,
            database: database,
            password: password,
            port: 5432
        });
        this.client.connect();
    }

    /**
     * fetch_room
     */
    public async fetch_room(room_id) {

        const room_ret = await this.client.query({
        name: 'fetch-room',
        text: 'SELECT * FROM room WHERE id = $1 LIMIT 1',
        values: [room_id]
        })
        return room_ret.rows[0];
    }
    
    public async fetch_room_objects(room_id){

        const obj_ret = await this.client.query({
            name: 'fetch-objects',
            text: 'SELECT * FROM objects WHERE loc_room_id = $1',
            values: [room_id]
        })

        return obj_ret.rows;
    }

    public async fetch_room_events(room_id){
        const events_ret = await this.client.query({
            name: 'fetch-events',
            text: 'SELECT * FROM events WHERE loc_room_id = $1',
            values: [room_id]
        })
        return events_ret.rows;
    }

    public async fetch_room_full(room_id){

        return new Promise(resolve => {
            this.fetch_room(room_id).then(room_details => {
                console.log("got room");
                this.fetch_room_objects(room_id).then(objects => {
                    console.log("got objects");
                    this.fetch_room_events(room_id).then(events => {
                        console.log("got events");
                        var room_profile = {room_data: room_details, objects: objects, events: events};
    
                        resolve(room_profile);
                    });
                });
            });
    
        })


    }

    /**
     * test_query
     */
    public test_query() {
        this.client.query('SELECT * FROM room', (err, res) =>{
            console.log(err, res);
        })
    }
}
