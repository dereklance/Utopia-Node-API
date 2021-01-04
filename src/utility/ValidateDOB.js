import moment from 'moment';
import HttpStatus from '../constants/HttpStatus.js';

let validateDOB = {};
// simple is date valid
validateDOB.parseDOB = (dob) => {
    dob = dob.slice(0, 10);
    if (moment(dob, "YYYY-MM-DD", true).isValid()) return dob;
    if (moment(dob, "MM-DD-YYYY", true).isValid()) {
        return dob.slice(6, 10) + "-" + dob.slice(0, 2) + "-" + dob.slice(3, 5);
    }
        throw {
            status: HttpStatus.BAD_REQUEST,
            message: `Date of Birth is invalid,  ${dob}`
    }
};
    
export default validateDOB;
