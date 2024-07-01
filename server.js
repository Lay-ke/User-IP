const express = require('express');

const app = express();
app.use(express.json());

app.use('/', (req, res) => {
    console.log(req.socket.remoteAddress)
    res.send({Message: 'yeah'})
    console.log('we inside!') 
})

app.listen( 5000, ()=> {
    console.log('Listening on port 5000...')
});

module.exports = app
