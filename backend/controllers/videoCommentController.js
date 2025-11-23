const Video_Comment = require("../models/videoComment");

exports.createComment = async (req, res) => {
  try {
    const { video_id, user_id, comment, parent_id } = req.body;

    const newComment = await Video_Comment.create({
      video_id,
      user_id,
      comment,
      parent_id: parent_id || null
    });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCommentsByVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    const comments = await Video_Comment.findAll({
      where: { video_id: videoId },
      order: [["created_at", "ASC"]]
    });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { comment } = req.body;

    const existing = await Video_Comment.findByPk(commentId);
    if (!existing) {
      return res.status(404).json({ message: "Comment not found." });
    }

    existing.comment = comment;
    await existing.save();

    res.status(200).json(existing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const existing = await Video_Comment.findByPk(commentId);
    if (!existing) {
      return res.status(404).json({ message: "Comment not found." });
    }

    await existing.destroy();

    res.status(200).json({ message: "Comment deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
