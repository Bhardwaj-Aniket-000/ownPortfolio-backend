const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello world");
});
app.post("/api/getEmail", async (req, res) => {
  const { name, userEmail, userMessage } = req.body;
  // await sendEmail(email, name, message);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.SEND_MAIL,
      pass: process.env.SEND_MAIL_PASSWORD,
    },
  });
  const options = {
    from: userEmail,
    to: process.env.SEND_MAIL,
    subject: `${name} was trying to contact with you .`,
    html: `<p>Name: ${name} </p> <p><a href="mailto:${userEmail}">Email: ${userEmail}</a></p> <p>Message: ${userMessage} </p>`,
  };

  transporter.sendMail(options, (error, info) => {
    if (error) {
      console.log("error : " + error);
      res.json({ msg: "email sent failed", success: false });
      return;
    }
  });
  res.json({ msg: "email sent success", success: true });

  // this is the route for user contact me by email write the code of nodemailer
});

app.listen(7000, () => {
  console.log("server is ready with port : 7000 ");
});
