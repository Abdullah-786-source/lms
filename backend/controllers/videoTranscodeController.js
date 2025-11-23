const Video_Transcode = require("../models/videoTranscode");
const path = require("path");

exports.createTranscodeWithUpload = async (req, res) => {
  try {
    const { video_id, quality } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Video file is required." });
    }

    const file_path = path.join("uploads/transcodes", req.file.filename);
    const file_size_mb = parseFloat((req.file.size / (1024 * 1024)).toFixed(2));

    const transcode = await Video_Transcode.create({
      video_id,
      quality,
      file_path,
      file_size_mb
    });

    res.status(201).json(transcode);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllTranscodes = async (req, res) => {
  try {
    const transcodes = await Video_Transcode.findAll();
    res.status(200).json(transcodes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTranscodesByVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const transcodes = await Video_Transcode.findAll({ where: { video_id: videoId } });
    res.status(200).json(transcodes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTranscode = async (req, res) => {
  try {
    const { transcodeId } = req.params;
    const deleted = await Video_Transcode.destroy({ where: { transcode_id: transcodeId } });

    if (!deleted) return res.status(404).json({ message: "Transcode not found." });

    res.status(200).json({ message: "Transcode deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
