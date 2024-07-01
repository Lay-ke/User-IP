const express = require('express');

const app = express();

app.listen( 5001, ()=> {
    console.log('Listening on port 5001...')
});

app.get('/', (req, res) => {
    console.log(req.socket.remoteAddress)
    res.json({Message: 'yeah'})
    console.log('we inside!') 
})