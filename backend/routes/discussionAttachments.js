const express = require('express');
const router = express.Router();
const discussionAttachmentController = require('../controllers/discussionAttachmentController');
const upload = require('../middlewares/upload');

// Upload file
router.post('/', upload.single('file'), discussionAttachmentController.uploadAttachment);

// Get all attachments
router.get('/', discussionAttachmentController.getAllAttachments);

// Get attachment by ID
router.get('/:id', discussionAttachmentController.getAttachmentById);

// Delete attachment
router.delete('/:id', discussionAttachmentController.deleteAttachment);

module.exports = router;
