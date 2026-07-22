require("dotenv").config();

const axios = require("axios");
const nodemailer = require("nodemailer");

const websiteURL = "https://www.dbuzzz.com/thank-you-page";

async function checkWebsite() {
  try {
    const response = await axios.get(websiteURL, {
      timeout: 15000,
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    if (response.status === 200) {
      console.log("✅ Website is working correctly.");
      return;
    }

    console.log("⚠️ Website returned status:", response.status);

  } catch (error) {
    console.log("❌ Website problem detected!");
    console.log(error.message);

    await sendEmail();
  }
}


async function sendEmail() {

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });


  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: "🚨 Website Form Monitor Alert",
    text:
      `Your website may have an issue.\n\n` +
      `Checked URL: ${websiteURL}\n` +
      `Time: ${new Date().toISOString()}`
  };


  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Alert email sent successfully.");
  } catch (error) {
    console.log("❌ Email sending failed:");
    console.log(error.message);
  }
}


checkWebsite();
