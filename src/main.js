// Imports --------------------------------------------------------//
const bodyParser = require('body-parser');
const express = require('express');
const booking = require('./routes/booking');
const traveler = require('./routes/traveler');
const morgan = require('morgan');

// Variables ------------------------------------------------------//
const app = express();
const PORT = process.env.PORT || 3000;

//logger
app.use(morgan(process.env.MODE || 'dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
   next();
});

app.use(bodyParser.json());

app.use('/api/booking', booking);
app.use('/api/traveler', traveler)

app.get('/', (req, res) => {
   res.send('Hello world');
});



app.listen(PORT);
console.log('Server is running on port: ' + PORT + '...');

