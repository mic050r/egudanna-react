import React, { useState, useRef, useEffect } from 'react';
import { FaReact } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { FiTrash } from 'react-icons/fi';
import likeIcon from '../img/sorts/likes.svg';
import likeOnIcon from '../img/sorts/likes-on.svg';
import commentIcon from '../img/sorts/comment.svg';
import userIcon from '../img/sorts/user.svg';
import musicIcon from '../img/sorts/music.svg';
import '../css/sorts.css';

// 가상의 JSON 데이터
const barData = [
    {
        id: 1,
        name: 'Jane Smith',
        title: '제목입니다',
        video: '/videos/example.mp4',
        songs: [
            '노래1',
            '노래2',
        ]
    },
    {
        id: 2,
        name: 'Jane Smith',
        title: '제목입니다',
        video: '/videos/example.mp4',
        songs: [
            '노래1',
            '노래4',
        ]
    },
    {
        id: 3,
        name: 'Jane Smith',
        title: '제목입니다',
        video: '/videos/example.mp4',
        songs: [
            '노래1',
            '노래2',
            '노래3',
            '노래4',
        ]
    },
    // 다른 바들의 데이터도 추가할 수 있습니다.
];

function App() {
    const [hoveredBar, setHoveredBar] = useState(null);

    const [commentOpen, setCommentOpen] = useState(false);
    const [heartCount, setHeartCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const videoRefs = useRef({});

    useEffect(() => {
        const handleWheel = (event) => {
            if (event.deltaY > 0) {
                // 마우스 휠을 아래로 스크롤할 때
                if (currentIndex < barData.length - 1) {
                    setCurrentIndex(currentIndex + 1);
                }
            } else {
                // 마우스 휠을 위로 스크롤할 때
                if (currentIndex > 0) {
                    setCurrentIndex(currentIndex - 1);
                }
            }
        };

        window.addEventListener('wheel', handleWheel);

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, [currentIndex]);

    const toggleCommentSection = () => {
        setCommentOpen(!commentOpen);
    };

    const incrementHeartCount = () => {
        setHeartCount(heartCount + 1);
        setLiked(true);
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim() !== '') {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

    const handleStartRecording = () => {
        setIsRecording(true);
    };

    const handleTrashClick = () => {
        setShowConfirmation(!showConfirmation);
    };

    return (
        <div className="container">
            <div className="search-bar-sorts">
                <input type="text" placeholder="찾고 있는 영상을 검색하세요!" className="search-input" />
                <button className="search-button"><FiSearch /></button>
            </div>

            <div className="image-wrapper">
                {barData.length > 0 && (
                    <div key={barData[currentIndex].id}>
                        <video
                            className="bar-info"
                            ref={(el) => {
                                if (el) {
                                    videoRefs.current[barData[currentIndex].id] = el;
                                    videoRefs.current[barData[currentIndex].id].play();
                                }
                            }}
                            autoPlay={hoveredBar === barData[currentIndex].id}
                            loop
                            controls
                        >
                            <source src={barData[currentIndex].video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <button className="trash-button" onClick={handleTrashClick}>
                            <FiTrash />
                        </button>
                        {showConfirmation && (
                            <div className="confirmation-div">
                                <span>Are you sure?</span>
                                <button onClick={() => setShowConfirmation(false)}>Confirm</button>
                            </div>
                        )}
                        <div className="buttons">
                            <div className="heart-container">
                                <button className="button" onClick={incrementHeartCount}>
                                    <img src={liked ? likeOnIcon : likeIcon} alt="Heart" className="icon" />
                                </button>
                                <span className="heart-count" style={{ color: liked ? 'red' : 'white' }}>{heartCount}</span>
                            </div>
                            <div className="comment-container">
                                <button className="button" onClick={toggleCommentSection}>
                                    <img src={commentIcon} alt="Comment" className="icon" />
                                </button>
                                <span className="comment-count">{comments.length}</span>
                            </div>
                        </div>
                        <div className="left-sidebar">
                            <div className="sidebar-item">
                                <img src={userIcon} className='item-icon' /> {barData[currentIndex].name}
                            </div>
                            <div className="sidebar-item">{barData[currentIndex].title}</div>
                            <div className="sidebar-item">
                                <img src={musicIcon} className='item-icon' />
                                <ul className="song-list">
                                    {barData[currentIndex].songs.map((song, index) => (
                                        <li key={index}>{song}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        {commentOpen && (
                            <div className="comment-section">
                                <form onSubmit={handleCommentSubmit}>
                                    <input type="text" value={newComment} onChange={handleCommentChange} />
                                    <button type="submit">Add Comment</button>
                                </form>
                                {/* Display existing comments */}
                                <ul>
                                    {comments.map((comment, index) => (
                                        <li key={index}>{comment}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="bottom-left-buttons">
                <button className="button">?</button>
                {!isRecording ? (
                    <button className="button" onClick={handleStartRecording}>+</button>
                ) : (
                    <button className="start-recording" onClick={() => window.location.href = '/screen'}>촬영 시작하기</button>
                )}
            </div>
            {/* Conditionally render the next-image-wrapper */}
            {currentIndex < barData.length - 1 && (
                <video className="next-image-wrapper"
                    ref={(el) => {
                        if (el) {
                            videoRefs.current[barData[currentIndex + 1].id] = el;
                            videoRefs.current[barData[currentIndex + 1].id].pause();
                        }
                    }}
                    autoPlay={hoveredBar === barData[currentIndex + 1].id}
                    loop
                    controls
                >
                    <source src={barData[currentIndex + 1].video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
        </div >
    );
}

export default App;
