import api from './api';

export const fetchCourses = async () => {
    const response = await api.get('/courses');
    return response.data;
};

export const fetchCourseById = async (courseId) => {
    const response = await api.get(`/courses/${courseId}`);
    return response.data;
};
