import connection from '../dao/Connection.js';
import travelerDao from '../dao/TravelerDao.js';
import bookingsTravelersDao from '../dao/BookingsTravelersDao.js';
import ThrowSqlError from "../utility/ThrowSqlError.js";
import HttpStatus from "../constants/HttpStatus.js";

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

travelerService.getAllByBookingId = async (bookingId) => {
    const db = await connection;
    let promises;
    let travelers;
    const travelerBookings = await bookingsTravelersDao.getAllByBookingId(bookingId, db);
    if (travelerBookings.length == 0) {
        throw {
            status  : HttpStatus.BAD_REQUEST,
            message : `No Booking with bookingID: ${bookingId}`
        };
    }
    promises = travelerBookings.map(traveler => travelerDao.getById(traveler.travelerId, db));
    travelers = (await Promise.all(promises)).map(traveler => traveler[0]);
    if (travelers.length == 0) {
        throw {
            status  : HttpStatus.NOT_FOUND,
            message : `tavelers for booking with bookingID: ${bookingId} not found`
        };
    }
    return travelers;
}

export default travelerService;
