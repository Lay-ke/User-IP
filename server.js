const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const ipstackAccessKey = '70e69423d81ff520fd6d39d335eecde1';

app.get('/', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null);
    console.log('User IP:', ip);
    try {
        const response = await axios.get(`http://api.ipstack.com/${ip}?access_key=${ipstackAccessKey}`);
        const city = response.data.city;
        console.log('User City:', city);
        res.send({ Message: 'yeah', IP: ip, City: city });
    } catch (error) {
        console.error('Error fetching city information:', error);
        res.status(500).send({ Message: 'Error fetching city information' });
    }
})

app.listen( 5000, ()=> {
    console.log('Listening on port 5000...')
});

