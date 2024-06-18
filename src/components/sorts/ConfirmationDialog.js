import React, { useState } from 'react';

const ConfirmationDialog = ({ videoId, showConfirmation, handleDeleteVideo }) => {
    const [password, setPassword] = useState('');
    const [showOverlay, setShowOverlay] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmClick = () => {
        setShowOverlay(true);
    };

    const handleOverlayConfirmClick = () => {
        // Call the API to delete the video
        handleDeleteVideo(videoId, password);
        // Reset states and close overlay after deletion
        setPassword('');
        setShowOverlay(false);
    };

    const handleOverlayCancelClick = () => {
        setShowOverlay(false);
    };

    return (
        showConfirmation && (
            <>
                {showOverlay ? (
                    <div className="confirmation-overlay">
                        <p>정말 영상을 영구 삭제하시겠습니까?</p>
                        <div>
                            <button onClick={handleOverlayConfirmClick}>예</button>
                            <button onClick={handleOverlayCancelClick}>아니오</button>
                        </div>
                    </div>
                ) : (
                    <div className="confirmation-div">
                        <p>영상 삭제</p>
                        <div>
                            <input
                                type="password"
                                placeholder="영상을 업로드했을 때 입력했던 비밀번호를 입력해주세요."
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <button onClick={handleConfirmClick}>확인</button>
                        </div>
                    </div>
                )}
            </>
        )
    );
};

export default ConfirmationDialog;
