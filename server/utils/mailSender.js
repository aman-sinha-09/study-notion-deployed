const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465, // Use 587 for TLS
      secure: true, // true for port 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: `"Studynotion | CodeHelp" <${process.env.MAIL_USER}>`, // sender address
      to: email, // list of receivers
      subject: title, // Subject line
      html: body, // html body
    });

    console.log(info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    return error.message;
  }
};

module.exports = mailSender;
