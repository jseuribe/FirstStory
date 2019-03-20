
export class Object {
    public object_id: Number;
    public loc_room_id: Number;
    public state: Number;
    public active_at_room_state: Number;
    public key_item: Boolean;
    public name: String;
    public description: String;

    constructor() {
        this.object_id = -1;
        this.loc_room_id = -1;
        this.state = 0;
        this.key_item = false
    }

    public set_room_info(data){
        this.object_id = data.object_id;
        this.name = data.object_name;
        this.loc_room_id = data.loc_room_id;
        this.key_item = data.is_key_item;
        this.description = data.description;
        this.active_at_room_state = data.active_at_room_state
    }

    public set_state(n_state){
        this.state = n_state;
    }

    public get_as_json(){

        return {
            object_id: this.object_id,
            name: this.name,
            loc_room_id: this.loc_room_id,
            key_item: this.key_item,
            active_at_room_state: this.active_at_room_state,
            description: this.description 
        }
    }
}