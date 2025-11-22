const CourseVideo = require("../models/courseVideo");
const Course = require("../models/course");
const Module = require("../models/module");

// Create a new video
exports.createVideo = async (req, res) => {
  try {
    const { course_id, module_id, title, description, file_path, thumbnail_path, duration_seconds, is_preview, access_level } = req.body;

    if (!course_id || !title || !file_path) {
      return res.status(400).json({ message: "course_id, title, and file_path are required" });
    }

    const video = await CourseVideo.create({
      course_id,
      module_id,
      title,
      description,
      file_path,
      thumbnail_path,
      duration_seconds,
      is_preview,
      access_level,
    });

    res.status(201).json(video);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all videos
exports.getVideos = async (req, res) => {
  try {
    const videos = await CourseVideo.findAll({
      include: [
        { model: Course, as: "course", attributes: ["course_id", "title"] },
        { model: Module, as: "module", attributes: ["module_id", "title"], required: false },
      ],
    });

    res.status(200).json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a single video by ID
exports.getVideoById = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await CourseVideo.findByPk(videoId, {
      include: [
        { model: Course, as: "course", attributes: ["course_id", "title"] },
        { model: Module, as: "module", attributes: ["module_id", "title"], required: false },
      ],
    });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json(video);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a video
exports.updateVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { course_id, module_id, title, description, file_path, thumbnail_path, duration_seconds, is_preview, access_level } = req.body;

    const video = await CourseVideo.findByPk(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    await video.update({
      course_id,
      module_id,
      title,
      description,
      file_path,
      thumbnail_path,
      duration_seconds,
      is_preview,
      access_level,
    });

    res.status(200).json(video);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a video
exports.deleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    const video = await CourseVideo.findByPk(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    await video.destroy();
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
