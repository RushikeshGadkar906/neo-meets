const bcrypt = require('bcrypt');
const adminModel = require('../models/admin');

const getAdmins = async(req, res) => {
    try {
        const admins = await adminModel.find().lean();;
        admins.forEach((admin) => {
            delete admin.password;
        });
        console.log(admins);

        res.status(201).send({ data: admins })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong" })
    }
}

const registerAdmin = async(req, res) => {
    let user = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    try {
        const doc = await adminModel.create(user);
        res.status(201).send({ message: "Admin Created" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong" })
    }
}

module.exports = {
    getAdmins,
    registerAdmin
}