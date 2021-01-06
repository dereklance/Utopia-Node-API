import connection from '../dao/Connection.js';
import travelerDao from '../dao/TravelerDao.js';
import bookingsTravelersDao from '../dao/BookingsTravelersDao.js';
import HttpStatus from '../constants/HttpStatus.js';
import validateDOB from '../Utility/ValidateDOB.js';
import ThrowSqlError from '../Utility/ErrorHandler.js';
import validRequestFormat, { Request } from '../Utility/ValidateRequestBody.js';

let travelerService = {};

travelerService.getTravelerById = async (id) => {
    const db = await connection;
    const traveler = await travelerDao.findById(id, db);
    return traveler;
};

travelerService.deleteById = async (id) => {
    const db = await connection;
    await bookingsTravelersDao.deleteByTravelerId(id, db);
    return travelerDao.delete(id, db);
};

travelerService.updateTraveler = async (traveler) => {
    const db = await connection;
    if (!validRequestFormat(Request.TRAVELER, traveler)) {
        throw {
            status  : HttpStatus.NOT_FOUND,
            message : `Invalid JSON in request body`
        };
    }
    traveler.dob = validateDOB.parseDOB(traveler.dob);
    const hasTravelerId = await travelerDao.hasTravelerId(traveler.travelerId, db);

    if (!hasTravelerId) {
        throw {
            status  : HttpStatus.NOT_FOUND,
            message : `Traveler id ${traveler.travelerId} not found.  Attempt to update non-existing Traveler`
        };
    }

    await travelerDao.updateTraveler(traveler, db);
};

travelerService.createTraveler = async (traveler) => {
    const db = await connection;
    traveler.dob = validateDOB.parseDOB(traveler.dob);
    const hasTravelerId = await travelerDao.hasTravelerId(traveler.travelerId, db);

    if (hasTravelerId) {
        throw {
            status  : HttpStatus.BAD_REQUEST,
            message : `Traveler id ${traveler.travelerId} exist.  Attempt to add existing Traveler`
        };
    }

    try {
        await db.beginTransaction();
        travelerDao.create(traveler, db);
        await db.commit();
        return { traveler };
    } catch (err) {
        await db.rollback();
        throw err;
    }
};
travelerService.addBooking = async (traveler, bookingId) => {
    const db = await connection;
    const travelerId = await travelerDao.create(traveler, db).catch((e) => ThrowSqlError(e, db));
    await bookingsTravelersDao
        .create({ bookingId, travelerId }, db)
        .catch((e) => ThrowSqlError(e, db));
    db.commit();
};

travelerService.getAllByBookingId = async (bookingId) => {
    const db = await connection;

    const travelers = await bookingsTravelersDao.getAllByBookingId(bookingId, db);
    if (travelers.length == 0) {
        throw {
            status  : HttpStatus.NOT_FOUND,
            message : `travelers for booking with bookingID: ${bookingId} not found`
        };
    }
    return travelers;
};

export default travelerService;
