const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/submissionController");
const multer = require("multer");
const path = require("path");
const validateSubmission = require("../middlewares/validateSubmission");

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Routes
router.post(
  "/",
  upload.single("file"),
  validateSubmission,        // <- Add validation middleware here
  submissionController.createSubmission
);

router.get("/", submissionController.getAllSubmissions);
router.get("/:submissionId", submissionController.getSubmissionById);
router.put("/:submissionId", submissionController.updateSubmission);
router.delete("/:submissionId", submissionController.deleteSubmission);

module.exports = router;
