const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const allowRoles =
require("../middleware/roleMiddleware");

const patientController =
require("../controllers/patientController");


// =========================
// GET DOCTOR SLOTS
// =========================

router.get(
  "/slots/:doctor_id",
  protect,
  allowRoles("patient"),
  patientController.getSlots
);


// =========================
// BOOK SLOT
// =========================

router.post(
  "/book",
  protect,
  allowRoles("patient"),
  patientController.bookSlot
);


// =========================
// GET PATIENT APPOINTMENTS
// =========================

router.get(
  "/appointments",
  protect,
  allowRoles("patient"),
  patientController.getAppointments
);


// =========================
// GET ALL DOCTORS
// =========================

router.get(
  "/doctors",
  protect,
  allowRoles("patient"),
  patientController.getDoctors
);


// =========================
// GET SINGLE DOCTOR
// =========================

router.get(
  "/doctors/:id",
  protect,
  allowRoles("patient"),
  patientController.getDoctorById
);


// =========================
// GET DOCTOR REVIEWS
// =========================

router.get(
  "/reviews/:id",
  protect,
  allowRoles("patient"),
  patientController.getDoctorReviews
);


// =========================
// EXPORT ROUTER
// =========================

module.exports = router;