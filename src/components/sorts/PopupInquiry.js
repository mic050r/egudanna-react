import React, { useState } from 'react';
import { FiX } from "react-icons/fi";
import axios from 'axios';

function ChallengeRecommendationPopup({ setIsPopupVisible }) {
    const [artist, setArtist] = useState('');
    const [challengeName, setChallengeName] = useState('');

    const handleArtistChange = (e) => setArtist(e.target.value);
    const handleChallengeNameChange = (e) => setChallengeName(e.target.value);

    const closePopup = () => setIsPopupVisible(false);

    const handleSubmit = async () => {
        if (artist.trim() !== '' && challengeName.trim() !== '') {
            try {
                const payload = {
                    question: challengeName,
                    idol: artist,
                };
                console.log('Submitting challenge recommendation:', payload);

                const response = await axios.post(`${process.env.REACT_APP_HOST}/api/questions`, {
                    question: challengeName,
                    idol: artist,
                });
                console.log('Response from server:', response.data);
                setArtist('');
                setChallengeName('');
                closePopup();
            } catch (err) {
                console.error('Error adding challenge recommendation:', err.response || err.message);
            }
        }
    };

    return (
        <div className="popup" onClick={closePopup}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <FiX className='x' onClick={closePopup} />
                <h2>문의사항</h2>
                <h3>추가하고 싶은 챌린지 추천</h3>
                <label>
                    가수
                    <input
                        placeholder="가수를 입력하세요"
                        type="text"
                        value={artist}
                        onChange={handleArtistChange}
                        className="no-border"
                    />
                </label>
                <label>
                    챌린지 이름
                    <input
                        placeholder="제목을 입력하세요"
                        type="text"
                        value={challengeName}
                        onChange={handleChallengeNameChange}
                        className="no-border"
                    />
                </label>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default ChallengeRecommendationPopup;
