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

    /**
     * test_query
     */
    public test_query() {
        this.client.query('SELECT * FROM room', (err, res) =>{
            console.log(err, res);
        })
    }
}
