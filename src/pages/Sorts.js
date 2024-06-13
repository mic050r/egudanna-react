import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/sorts/SearchBar';
import VideoPlayer from '../components/sorts/VideoPlayer';
import SideBar from '../components/sorts/SideBar';
import ConfirmationDialog from '../components/sorts/ConfirmationDialog';
import CommentSection from '../components/sorts/CommentSection';
import '../css/sorts.css';

const barData = [
    {
        id: 1,
        name: 'Jane Smith',
        title: '제목입니다',
        video: '/videos/example.mp4',
        songs: ['노래1', '노래2'],
        likes: 0,
        comments: [],
    },
    {
        id: 2,
        name: 'Jane Smith',
        title: '제목입니다',
        video: '/videos/example.mp4',
        songs: ['노래1', '노래4'],
        likes: 5,
        comments: [],
    },
    {
        id: 3,
        name: 'Jane Smith',
        title: '제목입니다',
        video: '/videos/example.mp4',
        songs: ['노래1', '노래2', '노래3', '노래4'],
        likes: 1,
        comments: [],
    },
];

const App = () => {
    const [hoveredBar, setHoveredBar] = useState(null);
    const [commentOpen, setCommentOpen] = useState(false);
    const [heartCount, setHeartCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState([]);
    const [nickname, setNickname] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [ challenges, setChallenges ] = useState([]);

    useEffect(() => {
        getCallenge();

    }, [])

    const getCallenge = async () => {
        try{
            let response = await axios.get(`${process.env.REACT_APP_HOST}/api/challenges`);
            console.log(response.data);
            setChallenges(response.data);
        }catch(err){
            console.error(err);
        }
    }

    // 마우스 휠 이벤트 핸들러
    useEffect(() => {
        const handleWheel = (event) => {
            if (!commentOpen) {
                if (event.deltaY > 0) {
                    // 스크롤 다운
                    setTimeout(() => {
                        if (currentIndex < barData.length - 1) {
                            setCurrentIndex(currentIndex + 1);
                            setCommentOpen(false);
                            setLiked(false);
                            setShowConfirmation(false);
                        }
                    }, 400);
                } else {
                    // 스크롤 업
                    setTimeout(() => {
                        if (currentIndex > 0) {
                            setCurrentIndex(currentIndex - 1);
                            setCommentOpen(false);
                            setLiked(false);
                            setShowConfirmation(false);
                        }
                    }, 400);
                }
            }
        };

        window.addEventListener('wheel', handleWheel);

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, [currentIndex, commentOpen]);

    // 댓글 섹션 토글 함수
    const toggleCommentSection = () => {
        setCommentOpen(!commentOpen);
    };

    // 좋아요 증가 함수
    const incrementHeartCount = () => {
        setHeartCount(heartCount + 1);
        setLiked(true);
        barData[currentIndex].likes += 1;
    };

    // 댓글 입력 변경 핸들러
    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    // 닉네임 입력 변경 핸들러
    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    };

    // 댓글 제출 핸들러
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim() !== '' && nickname.trim() !== '') {
            setComments([...comments,
                <div className='input-things'>
                    <p>{nickname}</p>
                    <p>{newComment}</p>
                </div>]);
            setNewComment('');
            setNickname('');
            barData[currentIndex].comments.push(
                <div className='input-things'>
                    <p>{nickname}</p>
                    <p>{newComment}</p>
                </div>);
        }
    };

    // 녹화 시작 함수
    const handleStartRecording = () => {
        setIsRecording(true);
    };

    // 휴지통 버튼 클릭 핸들러
    const handleTrashClick = () => {
        setShowConfirmation(!showConfirmation);
    };

    return (
        <div className="container">
            <SearchBar />
            <div className="image-wrapper">
                {barData.length > 0 && (
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
                )}
            </div>
            <ConfirmationDialog showConfirmation={showConfirmation} handleTrashClick={handleTrashClick} />
            <CommentSection
                commentOpen={commentOpen}
                toggleCommentSection={toggleCommentSection}
                comments={barData[currentIndex].comments}
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
                <video className="next-image-wrapper"
                    autoPlay={hoveredBar === barData[currentIndex + 1].id}
                    loop
                    muted
                    disablePictureInPicture
                >
                    <source src={barData[currentIndex + 1].video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    );
}

export default App;
