const Discussion = require("../models/discussion");

// Helper function to build nested structure
function buildNestedDiscussions(discussions) {
  const discussionMap = {};
  const nested = [];

  // Initialize map
  discussions.forEach(d => {
    discussionMap[d.discussion_id] = { ...d.dataValues, replies: [] };
  });

  discussions.forEach(d => {
    if (d.parent_id) {
      // Add as reply to parent
      if (discussionMap[d.parent_id]) {
        discussionMap[d.parent_id].replies.push(discussionMap[d.discussion_id]);
      }
    } else {
      // Top-level discussion
      nested.push(discussionMap[d.discussion_id]);
    }
  });

  return nested;
}


// Create a new discussion
exports.createDiscussion = async (req, res) => {
  try {
    const { course_id, user_id, content, parent_id } = req.body;

    if (!course_id || !user_id || !content) {
      return res.status(400).json({ message: "course_id, user_id, and content are required." });
    }

    const discussion = await Discussion.create({ course_id, user_id, content, parent_id });
    res.status(201).json(discussion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create discussion." });
  }
};

// Get all discussions (optionally by course)
exports.getAllDiscussionsNested = async (req, res) => {
  try {
    const { course_id } = req.query;
    if (!course_id) {
      return res.status(400).json({ message: "course_id is required." });
    }

    const discussions = await Discussion.findAll({
      where: { course_id },
      order: [['created_at', 'ASC']]
    });

    const nestedDiscussions = buildNestedDiscussions(discussions);
    res.status(200).json(nestedDiscussions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch discussions." });
  }
};

// Get a single discussion by discussionID
exports.getDiscussionById = async (req, res) => {
  try {
    const { discussionID } = req.params;
    const discussion = await Discussion.findByPk(discussionID);
    
    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found." });
    }
    
    res.status(200).json(discussion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch discussion." });
  }
};

// Update a discussion
exports.updateDiscussion = async (req, res) => {
  try {
    const { discussionID } = req.params;
    const { content } = req.body;

    const discussion = await Discussion.findByPk(discussionID);
    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found." });
    }

    discussion.content = content || discussion.content;
    await discussion.save();

    res.status(200).json(discussion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update discussion." });
  }
};

// Delete a discussion
exports.deleteDiscussion = async (req, res) => {
  try {
    const { discussionID } = req.params;

    const discussion = await Discussion.findByPk(discussionID);
    if (!discussion) {
      return res.status(404).json({ message: "Discussion not found." });
    }

    await discussion.destroy();
    res.status(200).json({ message: "Discussion deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete discussion." });
  }
};
