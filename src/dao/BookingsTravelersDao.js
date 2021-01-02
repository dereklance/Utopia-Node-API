import HttpStatus from '../constants/HttpStatus.js';

let bookingsTravelersDao = {};

const TABLE_NAME = 'tbl_bookings_has_travelers';

bookingsTravelersDao.deleteByBookingId = (id, db) =>
    db.query(`delete from ${TABLE_NAME} where bookingId = ?`, id);

bookingsTravelersDao.deleteByTravelerId = (id, db) =>
    db.query(`delete from ${TABLE_NAME} where travelerId = ?`, id);

bookingsTravelersDao.create = (obj, db) =>
    db.query(`insert into ${TABLE_NAME} set ?`, obj).catch((err) => {
        throw {
            status  : HttpStatus.BAD_REQUEST,
            message : 'Bad request. Key constraint failed.'
        };
    });

bookingsTravelersDao.getAllByBookingId = async (id, db) => {
    const [result] = await db.query(`select * from ${TABLE_NAME} where bookingId = ?`, id);
    return result;
}

export default bookingsTravelersDao;
