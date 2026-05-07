const db = require("../config/db");
const bcrypt = require("bcrypt");

exports.createHospital = async (req, res) => {
  const { name, email, phone, password } = req.body;

  // ✅ validation
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // ✅ check existing
  db.query(
    "SELECT id FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.sqlMessage });
      }

      if (result.length > 0) {
        return res.status(400).json({ message: "Hospital already exists" });
      }

      // ✅ hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // ✅ insert hospital
      db.query(
        `INSERT INTO users (name, email, phone, password, role, is_verified)
         VALUES (?, ?, ?, ?, 'hospital', 1)`,
        [name, email, phone, hashedPassword],
        (err) => {
          if (err) {
            return res.status(500).json({ message: err.sqlMessage });
          }

          res.json({ message: "Hospital account created successfully" });
        }
      );
    }
  );
};