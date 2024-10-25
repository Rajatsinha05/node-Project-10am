const nodemailer = require("nodemailer");
const { errorMonitor } = require("nodemailer/lib/xoauth2");
require("dotenv").config();
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.email,
    pass: process.env.pass,
  },
});

const sendMail = async (to, subject, html) => {
  return new Promise((resolve, reject) => {
    let mailOptions = {
      from: process.env.email,
      to: to,
      subject: subject,
      html: html,
    };
    transport.sendMail(mailOptions, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
        console.log(result);
      }
    });
  });
};
module.exports = sendMail;
