import React, { useState } from 'react';
import { FaReact } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { FiTrash } from 'react-icons/fi';
import likeIcon from '../img/sorts/likes.svg';
import likeOnIcon from '../img/sorts/likes-on.svg';
import commentIcon from '../img/sorts/comment.svg';
import userIcon from '../img/sorts/user.svg';
import musicIcon from '../img/sorts/music.svg';
import '../css/sorts.css';

function App() {
    const [commentOpen, setCommentOpen] = useState(false);
    const [heartCount, setHeartCount] = useState(0);
    const [liked, setLiked] = useState(false); // New state for like button
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false); // State to handle confirmation div

    const toggleCommentSection = () => {
        setCommentOpen(!commentOpen);
    };

    const incrementHeartCount = () => {
        setHeartCount(heartCount + 1);
        setLiked(true); // Set liked to true when the button is clicked
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
        setShowConfirmation(!showConfirmation); // Toggle confirmation div visibility
    };

    return (
        <div className="container">
            <div className="search-bar-sorts">
                <input type="text" placeholder="찾고 있는 영상을 검색하세요!" className="search-input" />
                <button className="search-button"><FiSearch /></button>
            </div>

            <div className="image-wrapper">
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
                        <img src={userIcon} className='item-icon'/> 사용자 이름
                    </div>
                    <div className="sidebar-item">제목 내용</div>
                    <div className="sidebar-item">
                    <img src={musicIcon} className='item-icon'/> 
                        <ul className="song-list">
                            <li>Wonka 1971 Oompa Loo</li>
                            <li>Wonka 1971 Oompa Loo</li>
                            <li>Wonka 1971 Oompa Loo</li>
                            <li>웡카</li>
                            <li>노래 3</li>
                        </ul>
                    </div>
                </div>
            </div>
            {
                commentOpen && (
                    <div className="comment-section">
                        
                    </div>
                )
            }
            <div className="bottom-left-buttons">
                <button className="button">?</button>
                {!isRecording ? (
                    <button className="button" onClick={handleStartRecording}>+</button>
                ) : (
                    <button className="start-recording" onClick={() => window.location.href= '/screen'}>촬영 시작하기</button>
                )}
            </div>
            <div className="next-image-wrapper ">

            </div>
        </div >
    );
}

export default App;
