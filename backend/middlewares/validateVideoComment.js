module.exports = (req, res, next) => {
  const { video_id, user_id, comment, parent_id } = req.body;

  if (!video_id) {
    return res.status(400).json({ message: "video_id is required." });
  }
  if (isNaN(video_id)) {
    return res.status(400).json({ message: "video_id must be a number." });
  }

  if (!user_id) {
    return res.status(400).json({ message: "user_id is required." });
  }
  if (isNaN(user_id)) {
    return res.status(400).json({ message: "user_id must be a number." });
  }

  if (!comment || comment.trim().length === 0) {
    return res.status(400).json({ message: "comment is required." });
  }

  if (parent_id && isNaN(parent_id)) {
    return res.status(400).json({ message: "parent_id must be a number." });
  }

  next();
};
