const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const ipstackAccessKey = process.env.IPSTACKACCESSKEY;
const openWeatherMapApiKey = process.env.OPENWEATHERKEY;

const PORT = process.env.PORT;

app.get('/api/home', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null);
    console.log('User IP:', ip);
    const {visitor_name} = req.query;

    try {
         // Get location details from ipstack
         const ipstackResponse = await axios.get(`http://api.ipstack.com/${ip}?access_key=${ipstackAccessKey}`);
         const { city, latitude, longitude } = ipstackResponse.data;
         console.log('User City:', city);
 
         if (!city) {
             throw new Error('City not found for IP address');
         }
 
         // Get weather details from OpenWeatherMap
         const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${openWeatherMapApiKey}`);

         const temperature = weatherResponse.data.main.temp;
        res.send({client_ip: ip, location: city, greeting: `Hello, ${visitor_name}!, the temperature is ${temperature} degrees Celcius in ${city}`});
    } catch (error) {
        console.error('Error fetching city information:', error);
        res.status(500).send({ Message: 'Error fetching city information' });
    }
})

app.listen( PORT, ()=> {
    console.log(`Listening on port ${PORT}...`)
});

