import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCourseById } from '../services/courseService';
import VideoPlayer from '../components/VideoPlayer';

const CourseDetail = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const loadCourse = async () => {
            const data = await fetchCourseById(courseId);
            setCourse(data);
        };
        loadCourse();
    }, [courseId]);

    if (!course) return <div>Loading...</div>;

    return (
        <div>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <h3>Videos</h3>
            {course.videos?.map((video) => (
                <VideoPlayer key={video.video_id} video={video} />
            ))}
        </div>
    );
};

export default CourseDetail;
