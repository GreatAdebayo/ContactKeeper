const jwt = require('jsonwebtoken');
const config = require('config')

module.exports = function (req, res, next) {
    //Get Token fron header
    const token = req.header('x-auth-token');

    //Check if token
    if (!token) {
        return res.status(401).json({ msg: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();

    } catch (error) {
        res.status(401).json({ msg: 'Unauthorized' });

    }

}