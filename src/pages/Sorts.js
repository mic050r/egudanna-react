import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';
import SearchBar from '../components/sorts/SearchBar';
import VideoPlayer from '../components/sorts/VideoPlayer';
import SideBar from '../components/sorts/SideBar';
import ConfirmationDialog from '../components/sorts/ConfirmationDialog';
import CommentSection from '../components/sorts/CommentSection';
import '../css/sorts.css';

const App = () => {
    const [hoveredBar, setHoveredBar] = useState(null);
    const [commentOpen, setCommentOpen] = useState(false);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [nickname, setNickname] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(1);
    const [barData, setBarData] = useState([]);

    useEffect(() => {
        getChallenges();
    }, [currentIndex]);

    useEffect(() => {
        if(barData.length > 0) {
            getComments()
        }
    }, [barData])

    const getChallenges = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_HOST}/api/challenges`);
            setBarData(response.data);
            
        } catch (err) {
            console.error('Error fetching challenges:', err);
        }
    };
    useEffect(() => {
        const handleWheel = debounce((event) => {
            if (!commentOpen) {
                if (event.deltaY > 0) {
                    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, barData.length - 1));
                } else {
                    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 1));
                }
                // getComments()
                setCommentOpen(false);
                setLiked(false);
                setShowConfirmation(false);
            }
        }, 200);

        window.addEventListener('wheel', handleWheel);

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, [commentOpen, barData.length]);

    const toggleCommentSection = () => {
        setCommentOpen(!commentOpen);
    };

    const getComments = async () => {
        try {
            // debugger
            const numberC = (barData[currentIndex].id);
            const com = await axios.get(`${process.env.REACT_APP_HOST}/api/comments/${numberC}`);
            setComments(com.data);
        } catch (err) {
            console.error('Error fetching challenges:', err);
        }
    };
    const incrementHeartCount = () => {
        setLiked(true);
        setBarData((prevBarData) =>
            prevBarData.map((item, index) =>
                index === currentIndex ? { ...item, likeNum: item.likeNum + 1 } : item
            )
        );
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() !== '' && nickname.trim() !== '') {
        try {
            const payload = {
                challenge_id: barData[currentIndex].id,
                nickname: nickname,
                comment: newComment,
            };
            console.log('Submitting comment:', payload);
        
            const response = await axios.post(`${process.env.REACT_APP_HOST}/api/comments`, {
                challengeId: payload.challenge_id, 
                nickname: payload.nickname, 
                comment: payload.comment
            }, {
            });
        
            console.log('Response from server:', response.data);
        
            const updatedComments = [...comments, response.data];
            setComments(updatedComments);
            setNewComment('');
            setNickname('');
            setBarData((prevBarData) =>
                prevBarData.map((item, index) =>
                    index === currentIndex ? { ...item, comments: updatedComments } : item
                )
            );
        } catch (err) {
            console.error('Error adding comment:', err);
        }
        
    }
};

    const handleStartRecording = () => {
        setIsRecording(true);
    };

    const handleTrashClick = () => {
        setShowConfirmation(!showConfirmation);
    };

    const handleDeleteVideo = async (videoId, password) => {
        try {
            const videoId = barData[currentIndex].id;
            console.log('Deleting video with ID:', videoId); // 추가 로그

            const response = await axios.delete(`${process.env.REACT_APP_HOST}/api/challenges/${videoId}`, {
                data: {
                    password: password
                }
            });
            console.log('Delete response:', response); // 추가 로그

            setBarData((prevBarData) => prevBarData.filter((_, index) => index !== currentIndex));
            setShowConfirmation(false);
            setCommentOpen(false);
            setLiked(false);
            setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } catch (err) {
            console.error('Error deleting video:', err);
        }
    };


    return (
        <div className="container">
            <SearchBar />
            <div className="image-wrapper">
                {barData.length > 0 ? (
                    <div key={barData[currentIndex].id}>
                        <VideoPlayer
                            videoData={barData[currentIndex]}
                            onTrashClick={handleTrashClick}
                            incrementHeartCount={incrementHeartCount}
                            toggleCommentSection={toggleCommentSection}
                            liked={liked}
                            comments={comments}
                        />
                        <SideBar videoData={barData[currentIndex]} />
                    </div>
                ) : (
                    <div className="no-video-message">
                        <p>영상이 없습니다.</p>
                    </div>
                )}
            </div>
            <ConfirmationDialog
                showConfirmation={showConfirmation}
                handleTrashClick={handleTrashClick}
                handleDeleteVideo={handleDeleteVideo}
            />
            <CommentSection
                commentOpen={commentOpen}
                toggleCommentSection={toggleCommentSection}
                comments={comments || []}
                handleCommentSubmit={handleCommentSubmit}
                newComment={newComment}
                handleCommentChange={handleCommentChange}
                nickname={nickname}
                handleNicknameChange={handleNicknameChange}
                currentIndex={currentIndex}
                barData={barData}
            />

            <div className="bottom-left-buttons">
                <button className="button">?</button>
                {!isRecording ? (
                    <button className="button" onClick={handleStartRecording}>+</button>
                ) : (
                    <button className="start-recording" onClick={() => window.location.href = '/screen'}>촬영 시작하기</button>
                )}
            </div>
            {currentIndex < barData.length - 1 && (
                <video
                    className="next-image-wrapper"
                    autoPlay={hoveredBar === barData[currentIndex + 1].id}
                    loop
                    muted
                    disablePictureInPicture
                >
                    <source src={barData[currentIndex + 1].videoUrl} type="video/mp4" />
                </video>
            )}
        </div>
    );
};

export default App;
