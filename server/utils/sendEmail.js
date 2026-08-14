"use strict";

const { Resend } = require("resend");

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is missing");
}

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, text }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Redeeming Love Chapel <no-reply@devotionals.redeeminglovechapel.org>",
      to,
      subject,
      text,
    });

    if (error) {
      console.error("RESEND EMAIL ERROR:", error);
      throw new Error("Email could not be sent");
    }

    console.log("Email sent successfully to:", to);

    return data;
  } catch (error) {
    console.error("Email send error:", error);
    throw new Error("Email could not be sent");
  }
};

module.exports = sendEmail;
