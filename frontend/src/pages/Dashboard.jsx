import React from "react";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow">
      <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
      <p className="text-gray-500">Instructor: {course.instructor}</p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
        View Course
      </button>
    </div>
  );
};

export default CourseCard;
