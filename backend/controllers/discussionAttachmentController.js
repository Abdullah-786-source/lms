const DiscussionAttachment = require('../models/discussionAttachment');
const fs = require('fs');
const path = require('path');

// Upload a file for a discussion
exports.uploadAttachment = async (req, res) => {
  try {
    const { discussion_id } = req.body;
    if (!discussion_id) return res.status(400).json({ message: 'discussion_id is required' });
    if (!req.file) return res.status(400).json({ message: 'File is required' });

    const file_path = req.file.path;

    const attachment = await DiscussionAttachment.create({
      discussion_id,
      file_path
    });

    res.status(201).json(attachment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all attachments
exports.getAllAttachments = async (req, res) => {
  try {
    const attachments = await DiscussionAttachment.findAll();
    res.status(200).json(attachments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get attachment by ID
exports.getAttachmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const attachment = await DiscussionAttachment.findByPk(id);
    if (!attachment) return res.status(404).json({ message: 'Attachment not found' });
    res.status(200).json(attachment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete attachment
exports.deleteAttachment = async (req, res) => {
  try {
    const { id } = req.params;
    const attachment = await DiscussionAttachment.findByPk(id);
    if (!attachment) return res.status(404).json({ message: 'Attachment not found' });

    // Delete file from server
    fs.unlink(path.resolve(attachment.file_path), (err) => {
      if (err) console.error('Failed to delete file:', err);
    });

    await attachment.destroy();
    res.status(200).json({ message: 'Attachment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
