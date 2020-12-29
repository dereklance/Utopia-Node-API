export default (err, req, res, next) => {
    console.error(err);
    res.status(err.status);
    res.json(err);
    next();
};
