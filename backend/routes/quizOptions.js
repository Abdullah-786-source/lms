const express = require("express");
const router = express.Router();

const quizOptionController = require("../controllers/quizOptionController");
const validateQuizOption = require("../middlewares/validateQuizOption");

router.post("/", validateQuizOption, quizOptionController.createOption);
router.get("/", quizOptionController.getAllOptions);
router.get("/:optionId", quizOptionController.getOptionById);
router.put("/:optionId", validateQuizOption, quizOptionController.updateOption);
router.delete("/:optionId", quizOptionController.deleteOption);

module.exports = router;
