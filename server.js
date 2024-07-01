const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null);
    console.log('User IP:', ip);
    res.json({Message: 'yeah', Your_IP: ip})
})

app.listen( 5000, ()=> {
    console.log('Listening on port 5000...')
});

