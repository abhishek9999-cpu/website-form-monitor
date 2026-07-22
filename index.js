require("dotenv").config();
const axios = require("axios");
const nodemailer = require("nodemailer");

const websiteURL = "https://yourwebsite.com/thank-you-page";

async function checkWebsite() {
  try {
    const response = await axios.get(websiteURL);

    if (response.status === 200) {
      console.log("Website is working correctly.");
    }
  } catch (error) {
    console.log("Website problem detected!");

    sendEmail();
  }
}

function sendEmail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: "asntorento9999@gmail.com",
    subject: "Website Form Issue Detected",
    text: "Your website form or thank-you page may have a problem. Please check it."
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Alert email sent");
    }
  });
}

checkWebsite();
