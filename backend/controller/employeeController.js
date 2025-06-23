const bcrypt = require('bcrypt');
const employeeModel = require('../models/employee');
// const sendOtp = require('../utils/otp');

const registerEmployee = async(req, res) => {
    let employee = req.body;

    // const otp = Math.floor(100000 + Math.random() * 900000);
    // const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(employee.password, salt);

    employee.password = hash;
    try {
        const isEmployee = await employeeModel.findOne({ email: employee.email, empCode: employee.empCode })

        if (isEmployee === null) {
            const doc = await employeeModel.create(employee);
            res.status(201).send({ message: "Employee Created" })
        } else {
            res.send({ message: "Employee Already Exist" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong" })
    }

    // employee.otp = otp;
    // employee.otpExpiry = otpExpiry;
    // try {
    //     const isEmployee = await employeeModel.find({ mobile: employee.mobile })
    //     if (isEmployee) {
    //         const isSent = await sendOtp(employee);
    //         console.log(isSent, "jjjjj")

    //         if (!isSent) {
    //             return res.send({ message: 'Failed to send OTP' });
    //         }
    //         res.send({ message: 'OTP sent to mobile' })
    //     } else {
    //         res.send({ message: "Mobile Number Already Existed" })
    //     }
    // } catch (error) {
    //     console.log(error);
    //     res.send({ message: "Something went wrong" })
    // }
}

module.exports = {
    registerEmployee,
}