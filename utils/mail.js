import nodemailer from "nodemailer";
import config from "config";
import mg from 'nodemailer-mailgun-transport'
const key = config.get("nodemailer.api_key");
const domain = config.get("nodemailer.maligu_domain");
const auth = {
  auth: {
    api_key: key,
    domain: domain,
  }
}

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

export async function mailGenerator(from, to, inputs) {
  let mailOptions = {
    from: from,
    to: to,
    ...inputs,
  };
  nodemailerMailgun.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + to);
    }
  });
}
