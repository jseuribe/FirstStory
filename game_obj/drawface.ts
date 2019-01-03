class DrawFace{
    private mainstr: string;

    constructor(){
        this.mainstr = 'yeet';
    }

    public demandYeet(){
       var txt =  document.getElementById('stats').innerHTML;
       txt = this.mainstr;
    }
}