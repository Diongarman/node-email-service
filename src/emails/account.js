const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendAngularCvEmail = (email, subject, body) => {
  sgMail.send({
    to: process.env.EMAIL_SENDER,
    from: process.env.EMAIL_SENDER,
    subject: `Email from ${email} via CV site: ${subject}`,
    text: body
  });
};

module.exports = {
  sendAngularCvEmail
};
