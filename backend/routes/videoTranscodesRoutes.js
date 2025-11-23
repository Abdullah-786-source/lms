const express = require("express");
const router = express.Router();

const videoTranscodeController = require("../controllers/videoTranscodeController");
const validateVideoTranscode = require("../middlewares/validateVideoTranscode");
const upload = require("../middlewares/uploadTranscode");

// Upload a video transcode
router.post(
  "/upload",
  upload.single("video_file"),
  validateVideoTranscode,
  videoTranscodeController.createTranscodeWithUpload
);

router.get("/", videoTranscodeController.getAllTranscodes);
router.get("/video/:videoId", videoTranscodeController.getTranscodesByVideo);
router.delete("/:transcodeId", videoTranscodeController.deleteTranscode);

module.exports = router;
