const express = require("express");
const router = express.Router();

const announcementReadController = require("../controllers/announcementReadController");
const validateAnnouncementRead = require("../middlewares/validateAnnouncementRead");

router.get("/", announcementReadController.getAllReads);
router.get("/user/:userId", announcementReadController.getReadsByUser);
router.post("/", validateAnnouncementRead, announcementReadController.createRead);
router.delete("/:id", announcementReadController.deleteRead);

module.exports = router;
