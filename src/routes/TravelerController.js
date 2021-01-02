// Imports --------------------------------------------------------//
import express from 'express';
import travelerService from '../service/TravelerService.js';
import HttpStatus from '../constants/HttpStatus.js';

// Variables ------------------------------------------------------//
const router = express.Router();

// Routes ----------------------------------------------------------//
router.get('/:travelerId',  (req, res, next) => {
    let travelerId = req.params.travelerId;
    travelerService.getTravelerById(travelerId)
        .then((traveler) => {
            res.status(HttpStatus.OK).send(traveler);
    })
    .catch(next);
});

router.delete('/:travelerId', (req, res, next) => {
    const travelerId = req.params.travelerId;
    travelerService
        .deleteById(travelerId)
        .then(() => {
            res.status(HttpStatus.OK).send('Traveler successfully deleted.');
        })
        .catch(next);
});

router.put('/:travelerId', (req, res, next) => {
    const traveler = req.body;
    travelerService
        .updateTraveler(traveler)
        .then(() => {
            return res.json(traveler).status(200);
        })
        .catch(next)
});

router.post('/:travelerId', (req, res, next) => {
    const traveler = req.body;
    travelerService.createTraveler(traveler)
        .then((traveler) => {
        res.status(HttpStatus.CREATED).json(traveler);    
    })
    .catch(next);
 });

// Exports -------------------------------------------------------//
export default router;
