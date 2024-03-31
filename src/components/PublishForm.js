import React, { useState } from "react";
import "../css/publishForm.css";

function PublishForm({ onCancel, onPublish }) {
  const [title, setTitle] = useState("");
  const [nickname, setNickname] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [email, setEmail] = useState("");

  const handlePublish = () => {
    const data = {
      title,
      nickname,
      hashtags: hashtags.split(/\s+/), // 공백을 기준으로 해시태그를 분할하여 배열로 저장합니다.
      email,
    };
    onPublish(data);
  };

  return (
    <div className="section">
      <div className="publish-form">
        <div className="publish">발행</div>
        <div className="input-group">
          <input
            type="text"
            id="title"
            value={title}
            placeholder="제목 입력"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="nickname" className="input-label">
            닉네임 입력
          </label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            placeholder="닉네임을 입력해주세요."
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="hashtags" className="input-label">
            해시태그 추가
          </label>
          <input
            type="text"
            id="hashtags"
            value={hashtags}
            placeholder="#태그입력"
            onChange={(e) => setHashtags(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="email" className="input-label">
            이메일 입력
          </label>
          <input
            type="text"
            id="email"
            value={email}
            placeholder="이메일을 입력하면 영상을 받을 수 있어요!"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <p></p>
        </div>
        <div className="button-group">
          <button onClick={onCancel} className="cancel">
            취소
          </button>
          <button onClick={handlePublish} className="submit">
            공개 발행
          </button>
        </div>
      </div>
    </div>
  );
}

export default PublishForm;
