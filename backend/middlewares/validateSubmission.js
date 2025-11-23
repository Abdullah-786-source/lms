const fs = require("fs");

const validateSubmission = (req, res, next) => {
  const { assignment_id, student_id } = req.body;

  // Check required fields
  if (!assignment_id || isNaN(parseInt(assignment_id))) {
    return res.status(400).json({ message: "Valid assignment_id is required" });
  }

  if (!student_id || isNaN(parseInt(student_id))) {
    return res.status(400).json({ message: "Valid student_id is required" });
  }

  // Check uploaded file
  if (!req.file) {
    return res.status(400).json({ message: "Submission file is required" });
  }

  // Optional: check file type
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];

  if (!allowedTypes.includes(req.file.mimetype)) {
    // Delete the uploaded file if invalid
    fs.unlinkSync(req.file.path);
    return res.status(400).json({ message: "Only PDF or Word documents are allowed" });
  }

  next();
};

module.exports = validateSubmission;
