import React from 'react';

const VideoPlayer = ({ video }) => {
    return (
        <div>
            <h3>{video.title}</h3>
            <video width="100%" controls poster={video.thumbnail_path}>
                <source src={video.file_path} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <p>{video.description}</p>
        </div>
    );
};

export default VideoPlayer;
