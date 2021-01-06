import HttpStatus from '../constants/HttpStatus.js';

let flightBookingsDao = {};

const TABLE_NAME = 'tbl_flight_has_bookings';

flightBookingsDao.deleteByBookingId = (id, db) => {
    return db.query(`delete from ${TABLE_NAME} where bookingId = ?`, id);
};

flightBookingsDao.findFlightIdByBookingId = async (id, db) => {
    const [ [ { flightId } ] ] = await db.query(
        `select * from ${TABLE_NAME} where bookingId = ? limit 1`,
        id
    );
    return flightId;
};

flightBookingsDao.create = (obj, db) =>
    db.query(`insert into ${TABLE_NAME} set ?`, obj).catch((err) => {
        throw {
            status  : HttpStatus.BAD_REQUEST,
            message : `Flight id '${obj.flightId}' does not exist.`
        };
    });

export default flightBookingsDao;
