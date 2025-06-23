const mongoose = require('mongoose');

const superAdminSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    empCode: {
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
        default: 'superadmin'
    }
}, { timestapms: true })

const superAdminModel = mongoose.model("superadmin", superAdminSchema)

module.exports = superAdminModel;