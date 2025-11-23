module.exports = (req, res, next) => {
  const { video_id, quality } = req.body;

  if (!video_id || isNaN(video_id)) {
    return res.status(400).json({ message: "video_id is required and must be a number." });
  }

  const allowedQualities = ["360p", "480p", "720p", "1080p", "4k"];
  if (!quality || !allowedQualities.includes(quality)) {
    return res.status(400).json({ message: "Invalid quality. Allowed: 360p, 480p, 720p, 1080p, 4k." });
  }

  next();
};
