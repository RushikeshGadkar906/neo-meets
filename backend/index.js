require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const adminRouter = require('./routes/adminRouter');
const loginRouter = require('./routes/loginRouter')
const superadminRouter = require('./routes/superadminRouter')
const employeeRouter = require('./routes/employeeRouter')

mongoose.connect(process.env.MONGO_URI)
    .then((res) => console.log("Mongoose Server Up"))
    .catch((err) => console.log(err))

const app = express();
app.use(express.json());
app.use(cors())

// Routes
app.use('/login', loginRouter)
app.use('/superadmin', superadminRouter)
app.use('/admin', adminRouter)

app.use('/employee', employeeRouter)



app.listen(process.env.PORT, (res) => {
    console.log("Express Server Up");
})