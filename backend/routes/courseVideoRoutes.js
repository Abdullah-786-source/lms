const express = require('express');
const router = express.Router();
const courseVideoController = require('../controllers/courseVideoController');
const validateCreateVideo = require('../middlewares/validateCreateVideo');
const validateUpdateVideo = require('../middlewares/validateUpdateVideo');

// CRUD Routes
router.post('/', validateCreateVideo, courseVideoController.createVideo);
router.get('/', courseVideoController.getVideos);
router.get('/:videoId', courseVideoController.getVideoById);
router.put('/:videoId', validateUpdateVideo, courseVideoController.updateVideo);
router.delete('/:videoId', courseVideoController.deleteVideo);

module.exports = router;
