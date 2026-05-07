const { sendEmail } = require("../utils/mail");
const db = require("../config/db");

// =======================
// CREATE HOSPITAL PROFILE
// =======================

exports.createProfile = (req, res) => {
  const {
    description,
    address,
    city,
    opening_time,
    closing_time,
    consultation_fee
  } = req.body;

  const hospitalId = req.user.id;

  db.query(
    "SELECT id FROM hospital_profiles WHERE hospital_id = ?",
    [hospitalId],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          message: err.sqlMessage
        });
      }

      if (result.length > 0) {
        return res.status(400).json({
          message: "Profile already exists"
        });
      }

      db.query(
        `INSERT INTO hospital_profiles
        (hospital_id, description, address, city, opening_time, closing_time, consultation_fee)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          hospitalId,
          description,
          address,
          city,
          opening_time,
          closing_time,
          consultation_fee
        ],
        (err) => {

          if (err) {
            return res.status(500).json({
              message: err.sqlMessage
            });
          }

          res.json({
            message: "Hospital profile created successfully"
          });
        }
      );
    }
  );
};

// =======================
// GET HOSPITAL PROFILE
// =======================

exports.getProfile = (req, res) => {
  const hospitalId = req.user.id;

  db.query(
    "SELECT * FROM hospital_profiles WHERE hospital_id = ?",
    [hospitalId],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          message: err.sqlMessage
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Profile not found"
        });
      }

      res.json(result[0]);
    }
  );
};

// =======================
// ADD DOCTOR
// =======================

exports.addDoctor = (req, res) => {
  const {
    name,
    specialization,
    experience,
    consultation_fee
  } = req.body;

  const hospitalId = req.user.id;

  if (!name || !specialization) {
    return res.status(400).json({
      message: "Name and specialization are required"
    });
  }

  db.query(
    `INSERT INTO doctors
    (hospital_id, name, specialization, experience, consultation_fee)
    VALUES (?, ?, ?, ?, ?)`,
    [
      hospitalId,
      name,
      specialization,
      experience,
      consultation_fee
    ],
    (err) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          message: err.sqlMessage
        });
      }

      res.json({
        message: "Doctor added successfully"
      });
    }
  );
};

// =======================
// GET ALL DOCTORS
// =======================

exports.getDoctors = (req, res) => {
  const hospitalId = req.user.id;

  db.query(
    "SELECT * FROM doctors WHERE hospital_id = ?",
    [hospitalId],
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

// =======================
// GET SINGLE DOCTOR
// =======================

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

// =======================
// CREATE SLOT
// =======================

exports.createSlot = (req, res) => {
  const {
    doctor_id,
    slot_date,
    slot_time
  } = req.body;

  if (!doctor_id || !slot_date || !slot_time) {
    return res.status(400).json({
      message: "doctor_id, slot_date and slot_time are required"
    });
  }

  db.query(
    `INSERT INTO doctor_slots
    (doctor_id, slot_date, slot_time)
    VALUES (?, ?, ?)`,
    [doctor_id, slot_date, slot_time],
    (err) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          message: err.sqlMessage
        });
      }

      res.json({
        message: "Doctor slot created successfully"
      });
    }
  );
};

// =======================
// GET ALL APPOINTMENTS
// =======================

exports.getAppointments = (req, res) => {

  db.query(
    `SELECT
        a.id,
        a.status,
        u.name AS patient_name,
        d.name AS doctor_name,
        s.slot_date,
        s.slot_time
     FROM appointments a
     JOIN users u ON a.patient_id = u.id
     JOIN doctor_slots s ON a.slot_id = s.id
     JOIN doctors d ON s.doctor_id = d.id`,
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

// =======================
// GET DOCTOR APPOINTMENTS
// =======================

exports.getDoctorAppointments = (req, res) => {
  const doctorId = req.params.id;

  db.query(
    `SELECT
        a.id,
        a.status,
        a.slot_id,
        u.name AS patient_name,
        s.slot_date,
        s.slot_time
     FROM appointments a
     JOIN users u ON a.patient_id = u.id
     JOIN doctor_slots s ON a.slot_id = s.id
     WHERE s.doctor_id = ?`,
    [doctorId],
    (err, result) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          message: err.sqlMessage
        });
      }

      res.json(result);
    }
  );
};

// =======================
// CONFIRM APPOINTMENT
// =======================

exports.confirmAppointment = (req, res) => {
  const appointmentId = req.params.id;

  console.log("🔥 Confirm API HIT:", appointmentId);

  db.query(
    `SELECT u.email
     FROM appointments a
     JOIN users u ON a.patient_id = u.id
     WHERE a.id = ?`,
    [appointmentId],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          message: err.sqlMessage
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Appointment not found"
        });
      }

      const email = result[0].email;

      db.query(
        "UPDATE appointments SET status = 'confirmed' WHERE id = ?",
        [appointmentId],
        async (err) => {

          if (err) {
            return res.status(500).json({
              message: err.sqlMessage
            });
          }

          try {
            await sendEmail(
              email,
              "Appointment Confirmed ✅",
              "<h2>Your appointment has been confirmed ✅</h2>"
            );

            console.log("✅ Confirm email sent");

          } catch (mailErr) {
            console.log("Mail Error:", mailErr.message);
          }

          res.json({
            message: "Appointment confirmed"
          });
        }
      );
    }
  );
};

// =======================
// CANCEL APPOINTMENT
// =======================

exports.cancelAppointment = (req, res) => {
  const appointmentId = req.params.id;

  console.log("🔥 Cancel API HIT:", appointmentId);

  db.query(
    `SELECT a.slot_id, u.email
     FROM appointments a
     JOIN users u ON a.patient_id = u.id
     WHERE a.id = ?`,
    [appointmentId],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          message: err.sqlMessage
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Appointment not found"
        });
      }

      const slotId = result[0].slot_id;
      const email = result[0].email;

      db.query(
        "UPDATE appointments SET status = 'cancelled' WHERE id = ?",
        [appointmentId],
        (err) => {

          if (err) {
            return res.status(500).json({
              message: err.sqlMessage
            });
          }

          db.query(
            "UPDATE doctor_slots SET is_booked = 0 WHERE id = ?",
            [slotId],
            async (err) => {

              if (err) {
                return res.status(500).json({
                  message: err.sqlMessage
                });
              }

              try {
                await sendEmail(
                  email,
                  "Appointment Cancelled ❌",
                  "<h2>Your appointment has been cancelled ❌</h2>"
                );

                console.log("✅ Cancel email sent");

              } catch (mailErr) {
                console.log("Mail Error:", mailErr.message);
              }

              res.json({
                message: "Appointment cancelled"
              });
            }
          );
        }
      );
    }
  );
};