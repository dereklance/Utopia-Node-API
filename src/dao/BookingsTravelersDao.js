import HttpStatus from '../constants/HttpStatus.js';

let bookingsTravelersDao = {};

const TABLE_NAME = 'tbl_bookings_has_travelers';

bookingsTravelersDao.delete = (id, db) =>
    db.query(`delete from ${TABLE_NAME} where bookingId = ?`, id);

bookingsTravelersDao.create = (obj, db) =>
    db.query(`insert into ${TABLE_NAME} set ?`, obj).catch((err) => {
        throw {
            status  : HttpStatus.BAD_REQUEST,
            message : err
        };
    });

export default bookingsTravelersDao;
