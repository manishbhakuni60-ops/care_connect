
const { sendEmail } = require("../utils/mail");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const generateOTP = require("../utils/otpGenerator");


// REGISTER (Patient only)
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert user
    db.query(
      "INSERT INTO users (name, email, phone, password, role) VALUES (?,?,?,?, 'patient')",
      [name, email, phone, hashedPassword],
      async (err, result) => {
        if (err) {
          return res.status(500).json({ message: "User already exists" });
        }

        // ✅ generate OTP
        const otp = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        // ✅ SAVE OTP FIRST
        db.query(
          "INSERT INTO otp_verifications (user_id, otp, expires_at) VALUES (?,?,?)",
          [result.insertId, otp, expiresAt],
          async (err) => {
            if (err) {
              return res.status(500).json({ message: err.sqlMessage });
            }

            // ✅ SEND EMAIL AFTER SAVING
            await sendEmail(
              email,
              "OTP Verification",
              `Your OTP is: ${otp}`
            );

            res.status(201).json({
              message: "Registered successfully. OTP sent to email."
            });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// VERIFY OTP
exports.verifyOTP = (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  db.query(
    `SELECT o.*, u.id FROM otp_verifications o
     JOIN users u ON o.user_id = u.id
     WHERE u.email = ? AND o.otp = ? AND o.expires_at > NOW()`,
    [email, otp],
    (err, result) => {
      if (result.length === 0) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }

      // mark user as verified
      db.query(
        "UPDATE users SET is_verified = 1 WHERE id = ?",
        [result[0].user_id]
      );

      res.json({ message: "Account verified successfully" });
    }
  );
};
// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, users) => {
      if (users.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = users[0];

      if (!user.is_verified) {
        return res.status(401).json({ message: "Please verify your account first" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({
        message: "Login successful",
        token,
        role: user.role
      });
    }
  );
};
