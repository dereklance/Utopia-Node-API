import HttpStatus from '../constants/HttpStatus.js';

let bookingsTravelersDao = {};

const TABLE_NAME = 'tbl_bookings_has_travelers';

bookingsTravelersDao.deleteByBookingId = async (id, db) => {
    const [ { affectedRows } ] = await db.query(
        `delete from ${TABLE_NAME} where bookingId = ?`,
        id
    );
    return affectedRows;
};

bookingsTravelersDao.deleteByTravelerId = (id, db) =>
    db.query(`delete from ${TABLE_NAME} where travelerId = ?`, id);

bookingsTravelersDao.create = (obj, db) =>
    db.query(`insert into ${TABLE_NAME} set ?`, obj).catch((err) => {
        throw {
            status  : HttpStatus.BAD_REQUEST,
            message : `One or more provided traveler ids was invalid.`
        };
    });
// [1, 2, 3, 4], bookingId 5 => [[1, 5], [2, 5], [3,5], [4,5]]
bookingsTravelersDao.createAll = async (travelerIds, bookingId, db) => {
    const rows = travelerIds.map((travelerId) => [ travelerId, bookingId ]);
    const [ response ] = await db.query(
        `insert into ${TABLE_NAME} (travelerId, bookingId) values ?`,
        rows
    );
    return response;
};

// take in booking id, return an array of travelers
bookingsTravelersDao.getAllByBookingId = async (id, db) => {
    const [ result ] = await db.query(
        `
        select traveler.*
        from tbl_traveler as traveler
        inner join ${TABLE_NAME} as bookingTravelers
        on traveler.travelerId = bookingTravelers.travelerId
        where bookingId = ?
    `,
        id
    );
    return result;
};

export default bookingsTravelersDao;
