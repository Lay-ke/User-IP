const express = require('express');

const app = express();
app.use(express.json());

app.use('/', (req, res) => {
    console.log(req.socket.remoteAddress)
    res.json({Message: 'yeah', Your_IP: req.socket.remoteAddress})
    console.log('we inside!') 
})

app.listen( 5000, ()=> {
    console.log('Listening on port 5000...')
});

