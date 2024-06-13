import React, { useRef, useEffect } from 'react';
import { FiTrash } from 'react-icons/fi';
import likeIcon from '../../img/sorts/likes.svg';
import likeOnIcon from '../../img/sorts/likes-on.svg';
import commentIcon from '../../img/sorts/comment.svg';

// 비디오 플레이어 컴포넌트
const VideoPlayer = ({ videoData, onTrashClick, incrementHeartCount, toggleCommentSection, liked }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        // 비디오 자동 재생
        if (videoRef.current) {
            videoRef.current.play();
        }
    }, [videoData]);

    return (
        <div>
            <video
                className="bar-info"
                ref={videoRef}
                autoPlay
                loop
                disablePictureInPicture
            >
                <source src={videoData.video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <button className="trash-button" onClick={onTrashClick}>
                <FiTrash />
            </button>
            <div className="buttons">
                <div className="heart-container">
                    <button className="button" onClick={incrementHeartCount}>
                        <img src={liked ? likeOnIcon : likeIcon} alt="Heart" className="icon" />
                    </button>
                    <span className="heart-count" style={{ color: liked ? '#F24E1E' : 'white' }}>{videoData.likes}</span>
                </div>
                <div className="comment-container">
                    <button className="button" onClick={toggleCommentSection}>
                        <img src={commentIcon} alt="Comment" className="icon" />
                    </button>
                    <span className="comment-count">{videoData.comments.length}</span>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
