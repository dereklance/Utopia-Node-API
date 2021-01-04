import HttpStatus from '../constants/HttpStatus.js';

let flightBookingsDao = {};

const TABLE_NAME = 'tbl_flight_has_bookings';

flightBookingsDao.deleteByBookingId = (id, db) =>
    db.query(`delete from ${TABLE_NAME} where bookingId = ?`, id);

flightBookingsDao.create = (obj, db) =>
    db.query(`insert into ${TABLE_NAME} set ?`, obj).catch((err) => {
        throw {
            status  : HttpStatus.BAD_REQUEST,
            message : `Flight id '${obj.flightId}' does not exist.`
        };
    });

export default flightBookingsDao;
