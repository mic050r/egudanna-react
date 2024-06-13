import React from 'react';

// 댓글 섹션 컴포넌트
const CommentSection = ({ commentOpen, toggleCommentSection, comments, handleCommentSubmit, newComment, handleCommentChange, nickname, handleNicknameChange }) => (
    commentOpen && (
        <div className="comment-section">
            <button onClick={toggleCommentSection}>X</button>
            <div>
                {comments.map((comment, index) => (
                    <div key={index}>{comment}</div>
                ))}
            </div>
            <form className="comment-input" onSubmit={handleCommentSubmit}>
                <p>댓글 목록</p>
                <input type="text" placeholder="닉네임을 작성해주세요." value={nickname} onChange={handleNicknameChange} />
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <input type="text" placeholder="댓글을 작성해주세요." value={newComment} onChange={handleCommentChange} />
                    <button type="submit">등록</button>
                </div>
            </form>
        </div>
    )
);

export default CommentSection;
