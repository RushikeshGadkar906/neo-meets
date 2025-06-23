const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
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
        default: 'admin',
    },
    location: {
        type: String,
        required: true
    },
    meetRoomCount: {
        type: Number,
    }
}, { timestapms: true })

const adminModel = mongoose.model("admin", adminSchema)

module.exports = adminModel;