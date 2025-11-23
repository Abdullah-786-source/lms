const express = require("express");
const router = express.Router();
const commentController = require("../controllers/videoCommentController");
const validateVideoComment = require("../middlewares/validateVideoComment");

router.post("/", validateVideoComment, commentController.createComment);
router.get("/:videoId", commentController.getCommentsByVideo);
router.put("/:commentId", commentController.updateComment);
router.delete("/:commentId", commentController.deleteComment);

module.exports = router;
