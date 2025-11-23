const Submission = require("../models/submission");

// Create a new submission
exports.createSubmission = async (req, res) => {
  try {
    const { assignment_id, student_id, file_path } = req.body;

    if (!assignment_id || !student_id) {
      return res.status(400).json({ message: "Assignment ID and Student ID are required" });
    }

    const submission = await Submission.create({
      assignment_id,
      student_id,
      file_path
    });

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all submissions
exports.getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.findAll();
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get submission by ID
exports.getSubmissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const submission = await Submission.findByPk(id);
    if (!submission) return res.status(404).json({ message: "Submission not found" });
    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update score and feedback
exports.updateSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { score, feedback } = req.body;

    const submission = await Submission.findByPk(submissionId);
    if (!submission) return res.status(404).json({ message: "Submission not found" });

    submission.score = score !== undefined ? score : submission.score;
    submission.feedback = feedback !== undefined ? feedback : submission.feedback;

    await submission.save();
    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete submission
exports.deleteSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const submission = await Submission.findByPk(submissionId);
    if (!submission) return res.status(404).json({ message: "Submission not found" });

    await submission.destroy();
    res.json({ message: "Submission deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
