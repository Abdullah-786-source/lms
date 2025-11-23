const Announcement = require("../models/announcement");
const User = require("../models/user");
const Course = require("../models/course");

// Create announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const { courseId, title, content, postedBy } = req.body;

    const announcement = await Announcement.create({ courseId, title, content, postedBy });

    // Fetch the announcement with instructor and course info
    const createdAnnouncement = await Announcement.findByPk(announcement.announcementId, {
      include: [
        {
          model: User,
          as: "instructor",
          attributes: ["id", "name", "email"]  // model property names
        },
        {
          model: Course,
          as: "course",
          attributes: ["id", "title", "description"]
        }
      ]
    });

    res.status(201).json(createdAnnouncement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all announcements
exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.findAll({
      include: [
        { model: User, as: "instructor", attributes: ["user_id", "username", "email"] },
        { model: Course, as: "course", attributes: ["course_id", "title", "description"] }
      ],
      order: [["postedAt", "DESC"]]
    });

    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get announcement by ID
exports.getAnnouncementById = async (req, res) => {
  try {
    const { announcementId } = req.params;

    const announcement = await Announcement.findByPk(announcementId, {
      include: [
        { model: User, as: "instructor", attributes: ["user_id", "username", "email"] },
        { model: Course, as: "course", attributes: ["course_id", "title", "description"] }
      ]
    });

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found." });
    }

    res.status(200).json(announcement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update announcement
exports.updateAnnouncement = async (req, res) => {
  try {
    const { announcementId } = req.params;
    const { title, content, courseId } = req.body;

    const announcement = await Announcement.findByPk(announcementId);
    if (!announcement) return res.status(404).json({ message: "Announcement not found." });

    if (title !== undefined) announcement.title = title;
    if (content !== undefined) announcement.content = content;
    if (courseId !== undefined) announcement.courseId = courseId;

    await announcement.save();

    const updatedAnnouncement = await Announcement.findByPk(announcement.announcementId, {
      include: [
        { model: User, as: "instructor", attributes: ["id", "name", "email"] },
        { model: Course, as: "course", attributes: ["id", "title", "description"] }
      ]
    });

    res.status(200).json(updatedAnnouncement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete announcement
exports.deleteAnnouncement = async (req, res) => {
  try {
    const { announcementId } = req.params;

    const announcement = await Announcement.findByPk(announcementId);
    if (!announcement) return res.status(404).json({ message: "Announcement not found." });

    await announcement.destroy();
    res.status(200).json({ message: "Announcement deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
