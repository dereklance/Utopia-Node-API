import connection from '../utility/Connection.js';
import { HttpStatus } from '../constants/HttpStatus.js';
import ThrowSqlError from '../utility/ThrowSqlError.js'

let bookingDao = {};

bookingDao.getBookingById = async (id) => {
    const db = await connection;
    const [ rows ] = await db.query(`select * from tbl_booking where bookingId = ${id}`);
    if (!rows[0]) {
        throw {
            status  : HttpStatus.NOT_FOUND,
            message : `Booking of id ${id} not found.`
        };
    }
    return rows[0];
};

const deleteBooking = async (id, db) => {
    const [ response ] = await db.query(`delete from tbl_booking where bookingId = ${id}`);
    return response;
};

const deleteBookingTraveler = async (id, db) => {
    const [ response ] = await db.query(
        `delete from tbl_bookings_has_travelers where bookingId = ${id}`
    );
    return response;
};

const deleteFlightBooking = async (id, db) => {
    const [ response ] = await db.query(
        `delete from tbl_flight_has_bookings where bookingId = ${id}`
    );
    if (response.affectedRows === 0) {
        throw {
            status  : HttpStatus.INTERNAL_ERROR,
            message : `Data Integrity Error: No flight booking to delete.`
        };
    }
    return response;
};

bookingDao.deleteBookingById = async (id) => {
    const db = await connection;

    await db.beginTransaction();
    const booking = await bookingDao.getBookingById(id);
    if (!booking) {
        throw {
            status  : HttpStatus.NOT_FOUND,
            message : `Booking of id ${id} not found.`
        };
    }
    await Promise.all([ deleteBookingTraveler(id, db), deleteFlightBooking(id, db) ]);
    await deleteBooking(id, db);
    return db.commit();
};

bookingDao.getBookingsByUserId = async (id) => {
    const db = await connection;
    const [ rows ] = await db.query(`select * from tbl_booking where bookerId = ${id}`).catch(e => ThrowSqlError(e));
    if (!rows[0]) {
        throw {
            status  : HttpStatus.NOT_FOUND,
            message : `Booking of user id ${id} not found.`
        };
    }
    return rows;
};

bookingDao.updateBooking = async (booking) => {
    const db = await connection;
    const [ rows ] = await db.query(`select * from tbl_booking where bookingId = ${booking.bookingId}`).catch(e => console.error(e));

    if(!booking.bookingId || !booking.isActive || !booking.stripeId || !booking.bookerId) {
        throw {
            status : HttpStatus.BAD_REQUEST,
            message : 'Invalid JSON in request body'
        }
    }

    if (!rows[0]) {
        throw {
            status  : HttpStatus.NOT_FOUND,
            message : `Booking of booking id ${booking.bookingId} not found. Attempt to update non-existing booking`
        };
    }

    await db.query(`update tbl_booking set isActive = ${booking.isActive ? 1 : 0}, stripeId = '${booking.stripeId}', bookerId = ${booking.bookerId} where bookingId = ${booking.bookingId}`)
        .catch( e => ThrowSqlError(e));

    return rows;
} // end bookingDao.updateBooking()

export default bookingDao;
