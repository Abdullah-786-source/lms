const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignmentController");
const validateCreateAssignment = require("../middlewares/validateAssignment");
const validateUpdateAssignment = require("../middlewares/validateAssignment");

router.post("/", validateCreateAssignment, assignmentController.createAssignment);
router.get("/", assignmentController.getAllAssignments);
router.get("/:assignmentId", assignmentController.getAssignmentById);
router.put("/:assignmentId", validateUpdateAssignment, assignmentController.updateAssignment);
router.delete("/:assignmentId", assignmentController.deleteAssignment);

module.exports = router;
