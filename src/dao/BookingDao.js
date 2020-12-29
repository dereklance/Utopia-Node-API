import connection from '../utility/Connection.js';
import { HttpStatus } from '../constants/HttpStatus.js';
import ThrowSqlError from '../utility/ThrowSqlError.js'

let bookingDao = {};

const TABLE_NAME = 'tbl_booking';
const PRIMARY_KEY = 'bookingId';

bookingDao.findById = async (id, db) => {
    const [ rows ] = await db.query(`select * from ${TABLE_NAME} where ${PRIMARY_KEY} = ?`, id);
    const booking = rows[0];
    if (!booking) {
        throw {
            status  : HttpStatus.NOT_FOUND,
            message : `Booking of id ${id} not found.`
        };
    }
    return booking;
};

bookingDao.create = async (booking, db) => {
    const [ response ] = await db.query(`insert into ${TABLE_NAME} set ?`, booking).catch((err) => {
        throw {
            status  : HttpStatus.BAD_REQUEST,
            message : err
        };
    });
    return response.insertId;
};

bookingDao.delete = async (id, db) => {
    const [ response ] = await db.query(`delete from ${TABLE_NAME} where ${PRIMARY_KEY} = ?`, id);
    if (response.affectedRows === 0) {
        throw {
            status  : HttpStatus.NOT_FOUND,
            message : `Booking of id ${id} not found.`
        };
    }
    return response;
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
