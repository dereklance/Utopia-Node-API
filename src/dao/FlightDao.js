import HttpStatus from '../constants/HttpStatus.js';

let flightDao = {};

const TABLE_NAME = 'tbl_flight';
const PRIMARY_KEY = 'flightId';

flightDao.findById = async (id, db) => {
    const [ rows ] = await db.query(`select * from ${TABLE_NAME} where ${PRIMARY_KEY} = ?`, id);
    const flight = rows[0];
    if (!flight) {
        throw {
            status  : HttpStatus.NOT_FOUND,
            message : `Could not find flight of id ${id}.`
        };
    }
    return flight;
};

const numberToMathOperator = (number) => (number < 0 ? number : `+${number}`);

flightDao.updateSeatsAvailableById = async (id, db, seatDifference) => {
    if (seatDifference === 0) return;
    const query = `update ${TABLE_NAME} set seatsAvailable = seatsAvailable ${numberToMathOperator(
        seatDifference
    )} where ${PRIMARY_KEY} = ${id} and seatsAvailable >= ${seatDifference < 0
        ? Math.abs(seatDifference)
        : 0}`;
    const [ result ] = await db.query(query);
    if (result.affectedRows !== 1) {
        throw {
            status  : HttpStatus.BAD_REQUEST,
            message : 'Not enough seats remaining on flight.'
        };
    }
    return result;
};

export default flightDao;
