const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollmentController");
const validateEnrollment = require("../middlewares/validateEnrollment");

// Create enrollment with validation middleware
router.post("/", validateEnrollment, enrollmentController.createEnrollment);

// Get all enrollments
router.get("/", enrollmentController.getAllEnrollments);

// Get single enrollment
router.get("/:enrollmentId", enrollmentController.getEnrollmentById);

// Delete enrollment
router.delete("/:enrollmentId", enrollmentController.deleteEnrollment);

module.exports = router;
