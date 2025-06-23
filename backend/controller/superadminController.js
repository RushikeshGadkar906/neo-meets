const bcrypt = require('bcrypt');
const superAdminModel = require("../models/superadmin");

const registerSuperAdmin = async(req, res) => {
    let superadmin = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(superadmin.password, salt);

    superadmin.password = hash;
    try {
        const doc = await superAdminModel.create(superadmin);
        res.status(201).send({ message: "SuperAdmin Created" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong" })
    }
}

module.exports = {
    registerSuperAdmin,
}