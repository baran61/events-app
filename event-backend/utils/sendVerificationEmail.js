const nodemailer = require('nodemailer');
require("dotenv").config();

async function sendVerificationEmail(toEmail, verificationCode) {
  const verificationLink = `${process.env.EXPO_DEV_LINK}/--/verify-email?token=${verificationCode}`;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.EMAIL_USER}`,
      pass: `${process.env.EMAIL_PASS}` 
    }
  });

  const mailOptions = {
  from: `"EventsApp" <${process.env.EMAIL_USER}>`,
  to: toEmail,
  subject: 'Email Doğrulama Linkiniz',
  html: `
    <p>Hesabınızı doğrulamak için aşağıdaki bağlantıya tıklayın:</p>
    <p><a href="${verificationLink}" target="_blank">${verificationLink}</a></p>
    <p>Eğer bağlantıya tıklayamıyorsanız, bu bağlantıyı tarayıcınıza yapıştırın:</p>
    <p>${verificationLink}</p>
  `
};

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ E-posta gönderildi');
  } catch (err) {
    console.error('❌ E-posta gönderilemedi:', err);
  }
}

module.exports = { sendVerificationEmail };