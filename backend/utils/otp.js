const axios = require('axios');

const sendOtp = async(employee) => {
    console.log(employee, "OTP")
    const data = {
        route: 'q', // For transactional OTP route
        message: `Your OTP is ${employee.otp}`,
        language: 'english',
        flash: 0,
        numbers: employee.mobile
    };

    try {
        await axios.post('https://www.fast2sms.com/dev/bulkV2', data, {
            headers: {
                'authorization': process.env.FAST2SMS_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        return true;
    } catch (err) {
        console.error('Error sending OTP:');
        return false;
    }
};

module.exports = sendOtp;