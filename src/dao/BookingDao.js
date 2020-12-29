import connection from './Connection.js';
import HttpStatus from '../constants/HttpStatus.js';
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
    const [ rows ] = await db.query(`select * from ${TABLE_NAME} where bookerId = ?`, id).catch(e => ThrowSqlError(e));
    if (!rows[0]) {
        throw {
            status  : HttpStatus.NOT_FOUND,
            message : `Booking of user id ${id} not found.`
        };
    }
    return rows;
};

bookingDao.hasBookingId = async (id, db) => {
    if(!id) return false;
    const bookingList = await bookingDao.findById(id, db).catch(e => false);
    return bookingList.bookingId === id;
}

bookingDao.updateBooking = async (booking, db) => {
    const bookingData = [booking.isActive ? 1 : 0, booking.stripeId, booking.bookerId, booking.bookingId];
    await db.query(`update ${TABLE_NAME} set isActive = ?, stripeId = ?, bookerId = ? where bookingId = ?`, bookingData)
        .catch( e => ThrowSqlError(e));
    return booking;
}

export default bookingDao;
