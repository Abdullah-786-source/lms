import React, { useEffect, useState } from "react";

export default function CourseVideoPlayer({ videoId }) {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideo() {
      try {
        const response = await fetch(`http://localhost:5000/api/course-videos/1`);
        const data = await response.json();
        setVideoData(data);
      } catch (error) {
        console.error("Error loading video:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchVideo();
  }, [videoId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading video...
      </div>
    );
  }

  if (!videoData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-red-600">
        Video not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-3xl">
        <h1 className="text-2xl font-semibold mb-4">{videoData.title}</h1>

        <video
          controls
          className="w-full rounded-xl border mb-4"
        >
          <source src={`http://localhost:5000${videoData.file_path}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <p className="text-gray-700 mb-2">{videoData.description}</p>
        <p className="text-gray-600 text-sm">Duration: {videoData.duration_seconds} seconds</p>
      </div>
    </div>
  );
}