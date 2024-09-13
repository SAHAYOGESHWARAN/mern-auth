
const twilio = require('twilio');
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendOtp = (to, otp) => {
  return client.messages.create({
    body: `Your OTP code is ${otp}`,
    from: TWILIO_PHONE_NUMBER,
    to,
  });
};

module.exports = { sendOtp };
