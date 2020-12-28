import HttpStatus from '../constants/HttpStatus.js';

let travelerDao = {};

const TABLE_NAME = 'tbl_traveler';
const PRIMARY_KEY = 'travelerId';

travelerDao.delete = async (id, db) => {
    const [ response ] = await db.query(`delete from ${TABLE_NAME} where ${PRIMARY_KEY} = ?`, id);
    if (response.affectedRows === 0) {
        throw {
            status  : HttpStatus.NOT_FOUND,
            message : `Could not find traveler of id ${id}.`
        };
    }
    return response;
};

export default travelerDao;
