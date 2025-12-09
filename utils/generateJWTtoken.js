const jwt = require('jsonwebtoken');

exports.generateJWTtoken = (id) => jwt.sign(
    { id }, 
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRES_IN }
)