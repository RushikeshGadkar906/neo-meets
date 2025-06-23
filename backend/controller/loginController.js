const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const superAdminModel = require('../models/superadmin');
const adminModel = require('../models/admin');
const employeeModel = require('../models/employee');

const login = async(req, res) => {
    let userCred = req.body;
    let checkUserChar = userCred.empCode.split('')

    try {
        if (checkUserChar[0] == 'S') {
            // console.log("sup");
            const user = await superAdminModel.findOne({ empCode: userCred.empCode })
            if (user !== null) {
                const success = await bcrypt.compare(userCred.password, user.password);

                if (success === true) {
                    jwt.sign({ email: userCred.email }, "neo-meet-room", (err, token) => {
                        if (!err) {
                            res.status(200).send({ message: "Login Successfully", token: token, userId: user._id, role: user.role })
                        }
                    });
                } else {
                    res.status(403).send({ message: "Access denied: Invalid Password" })
                }
            } else {
                res.status(404).send({ message: "Access denied: Invalid Email" })
            }
        } else if (checkUserChar[0] == 'A') {
            const user = await adminModel.findOne({ empCode: userCred.empCode })
            if (user !== null) {
                const success = await bcrypt.compare(userCred.password, user.password);

                if (success === true) {
                    jwt.sign({ email: userCred.email }, "neo-meet-room", (err, token) => {
                        if (!err) {
                            res.status(200).send({ message: "Login Successfully", token: token, userId: user._id, role: user.role })
                        }
                    });
                } else {
                    res.status(403).send({ message: "Access denied: Invalid Password" })
                }
            } else {
                res.status(404).send({ message: "Access denied: Invalid Email" })
            }
        } else {
            const user = await employeeModel.findOne({ empCode: userCred.empCode })
            if (user !== null) {
                const success = await bcrypt.compare(userCred.password, user.password);

                if (success === true) {
                    jwt.sign({ email: userCred.email }, "neo-meet-room", (err, token) => {
                        if (!err) {
                            res.status(200).send({ message: "Login Successfully", token: token, userId: user._id, role: user.role })
                        }
                    });
                } else {
                    res.status(403).send({ message: "Access denied: Invalid Password" })
                }
            } else {
                res.status(404).send({ message: "Access denied: Invalid Email" })
            }
        }


    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    login,
}