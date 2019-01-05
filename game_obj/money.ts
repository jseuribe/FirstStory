///<reference path="resource.ts"/>

class Money extends Resource{
    public name = "Moni";

    public incr(): any{
        this.count++;
    }
}