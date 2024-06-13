import React, { useState } from "react";
import "../../css/record/publishForm.css";
import TagInput from "./TagInput"; // 태그 입력 컴포넌트 import

const PublishForm = ({
  onCancel,
  onPublish,
  challenge_name,
  difficulty,
  videoUrl,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tags, setTags] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      videoUrl,
      levelId: difficulty,
      likeNum: 0,
      title,
      nickname,
      hashtag: tags.join(" "),
      email,
      password,
      challenge_name,
    };
    onPublish(data);
  };

  return (
    <div className="section">
      <div className="publish-form">
        <div className="publish">발행</div>
        <form onSubmit={handleSubmit}>
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
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              placeholder="ex) 미림여신"
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="hashtags" className="input-label">
              해시태그
            </label>
            <TagInput tags={tags} setTags={setTags} />{" "}
            {/* TagInput 컴포넌트 사용 */}
          </div>
          <div className="input-group">
            <label htmlFor="password" className="input-label">
              비밀번호
            </label>
            <input
              type="password"
              password
              value={password}
              placeholder="비밀번호를 입력해주세요."
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="pass-description">
            **영상 수정을 할 때 비밀번호를 입력하면 수정할 수 있어요!
          </p>
          <div className="input-group">
            <label htmlFor="email" className="input-label">
              이메일
            </label>
            <input
              type="text"
              id="email"
              value={email}
              placeholder="구글 이메일을 입력해주세요."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <p className="email-description">
            **이메일을 입력하면 영상을 받을 수 있어요!
          </p>
          <div className="button-group">
            <button type="button" onClick={onCancel} className="cancel">
              취소
            </button>
            <button type="submit" className="submit">
              공개 발행
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublishForm;
