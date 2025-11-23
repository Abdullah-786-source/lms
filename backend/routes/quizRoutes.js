const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");
const validateQuiz = require("../middlewares/validateQuiz");

router.post("/", validateQuiz, quizController.createQuiz);
router.get("/", quizController.getAllQuizzes);
router.get("/:quizId", quizController.getQuizById);
router.put("/:quizId", validateQuiz, quizController.updateQuiz);
router.delete("/:quizId", quizController.deleteQuiz);

module.exports = router;
