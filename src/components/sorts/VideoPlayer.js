import React, { useRef, useState } from 'react';
import trashIcon from '../../img/sorts/trash.svg';
import likeIcon from '../../img/sorts/likes.svg';
import likeOnIcon from '../../img/sorts/likes-on.svg';
import commentIcon from '../../img/sorts/comment.svg';
import { FaPlay, FaPause } from "react-icons/fa";

const VideoPlayer = ({ videoData, onTrashClick, incrementHeartCount, toggleCommentSection, liked }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayVideo = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play().then(() => {
                    setIsPlaying(true);
                }).catch(error => {
                    console.error('Error playing video:', error);
                });
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    return (
        <div>
            <video
                className="bar-info"
                ref={videoRef}
                loop
                disablePictureInPicture
            >
                <source src={videoData.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <button className="trash-button" onClick={onTrashClick}>
                <img src={trashIcon} alt="Trash" className="icon" />
            </button>
            <div className="buttons">
                <div className="heart-container">
                    <button className="button" onClick={incrementHeartCount}>
                        <img src={liked ? likeOnIcon : likeIcon} alt="Heart" className="icon" />
                    </button>
                    <span className="heart-count" style={{ color: liked ? '#F24E1E' : 'white' }}>{videoData.likeNum}</span>
                </div>
                <div className="comment-container">
                    <button className="button" onClick={toggleCommentSection}>
                        <img src={commentIcon} alt="Comment" className="icon" />
                    </button>
                    {/* Ensure videoData.comments is defined before accessing its length */}
                    {console.log(videoData)}
                    <span className="comment-count">{videoData.comments && (videoData.comments).length}</span>
                </div>
            </div>
            <button className="play-video-button" onClick={handlePlayVideo}>
                {isPlaying ? <FaPause /> : <FaPlay/>}
            </button>
        </div>
    );
};

export default VideoPlayer;
