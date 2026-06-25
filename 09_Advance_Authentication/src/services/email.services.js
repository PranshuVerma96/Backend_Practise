import nodemailer from "nodemailer";
import config from "../config/config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAUTH2",
    user: config.GOOGLE_USER,
    clientId: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    refreshToken: config.GOOGLE_REFRESH_TOKEN,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("error connecting to email server");
  } else {
    console.log("email server is ready to send message");
  }
});

export const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      form: `your name < ${config.GOOGLE_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("message sent %s", info.messageId);
    console.log("preview Url %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log("error sending email ", error);
  }
};

