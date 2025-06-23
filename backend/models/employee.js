const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
        fname: {
            type: String,
            required: true
        },
        lname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        empCode: {
            type: String,
            required: true
        },
        mobile: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['employee', 'admin', 'superadmin'],
            default: 'employee',
        }
    }, { timestapms: true })
    // const employeeSchema = mongoose.Schema({
    //     email: {
    //         type: String,
    //         required: true
    //     },
    //     empCode: {
    //         type: String,
    //         required: true
    //     },
    //     mobile: {
    //         type: String,
    //         required: true
    //     },
    //     password: {
    //         type: String,
    //         required: true
    //     },
    //     role: {
    //         type: String,
    //         enum: ['employee', 'admin', 'superadmin'],
    //         default: 'employee',
    //     },
    //     otp: {
    //         type: String,
    //         required: true
    //     },
    //     otpExpiry: {
    //         type: Date,
    //         required: true
    //     },
    //     isVerified: {
    //         type: Boolean,
    //         default: false,
    //     }
    // }, { timestapms: true })

const employeeModel = mongoose.model("employees", employeeSchema)

module.exports = employeeModel;