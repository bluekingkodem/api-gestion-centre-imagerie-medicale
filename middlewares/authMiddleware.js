const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const auth = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        // console.log(token);
    }

    // console.log(req.headers)

    if (!token) {
        res.status(401);
        throw new Error('Pas de token, accès refusé');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) {
            res.status(401);
            throw new Error('Utilisateur non trouvé!');
        }

        req.user = user;

        next();
    } catch (error) {
        res.status(401)
        throw new Error('Utilisateur non trouvé !')
    }

});

module.exports = auth;