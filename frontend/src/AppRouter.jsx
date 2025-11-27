import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CourseDetail from './pages/CourseDetail';
import VideoPlayerPage from './pages/VideoPlayerPage';
import Assignments from './pages/Assignments';
import Quizzes from './pages/Quizzes';
import Discussions from './pages/Discussions';
import Profile from './pages/Profile';


const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/courses/:courseId" element={<CourseDetail />} />
                <Route path="/videos/:videoId" element={<VideoPlayerPage />} />
                <Route path="/assignments" element={<Assignments />} />
                <Route path="/quizzes" element={<Quizzes />} />
                <Route path="/discussions" element={<Discussions />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
