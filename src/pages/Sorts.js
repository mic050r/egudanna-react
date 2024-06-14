import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';
import SearchBar from '../components/sorts/SearchBar';
import VideoPlayer from '../components/sorts/VideoPlayer';
import SideBar from '../components/sorts/SideBar';
import ConfirmationDialog from '../components/sorts/ConfirmationDialog';
import CommentSection from '../components/sorts/CommentSection';
import '../css/sorts.css';

const initialBarData = [
    {
        id: 1,
        nickname: 'Jane Smith',
        title: '제목입니다',
        videoUrl: '/videos/example.mp4',
        hashtags: '#노래1#노래2',
        password: "000haeun1111",
        likeNum: 0,
        comments: [],
    },
    {
        id: 2,
        nickname: 'Jane Smith',
        title: '제목입니다',
        videoUrl: '/videos/example.mp4',
        hashtags: '#노래1#노래4',
        password: "000haeun1111",
        likeNum: 5,
        comments: [],
    },
    {
        id: 3,
        nickname: 'Jane Smith',
        title: '제목입니다',
        videoUrl: '/videos/example.mp4',
        hashtags: '#노래1#노래2#노래3#노래4',
        password: "000haeun1111",
        likeNum: 1,
        comments: [],
    },
];

const App = () => {
    const [hoveredBar, setHoveredBar] = useState(null);
    const [commentOpen, setCommentOpen] = useState(false);
    const [heartCount, setHeartCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [nickname, setNickname] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [challenges, setChallenges] = useState([]);
    const [barData, setBarData] = useState(initialBarData);

    useEffect(() => {
        getChallenges();
    }, []);

    const getChallenges = async () => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_HOST}/api/challenges`);
            console.log(response.data);
            setChallenges(response.data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        const handleWheel = debounce((event) => {
            if (!commentOpen) {
                // Calculate scroll direction based on deltaY
                if (event.deltaY > 0) {
                    // Scroll down
                    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, barData.length - 1));
                } else {
                    // Scroll up
                    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
                }
                // Reset states
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

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim() !== '' && nickname.trim() !== '') {
            const newComments = [...comments, { nickname, text: newComment }];
            setComments(newComments);
            setNewComment('');
            setNickname('');
            setBarData((prevBarData) =>
                prevBarData.map((item, index) =>
                    index === currentIndex ? { ...item, comments: [...item.comments, { nickname, text: newComment }] } : item
                )
            );
        }
    };

    const handleStartRecording = () => {
        setIsRecording(true);
    };

    const handleTrashClick = () => {
        setShowConfirmation(!showConfirmation);
    };

    const handleDeleteVideo = () => {
        setBarData((prevBarData) => {
            const newBarData = prevBarData.filter((_, index) => index !== currentIndex);
            setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
            return newBarData;
        });
        setShowConfirmation(false);
        setCommentOpen(false);
        setLiked(false);
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
                comments={barData[currentIndex]?.comments || []}
                handleCommentSubmit={handleCommentSubmit}
                newComment={newComment}
                handleCommentChange={handleCommentChange}
                nickname={nickname}
                handleNicknameChange={handleNicknameChange}
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
