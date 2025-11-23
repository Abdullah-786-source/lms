const Video_View = require("../models/videoView");

// Helper function to merge durations without allowing regressions
function mergeWatchedSeconds(existing, incoming) {
  if (!incoming || isNaN(incoming)) return existing;
  if (incoming > existing) return incoming;
  return existing;
}

// Progress event handler
exports.trackProgress = async (req, res) => {
  try {
    const { video_id, student_id, watched_seconds } = req.body;

    const existingRecord = await Video_View.findOne({
      where: { video_id, student_id }
    });

    // If record exists, update watched_seconds only if progress increased
    if (existingRecord) {
      const updatedSeconds = mergeWatchedSeconds(
        existingRecord.watched_seconds,
        watched_seconds
      );

      await existingRecord.update({
        watched_seconds: updatedSeconds,
        last_watched: new Date()
      });

      return res.status(200).json({
        message: "Progress updated.",
        data: existingRecord
      });
    }

    // If record does not exist, create a new one
    const newRecord = await Video_View.create({
      video_id,
      student_id,
      watched_seconds: watched_seconds || 0
    });

    return res.status(201).json({
      message: "Progress started.",
      data: newRecord
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all views
exports.getAllViews = async (req, res) => {
  try {
    const views = await Video_View.findAll();
    res.status(200).json(views);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single view
exports.getViewById = async (req, res) => {
  try {
    const { viewId } = req.params;
    const view = await Video_View.findByPk(viewId);

    if (!view) {
      return res.status(404).json({ message: "Record not found." });
    }

    res.status(200).json(view);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Optional delete (rarely needed for analytics)
exports.deleteView = async (req, res) => {
  try {
    const { viewId } = req.params;

    const view = await Video_View.findByPk(viewId);
    if (!view) {
      return res.status(404).json({ message: "Record not found." });
    }

    await view.destroy();
    res.status(200).json({ message: "Record deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
