const express = require("express");
const router = express.Router();
const videoViewController = require("../controllers/videoViewController");
const validateVideoView = require("../middlewares/validateVideoView");

// Optimized progress route
router.post("/track", validateVideoView, videoViewController.trackProgress);

// Fetch all
router.get("/", videoViewController.getAllViews);

// Fetch by id
router.get("/:viewId", videoViewController.getViewById);

// Delete
router.delete("/:viewId", videoViewController.deleteView);

module.exports = router;
