module.exports = (err, req, res, next) => {
    if (err.name === 'AuthenticationError') {
        return res.status(401).json({ error: err.message });
    }
    next(err);
};
