import app from './app'

//The following checks to see if PORT is defined in the env.
//If not, just use 3000 as the value. Neato.
const port = process.env.PORT || 3000

app.listen(port, (err) => {
    if(err) {
        return console.log(err);
    }

    return console.log(`server is listening on ${port}`);
})