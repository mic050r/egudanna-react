import React, { useState } from 'react';

// 확인 대화상자 컴포넌트
const ConfirmationDialog = ({ showConfirmation, handleTrashClick }) => {
    const [password, setPassword] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        showConfirmation && (
            <div className="confirmation-div">
                <p>영상 삭제</p>
                <div>
                    <input type="text" placeholder="영상을 업로드했을 때 입력했던 비밀번호를 입력해주세요." value={password} onChange={handlePasswordChange} />
                    <button onClick={() => {
                        return (
                            <div className="confirmation-overlay">
                                <p>정말 영상을 영구 삭제하시겠습니까?</p>
                                <div>
                                    <button>아니오</button>
                                </div>
                            </div>)
                    }}>확인</button>
                </div>
            </div>
        )
    );
};

export default ConfirmationDialog;
