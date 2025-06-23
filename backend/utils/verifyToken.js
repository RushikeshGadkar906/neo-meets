const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    console.log(req.body, "token");

    if (req.headers.authorization !== undefined) {
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, 'neo-meet-room', (err, data) => {
            if (!err) {
                next()
            } else {
                res.status(403).send({ message: "Invalid Token" })
            }
        })
    } else {
        res.send({ message: "Plz send token" })
    }
}

module.exports = verifyToken;