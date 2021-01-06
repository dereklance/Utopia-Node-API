import flightDao from '../dao/FlightDao.js';
import connection from '../dao/Connection.js';

let flightService = {};

flightService.getFlightById = async (flightId) => {
    const db = await connection;
    return flightDao.findById(flightId, db);
};

export default flightService;
