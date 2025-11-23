const AnnouncementRead = require("../models/announcementRead");

// Get all reads
exports.getAllReads = async (req, res) => {
  try {
    const reads = await AnnouncementRead.findAll();
    res.status(200).json(reads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reads by user
exports.getReadsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const reads = await AnnouncementRead.findAll({ where: { user_id: userId } });
    res.status(200).json(reads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new read entry
exports.createRead = async (req, res) => {
  try {
    const { announcement_id, user_id } = req.body;

    if (!announcement_id || !user_id) {
      return res.status(400).json({ message: "announcement_id and user_id are required" });
    }

    const read = await AnnouncementRead.create({ announcement_id, user_id });
    res.status(201).json(read);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a read entry
exports.deleteRead = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await AnnouncementRead.destroy({ where: { announcement_read_id: id } });

    if (!deleted) return res.status(404).json({ message: "Read not found" });
    res.status(200).json({ message: "Read deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
