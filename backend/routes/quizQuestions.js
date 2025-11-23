const express = require("express");
const router = express.Router();
const quizQuestionController = require("../controllers/quizQuestionController");
const validateQuizQuestion = require("../middlewares/validateQuizQuestion");

router.post("/", validateQuizQuestion, quizQuestionController.createQuestion);
router.get("/", quizQuestionController.getAllQuestions);
router.get("/:questionId", quizQuestionController.getQuestionById);
router.put("/:questionId", validateQuizQuestion, quizQuestionController.updateQuestion);
router.delete("/:questionId", quizQuestionController.deleteQuestion);

module.exports = router;
