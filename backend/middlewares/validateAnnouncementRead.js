module.exports = (req, res, next) => {
  const { announcement_id, user_id } = req.body;

  if (!announcement_id) {
    return res.status(400).json({ message: "announcement_id is required." });
  }

  if (!user_id) {
    return res.status(400).json({ message: "user_id is required." });
  }

  if (isNaN(announcement_id)) {
    return res.status(400).json({ message: "announcement_id must be a number." });
  }

  if (isNaN(user_id)) {
    return res.status(400).json({ message: "user_id must be a number." });
  }

  next();
};
