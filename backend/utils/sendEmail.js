const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.log('Error sending email', error);
  }
};

module.exports = sendEmail;
const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.log('Error sending email', error);
  }
};

module.exports = sendEmail;
