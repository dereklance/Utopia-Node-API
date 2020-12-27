// Imports --------------------------------------------------------//
import bodyParser from 'body-parser';
import express from 'express';
import booking from './routes/booking/index.js';
import traveler from './routes/traveler/index.js';
import morgan from 'morgan';
import errorHandler from './errorHandler.js';

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
app.use('/api/traveler', traveler);

app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(PORT);
console.log('Server is running on port: ' + PORT + '...');
