const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    host: process.env.GMAIL_HOST,
    port: process.env.GMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  return await transporter.sendMail({
    from: process.env.GMAIL_ID,
    to,
    subject,
    html,
  });
};

const sendRegistrationMail = async (to, token) => {
    const subject = 'Account Activation';
  
    const html_content = `
          <h1>Activate your account</h1>    

          <p>Thank you for registering with us, Here is your activation token</p>

            <p>${token}</p>

          <p>Click <a href="https://healthlink-gxhn.onrender.com/api/auth/activate/token=${token}">here</a> to activate your account</p>
          <p>Or copy this link and paste it in your browser</p>

            <p><a href="https://healthlink-gxhn.onrender.com/api/auth/activate/token=${token}"></a></p>

            <p>Regards, HealthLink</p>
      `;
  
    await sendEmail(to, subject, html_content);
  };

  const sendResetPasswordMail = async (to, token) => {
    const subject = 'Reset Password';
  
    const html_content = `
          <h1>Reset your password</h1>    

          <p>Here is your reset password token</p>

            <p>${token}</p>

          <p>Click <a href="https://healthlink-gxhn.onrender.com/api/auth/reset-password/${token}">here</a> to reset your password</p>
          <p>Or copy this link and paste it in your browser</p>

            <p>https/reset-password/${token}</p>

            <p>Regards, HealthLink</p>
      `;
  
    await sendEmail(to, subject, html_content);
  }


module.exports = { sendEmail, sendRegistrationMail, sendResetPasswordMail };