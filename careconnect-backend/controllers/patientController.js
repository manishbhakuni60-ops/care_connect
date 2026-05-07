const { sendEmail } = require("../utils/mail");
const db = require("../config/db");

exports.getSlots = (req, res) => {
  const doctorId = req.params.doctor_id;

  db.query(
    `SELECT * FROM doctor_slots 
     WHERE doctor_id = ? AND is_booked = 0`,
    [doctorId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.sqlMessage });
      }

      res.json(result);
    }
  );
};
exports.bookSlot = (req, res) => {
  const { slot_id } = req.body;
  const patientId = req.user.id;

  if (!slot_id) {
    return res.status(400).json({ message: "slot_id is required" });
  }

  db.query(
    "SELECT * FROM doctor_slots WHERE id = ?",
    [slot_id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.sqlMessage });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Slot not found" });
      }

      const slot = result[0];

      if (slot.is_booked) {
        return res.status(400).json({ message: "Slot already booked" });
      }

      // 1️⃣ Update slot
      db.query(
        "UPDATE doctor_slots SET is_booked = 1 WHERE id = ?",
        [slot_id],
        (err) => {
          if (err) {
            return res.status(500).json({ message: err.sqlMessage });
          }

          // 2️⃣ Save appointment
          db.query(
            `INSERT INTO appointments (patient_id, doctor_id, slot_id, status)
             VALUES (?, ?, ?, 'pending')`,
            [patientId, slot.doctor_id, slot_id],
            (err) => {
              if (err) {
                return res.status(500).json({ message: err.sqlMessage });
              }

              // 3️⃣ Get email
              db.query(
  "SELECT email FROM users WHERE id = ?",
  [patientId],
  async (err, userResult) => {

    // ❗ HANDLE ERROR
    if (err) {
      console.log("❌ Error fetching email:", err);
      return res.status(500).json({ message: "Error fetching email" });
    }

    // ❗ CHECK RESULT
    if (!userResult || userResult.length === 0) {
      console.log("❌ No user found for ID:", patientId);
      return res.status(404).json({ message: "User not found" });
    }

    const email = userResult[0].email;

    console.log("📧 Sending booking email to:", email);

    try {
      await sendEmail(
  email,
  "Appointment Requested ⏳",
  `
  <h2>⏳ Appointment Requested</h2>
  <p>Your appointment is under review.</p>

  <p><b>Status:</b> Pending</p>
  <p><b>Doctor:</b> Dr. Rajesh Kumar</p>
  <p><b>Date:</b> ${slot.slot_date}</p>
  <p><b>Time:</b> ${slot.slot_time}</p>

  <br/>
  <p>You will be notified once confirmed.</p>
  `
);

      console.log("✅ Email sent successfully");
    } catch (error) {
      console.log("❌ Email sending failed:", error);
    }

    // ✅ RESPONSE LAST
    res.json({
      message: "Appointment booked and saved successfully"
    });
  }
);
            }
          );
        }
      );
    }
  );
};
exports.getAppointments = (req, res) => {

  const patientId = req.user.id;

  db.query(
    `SELECT
        a.id,
        a.status,

        d.name AS doctor_name,
        d.specialization,
        d.consultation_fee,

        s.slot_date,
        s.slot_time

     FROM appointments a

     JOIN doctor_slots s
     ON a.slot_id = s.id

     JOIN doctors d
     ON s.doctor_id = d.id

     WHERE a.patient_id = ?`,
    [patientId],
    (err, result) => {

      if (err) {

        return res.status(500).json({
          message: err.sqlMessage
        });
      }

      res.json(result);
    }
  );
};

exports.getDoctors = (req, res) => {
  db.query(
    "SELECT id, name, specialization FROM doctors",
    (err, result) => {
      if (err) return res.status(500).json({ message: err.sqlMessage });
      res.json(result);
    }
  );
};
exports.getDoctorReviews = (req, res) => {
  const doctorId = req.params.id;

  db.query(
    "SELECT * FROM reviews WHERE doctor_id = ?",
    [doctorId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.sqlMessage });
      }
      res.json(result);
    }
  );
};
exports.getDoctorById = (req, res) => {

  const doctorId = req.params.id;

  db.query(
    "SELECT * FROM doctors WHERE id = ?",
    [doctorId],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          message: err.sqlMessage
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Doctor not found"
        });
      }

      res.json(result[0]);
    }
  );
};
