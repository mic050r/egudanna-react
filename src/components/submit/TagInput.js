import React, { useState } from "react";
import { FiX } from "react-icons/fi"; // react-icons에서 x 아이콘을 import
import "../../css/record/tag.css";

function TagInput({ tags, setTags }) {
  const [inputText, setInputText] = useState("");

  const handleTagAdd = (e) => {
    e.preventDefault(); // 폼의 기본 제출 동작 막기

    if (inputText.trim() !== "") {
      setTags([...tags, inputText.trim()]); // 입력된 내용 그대로 저장
      setInputText("");
    }
  };

  const handleTagDelete = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 폼의 기본 제출 동작 막기
      handleTagAdd(e);
    }
  };

  return (
    <div id="container">
      <div id="outputContainer">
        {tags.map((tag, index) => (
          <div key={index} className="taggedContent">
            {tag}
            <span
              className="deleteButton"
              onClick={() => handleTagDelete(index)}
            >
              <FiX /> {/* react-icons의 FiX 아이콘 사용 */}
            </span>
          </div>
        ))}
        <div id="inputContainer">
          <input
            type="text"
            id="inputText"
            value={inputText}
            placeholder="태그 입력"
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
          />
        </div>
      </div>
    </div>
  );
}

export default TagInput;
