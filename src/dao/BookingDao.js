import connection from './Connection.js';
import HttpStatus from '../constants/HttpStatus.js';

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

bookingDao.create = (booking, db) => {
    return db.query(`insert into ${TABLE_NAME} set ?`, booking).catch((err) => {
        throw {
            status  : HttpStatus.BAD_REQUEST,
            message : err
        };
    });
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

// const deleteBooking = async (id, db) => {
//     const [ response ] = await db.query(`delete from tbl_booking where bookingId = ${id}`);
//     return response;
// };

// const deleteBookingTraveler = async (id, db) => {
//     const [ response ] = await db.query(
//         `delete from tbl_bookings_has_travelers where bookingId = ${id}`
//     );
//     return response;
// };

// const deleteFlightBooking = async (id, db) => {
//     const [ response ] = await db.query(
//         `delete from tbl_flight_has_bookings where bookingId = ${id}`
//     );
//     if (response.affectedRows === 0) {
//         throw {
//             status  : HttpStatus.INTERNAL_ERROR,
//             message : `Data Integrity Error: No flight booking to delete.`
//         };
//     }
//     return response;
// };

// bookingDao.deleteBookingById = async (id) => {
//     const db = await connection;

//     await db.beginTransaction();
//     await bookingDao.getBookingById(id);
//     await Promise.all([ deleteBookingTraveler(id, db), deleteFlightBooking(id, db) ]);
//     await deleteBooking(id, db);
//     return db.commit();
// };

// bookingDao.getBookingsByUserId = async (id) => {
//     const db = await connection;
//     const [ rows ] = await db.query(`select * from tbl_booking where bookerId = ${id}`);
//     if (!rows[0]) {
//         throw {
//             status  : 404,
//             message : `Booking of user id ${id} not found.`
//         };
//     }
//     return rows;
// };

export default bookingDao;
