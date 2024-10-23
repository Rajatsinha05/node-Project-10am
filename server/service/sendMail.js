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
  let mailOptions = {
    from: process.env.email,
    to: to,
    subject: subject,
    html: html,
  };
  await transport.sendMail(mailOptions, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
};

module.exports =sendMail