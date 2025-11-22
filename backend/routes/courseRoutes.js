const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const validateCourseFields = require('../middlewares/validateCourse');
const validateUpdateCourse = require('../middlewares/validateUpdateCourse');

// Create a course with validation middleware
router.post('/', validateCourseFields, courseController.createCourse);

// Update a course with validation middleware
router.put('/:courseId', validateUpdateCourse, courseController.updateCourse);

router.get('/', courseController.getCourses);
router.get('/:courseId', courseController.getCourseById);
router.delete('/:courseId', courseController.deleteCourse);

module.exports = router;