import React, { useState } from "react";
import "../css/tag.css";

function TagInput({ tags, setTags }) {
  const [inputText, setInputText] = useState("");

  const handleTagAdd = () => {
    if (inputText.trim() !== "") {
      setTags([...tags, inputText.trim()]);
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
      handleTagAdd();
    }
  };

  return (
    <div id="container">
      <div id="outputContainer">
        {tags.map((tag, index) => (
          <div key={index} className="taggedContent">
            #{tag}
            <span
              className="deleteButton"
              onClick={() => handleTagDelete(index)}
            >
              x
            </span>
          </div>
        ))}
        <div id="inputContainer">
          <input
            type="text"
            id="inputText"
            value={inputText}
            placeholder="#태그 입력"
            onChange={handleInputChange}
            onKeyPress={handleInputKeyPress}
          />
        </div>
      </div>
    </div>
  );
}

export default TagInput;
