// /services/emailService.js
const nodemailer = require("nodemailer");
const { COMPANY_SENDING_MAIL, COMPANY_MAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: COMPANY_SENDING_MAIL,
    pass: COMPANY_MAIL_PASSWORD,
  },
});

const sendEmail = async (emailOptions) => {
  try {
    const info = await transporter.sendMail(emailOptions);
    return info;
  } catch (error) {
    throw new Error("Email sending failed");
  }
};

module.exports = { sendEmail };
