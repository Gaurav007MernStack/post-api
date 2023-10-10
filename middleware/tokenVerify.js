const jwt = require('jsonwebtoken');
const { USER } = require("../models/index");


const signToken = (user) => {
    const payload = { sub: user._id };
    return jwt.sign(payload, "secretOrPrivateKey", { expiresIn: '1h' });
};



const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).send({ error: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, "secretOrPrivateKey", async (err, decoded) => {
        if (err) {
            return res.status(400).send({ error: 'Token has expired. Please log in again' });
        }
        const _id = decoded?.sub;
        const user = await USER.findById({ _id: _id });
        if (!user)
            return res.status(404).send({ error: 'User not found' });
        req.user = user;
        next();
    });
};

module.exports = { signToken, verifyToken };
