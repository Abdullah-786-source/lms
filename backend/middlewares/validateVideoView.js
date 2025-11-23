module.exports = (req, res, next) => {
  const { video_id, student_id, watched_seconds } = req.body;

  if (!video_id || isNaN(video_id)) {
    return res.status(400).json({ message: "video_id must be a valid number." });
  }

  if (!student_id || isNaN(student_id)) {
    return res.status(400).json({ message: "student_id must be a valid number." });
  }

  if (watched_seconds !== undefined && isNaN(watched_seconds)) {
    return res.status(400).json({ message: "watched_seconds must be a number." });
  }

  next();
};
