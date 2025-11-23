const express = require("express");
const router = express.Router();
const quizAttemptController = require("../controllers/quizAttemptController");
const { validateQuizAttempt, validateUpdateAttempt } = require("../middlewares/validateQuizAttempt");

// Create a new quiz attempt with validation
router.post("/", validateQuizAttempt, quizAttemptController.createAttempt);

// Get all attempts
router.get("/", quizAttemptController.getAllAttempts);

// Get single attempt by ID
router.get("/:attemptId", quizAttemptController.getAttemptById);

// Update an attempt (validate score if provided)
router.put("/:attemptId", validateUpdateAttempt, quizAttemptController.updateAttempt);

// Delete an attempt
router.delete("/:attemptId", quizAttemptController.deleteAttempt);

module.exports = router;
