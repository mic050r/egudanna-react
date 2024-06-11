import React, { useState } from 'react';
import { FaReact } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { FiTrash } from 'react-icons/fi'; // Import trash icon
import '../css/sorts.css';

function App() {
    const [commentOpen, setCommentOpen] = useState(false);
    const [heartCount, setHeartCount] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false); // State to handle confirmation div

    const toggleCommentSection = () => {
        setCommentOpen(!commentOpen);
    };

    const incrementHeartCount = () => {
        setHeartCount(heartCount + 1);
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
                        <button className="button" onClick={incrementHeartCount}>❤️</button>
                        <span className="heart-count">{heartCount}</span>
                    </div>
                    <div className="comment-container">
                        <button className="button" onClick={toggleCommentSection}>💬</button>
                        <span className="comment-count">{comments.length}</span>
                    </div>
                </div>
                <div className="left-sidebar">
                    <div className="sidebar-item">
                        <FaReact /> 사용자 이름
                    </div>
                    <div className="sidebar-item">제목 내용</div>
                    <div className="sidebar-item">
                        <FaReact />
                        <ul className="song-list">
                            <li>노래 1</li>
                            <li>노래 2</li>
                            <li>노래 3</li>
                        </ul>
                    </div>
                </div>
            </div>
            {commentOpen && (
                <div className="comment-section">
                    <form onSubmit={handleCommentSubmit} className="comment-form">
                        <input
                            type="text"
                            value={newComment}
                            onChange={handleCommentChange}
                            placeholder="Add a comment"
                            className="comment-input"
                        />
                        <button type="submit" className="comment-submit">Post</button>
                    </form>
                    <div className="comments-list">
                        {comments.map((comment, index) => (
                            <div key={index} className="comment">
                                {comment}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="bottom-left-buttons">
                <button className="button">?</button>
                {!isRecording ? (
                    <button className="button" onClick={handleStartRecording}>+</button>
                ) : (
                    <button className="start-recording">촬영 시작하기</button>
                )}
            </div>
        </div>
    );
}

export default App;
