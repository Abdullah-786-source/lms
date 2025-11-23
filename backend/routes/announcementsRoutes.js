const express = require("express");
const router = express.Router();
const announcementController = require("../controllers/announcementController");
const validateAnnouncement = require("../middlewares/validateAnnouncement");

// Create new announcement
router.post("/", validateAnnouncement, announcementController.createAnnouncement);

// Update existing announcement
router.put("/:announcementId", validateAnnouncement, announcementController.updateAnnouncement);

// Get all announcements
router.get("/", announcementController.getAllAnnouncements);

// Get announcement by ID
router.get("/:announcementId", announcementController.getAnnouncementById);

// Delete announcement
router.delete("/:announcementId", announcementController.deleteAnnouncement);

module.exports = router;
