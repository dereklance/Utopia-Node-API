import connection from '../dao/Connection.js';
import travelerDao from '../dao/TravelerDao.js';
import bookingsTravelersDao from '../dao/BookingsTravelersDao.js';
import ThrowSqlError from "../utility/ThrowSqlError.js";

let travelerService = {};

travelerService.deleteById = async (id) => {
    const db = await connection;
    await bookingsTravelersDao.deleteByTravelerId(id, db);
    return travelerDao.delete(id, db);
};

travelerService.addBooking = async (traveler, bookingId) => {
    const db = await connection;
    const travelerId = await travelerDao.create(traveler, db).catch(e => ThrowSqlError(e, db));
    await bookingsTravelersDao.create({bookingId, travelerId}, db).catch(e => ThrowSqlError(e, db));
    db.commit();
}

export default travelerService;
