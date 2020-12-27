export default (err, req, res, next) => {
    res.status(err.status);
    res.json(err);
    next();
};
