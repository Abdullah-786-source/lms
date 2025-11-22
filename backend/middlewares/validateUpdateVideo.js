const validateUpdateVideo = (req, res, next) => {
    const { course_id, title, file_path, module_id, description, thumbnail_path, duration_seconds, is_preview, access_level } = req.body;

    const errors = [];

    if (course_id !== undefined && typeof course_id !== 'number') errors.push("Course ID must be a number.");
    if (module_id !== undefined && typeof module_id !== 'number') errors.push("Module ID must be a number.");
    if (duration_seconds !== undefined && typeof duration_seconds !== 'number') errors.push("Duration must be a number.");
    if (is_preview !== undefined && typeof is_preview !== 'boolean') errors.push("is_preview must be a boolean.");
    if (access_level !== undefined && !['free', 'enrolled'].includes(access_level)) errors.push("Access level must be 'free' or 'enrolled'.");

    if (errors.length > 0) return res.status(400).json({ message: errors });

    next();
};

module.exports = validateUpdateVideo;
