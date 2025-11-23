const express = require('express');
const cors = require('cors');
const path = require("path");  // ← Add this line at the to
require('dotenv').config();
const sequelize = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const moduleRoutes = require("./routes/moduleRoutes");
const courseVideoRoutes = require("./routes/courseVideoRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const quizRoutes = require("./routes/quizRoutes");
const quizOptionRoutes = require("./routes/quizOptions.js");
const quizQuestionRoutes = require("./routes/quizQuestions");
const quizAttemptRoutes = require("./routes/quizAttemptRoutes");
const discussionRoutes = require("./routes/discussionRoutes");
const discussionAttachmentRoutes = require('./routes/discussionAttachments.js');
const announcementRoutes = require('./routes/announcementsRoutes')
const announcementReadRoutes = require("./routes/announcementReadsRoutes");
const videoViewsRoutes = require("./routes/videoViewsRoutes");
const videoCommentRoutes = require("./routes/videoCommentsRoutes");
const videoTranscodesRoutes = require("./routes/videoTranscodesRoutes");


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/content", express.static(path.join(__dirname, "../content")));
app.use('/uploads', express.static('uploads')); // serve uploaded files

// Routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/course-videos", courseVideoRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/quiz-options", quizOptionRoutes);
app.use("/api/quiz-questions", quizQuestionRoutes);
app.use("/api/quiz-attempts", quizAttemptRoutes);
app.use("/api/discussions", discussionRoutes);
app.use('/api/discussion-attachments', discussionAttachmentRoutes);
app.use('/api/announcements', announcementRoutes)
app.use("/api/announcement-reads", announcementReadRoutes);
app.use("/api/video-views", videoViewsRoutes);
app.use("/api/video-comments", videoCommentRoutes);
app.use("/api/transcodes", videoTranscodesRoutes);


const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: false })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('Error syncing database:', err));
