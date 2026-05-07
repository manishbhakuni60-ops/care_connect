const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const adminController = require("../controllers/adminController");

router.get("/dashboard", protect, allowRoles("admin"), (req, res) => {
  res.json({
    message: "Welcome to Admin Dashboard",
    user: req.user
  });
});

// create hospital account
router.post(
  "/create-hospital",
  protect,
  allowRoles("admin"),
  adminController.createHospital
);

module.exports = router;
