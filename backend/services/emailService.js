
const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const sendEmail = (to, subject, text) => {
  return transporter.sendMail({
    from: EMAIL_USER,
    to,
    subject,
    text,
  });
};

module.exports = { sendEmail };
