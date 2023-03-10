import nodemailer from "nodemailer";

const SendMail = (options, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  const mailOptions = {
    from: process.env.YOUR_MAIL,
    to: options.to,
    subjects: options.subject,
    html: options.html,
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      return res.status(400).json({
        error: "Something is wrong! Please try",
      });
    } else {
      return res.status(200).json({
        message: `Email has been sent to ${options.to}`,
      });
    }
  });
};

export default SendMail;
