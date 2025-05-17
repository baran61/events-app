const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { sendVerificationEmail } = require("../utils/sendVerificationEmail");

exports.register = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const existing = await User.findOne({ username });
    if (existing)
      return res.status(400).json({ message: "Kullanıcı zaten var" });

    const hashed = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(32).toString("hex");

    const user = new User({
      username,
      password: hashed,
      email,
      emailToken: token,
      isVerified: false,
    });

    await user.save();

    await sendVerificationEmail(email, token);

    res
      .status(201)
      .json({ message: "Kayıt başarılı, e-posta doğrulama gönderildi." });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Kullanıcı bulunamadı" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Şifre yanlış" });
    }

    // JWT Token oluşturma
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Kullanıcının isVerified bilgisini de response ile gönder
    res.status(200).json({ token, isVerified: user.isVerified });

  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

exports.sendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı" });

    const token = crypto.randomBytes(32).toString("hex");
    user.emailToken = token;
    user.isVerified = false;
    await user.save();

    const url = `exp://192.168.1.148:8081/--/verify-email?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Email Doğrulama",
      html: `<p>Doğrulamak için <a href="${url}">buraya tıklayın</a></p>`,
    });

    res.status(200).json({ message: "Doğrulama e-postası gönderildi." });
  } catch (err) {
    res.status(500).json({ message: "Email gönderilemedi" });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ emailToken: token });
    if (!user) return res.status(400).send("Geçersiz bağlantı");

    user.emailToken = null;
    user.isVerified = true;
    await user.save();

    res.redirect("exp://192.168.1.148:8081/--/login?verified=true");
  } catch (err) {
    res.status(500).send("Sunucu hatası");
  }
};