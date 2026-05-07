const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const hospitalController = require("../controllers/hospitalController");


// =======================
// DASHBOARD
// =======================
router.get("/dashboard", protect, allowRoles("hospital"), (req, res) => {
  res.json({
    message: "Welcome to Hospital Dashboard",
    user: req.user
  });
});

// =======================
// PROFILE
// =======================

// create hospital profile
router.post(
  "/profile",
  protect,
  allowRoles("hospital"),
  hospitalController.createProfile
);

// get hospital profile
router.get(
  "/profile",
  protect,
  allowRoles("hospital"),
  hospitalController.getProfile
);

// =======================
// DOCTORS
// =======================

// add doctor
router.post(
  "/doctors",
  protect,
  allowRoles("hospital"),
  hospitalController.addDoctor
);

// =======================
// SLOTS (THIS WAS MISSING ❗)
// =======================

// create doctor slot
router.post(
  "/slots",
  protect,
  allowRoles("hospital"),
  hospitalController.createSlot
);


router.put(
  "/appointments/confirm/:id",
  protect,
  allowRoles("hospital"),
  hospitalController.confirmAppointment
);

router.put(
  "/appointments/cancel/:id",
  protect,
  allowRoles("hospital"),
  hospitalController.cancelAppointment
);

router.get(
  "/appointments",
  protect,
  allowRoles("hospital"),
  hospitalController.getAppointments
);

router.get(
  "/doctors",
  protect,
  allowRoles("hospital"),
  hospitalController.getDoctors
);

router.get(
  "/doctors/:id",
  protect,
  allowRoles("hospital"),
  hospitalController.getDoctorById
);

router.get(
  "/appointments/doctor/:id",
  protect,
  allowRoles("hospital"),
  hospitalController.getDoctorAppointments
);

// =======================
// EXPORT (MUST BE LAST)
// =======================
module.exports = router;