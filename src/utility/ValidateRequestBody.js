export const Request = {
    TRAVELER : [ 'travelerId', 'name', 'address', 'phone', 'email', 'dob' ]
};

export default (requestType, requestToValidate) => {
    const requestFields = Object.keys(requestToValidate);

    return (
        requestFields.every((field) => requestType.includes(field)) &&
        requestFields.length === requestType.length
    );
};
