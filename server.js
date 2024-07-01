const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const ipstackAccessKey = process.env.IPSTACKACCESSKEY;
const PORT = process.env.PORT;

app.get('/api/home', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null);
    console.log('User IP:', ip);
    const {visitor_name} = req.query;
    console.log(visitor_name);
    try {
        const response = await axios.get(`http://api.ipstack.com/${ip}?access_key=${ipstackAccessKey}`);
        const city = response.data.city;
        console.log('User City:', city);
        res.send({client_ip: ip, location: city, greeting: `Hello, ${visitor_name}!, the temperature is 11 degrees Celcius in ${city}`});
    } catch (error) {
        console.error('Error fetching city information:', error);
        res.status(500).send({ Message: 'Error fetching city information' });
    }
})

app.listen( PORT, ()=> {
    console.log(`Listening on port ${PORT}...`)
});

