const express = require("express");
const router = express.Router();
const discussionController = require("../controllers/discussionController");

router.post("/", discussionController.createDiscussion);
router.get("/", discussionController.getAllDiscussionsNested); // Returns nested discussions
router.get("/:discussionID", discussionController.getDiscussionById);
router.put("/:discussionID", discussionController.updateDiscussion);
router.delete("/:discussionID", discussionController.deleteDiscussion);

module.exports = router;
