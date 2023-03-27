import nodemailer from "nodemailer";
import config from "config";

const user = config.get('nodemailer.user')
const pass = config.get('nodemailer.pass')

export async function mailGenerator(from, to, inputs) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth:  {
      user, // Sender mail
      pass // Sender mail password
  },
  });
  let mailOptions = {
    from: from,
    to: to,
    ...inputs,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + to);
    }
  });
}
