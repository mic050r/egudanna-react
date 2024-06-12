import React, { useState, useRef, useEffect } from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import "../css/screen.css";
import searchImage from "../img/screen/search.svg";
import barData from "../data/reference_video_data.json";

function App() {
  const [hoveredBar, setHoveredBar] = useState(null);
  const [difficulty, setDifficulty] = useState("All");
  const [difficultyDropdownVisible, setDifficultyDropdownVisible] =
    useState(false);
  const [category, setCategory] = useState("All");
  const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);
  const videoRefs = useRef({});

  useEffect(() => {
    const handleUserInteraction = () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };
  }, []);

  const handleBarHover = (barId) => {
    setHoveredBar(barId);
    if (videoRefs.current[barId]) {
      videoRefs.current[barId].play().catch((error) => {
        console.error("Error playing video:", error);
      });
      videoRefs.current[barId].muted = false;
      videoRefs.current[barId].volume = 1;
    }
  };

  const handleBarLeave = (barId) => {
    setHoveredBar(null);
    if (videoRefs.current[barId]) {
      videoRefs.current[barId].pause();
      videoRefs.current[barId].currentTime = 0;
      videoRefs.current[barId].muted = false;
    }
  };

  const handleBarClick = (barId) => {
    // 여기에서 다른 페이지로 이동하는 로직을 추가합니다.
    // 예: window.location.href = `/details/${barId}`;
    alert(`Redirect to /details/${barId}`);
  };

  const handleDifficultyClick = () => {
    if (!difficultyDropdownVisible && categoryDropdownVisible) {
      setCategoryDropdownVisible(false);
    }
    setDifficultyDropdownVisible(!difficultyDropdownVisible);
  };

  const handleCategoryClick = () => {
    if (!categoryDropdownVisible && difficultyDropdownVisible) {
      setDifficultyDropdownVisible(false);
    }
    setCategoryDropdownVisible(!categoryDropdownVisible);
  };

  const handleDifficultySelect = (level) => {
    setDifficulty(level);
    setDifficultyDropdownVisible(false);
  };

  const handleCategorySelect = (category) => {
    setCategory(category);
    setCategoryDropdownVisible(false);
  };

  const getCategoryIcon = (categoryItem) => {
    if (category === categoryItem) {
      return <FaCheckCircle />;
    } else {
      return <FaRegCircle />;
    }
  };

  const getDifficultyIcon = (level) => {
    if (difficulty === level) {
      return <FaCheckCircle />;
    } else {
      return <FaRegCircle />;
    }
  };

  const filteredBarData = barData.filter(
    (bar) =>
      (difficulty === "All" || bar.difficulty === difficulty) &&
      (category === "All" || bar.tags === category)
  );

  return (
    <div className="screen-container">
      <div className="search-bar">
        <input
          type="text"
          className="bar-search"
          placeholder="추고 싶은 챌린지 검색"
        />
        <img src={searchImage} className="bar-button" alt="Search" />
      </div>

      <div className="dropdown-container">
        <div className="difficulty-button-container">
          <button onClick={handleCategoryClick} className="difficulty-button">
            <div>{category === "All" ? "아이돌" : category}</div>{" "}
            <div>{categoryDropdownVisible ? "▲" : "▼"}</div>
          </button>
          {categoryDropdownVisible && (
            <div className="difficulty-dropdown">
              <div
                onClick={() => handleCategorySelect("All")}
                className="dropdown-item"
              >
                <div className="item-drop">{getCategoryIcon("All")}</div>
                All
              </div>
              <div
                onClick={() => handleCategorySelect("에스파")}
                className="dropdown-item"
              >
                <div className="item-drop">{getCategoryIcon("에스파")}</div>
                에스파
              </div>
              <div
                onClick={() => handleCategorySelect("아이브")}
                className="dropdown-item"
              >
                <div className="item-drop">{getCategoryIcon("아이브")}</div>
                아이브
              </div>
              <div
                onClick={() => handleCategorySelect("NCT")}
                className="dropdown-item"
              >
                <div className="item-drop">{getCategoryIcon("NCT")}</div>
                NCT
              </div>
              <div
                onClick={() => handleCategorySelect("세븐틴")}
                className="dropdown-item"
              >
                <div className="item-drop">{getCategoryIcon("세븐틴")}</div>
                세븐틴
              </div>
              <div
                onClick={() => handleCategorySelect("뉴진스")}
                className="dropdown-item"
              >
                <div className="item-drop">{getCategoryIcon("뉴진스")}</div>
                뉴진스
              </div>
              <div
                onClick={() => handleCategorySelect("TXT")}
                className="dropdown-item"
              >
                <div className="item-drop">{getCategoryIcon("TXT")}</div>
                TXT
              </div>
              <div
                onClick={() => handleCategorySelect("Kiss Of Life")}
                className="dropdown-item"
              >
                <div className="item-drop">
                  {getCategoryIcon("Kiss Of Life")}
                </div>
                Kiss Of Life
              </div>
              <div
                onClick={() => handleCategorySelect("아이들")}
                className="dropdown-item"
              >
                <div className="item-drop">{getCategoryIcon("아이들")}</div>
                아이들
              </div>
              <div
                onClick={() => handleCategorySelect("엔믹스")}
                className="dropdown-item"
              >
                <div className="item-drop">{getCategoryIcon("엔믹스")}</div>
                엔믹스
              </div>
              <div
                onClick={() => handleCategorySelect("ITZY")}
                className="dropdown-item"
              >
                <div className="item-drop">{getCategoryIcon("ITZY")}</div>
                ITZY
              </div>
              <div
                onClick={() => handleCategorySelect("블랙핑크")}
                className="dropdown-item"
              >
                <div className="item-drop">{getCategoryIcon("블랙핑크")}</div>
                블랙핑크
              </div>
              <div
                onClick={() => handleCategorySelect("스테이씨")}
                className="dropdown-item"
              >
                <div className="item-drop">{getCategoryIcon("스테이씨")}</div>
                스테이씨
              </div>
              <div
                onClick={() => handleCategorySelect("트와이스")}
                className="dropdown-item"
              >
                <div className="item-drop">{getCategoryIcon("트와이스")}</div>
                트와이스
              </div>
            </div>
          )}
        </div>

        <div className="difficulty-button-container">
          <button onClick={handleDifficultyClick} className="difficulty-button">
            <div>
              {difficulty === "All" ? "난이도" : `난이도 ${difficulty}`}
            </div>{" "}
            <div>{difficultyDropdownVisible ? "▲" : "▼"}</div>
          </button>
          {difficultyDropdownVisible && (
            <div className="difficulty-dropdown">
              <div
                onClick={() => handleDifficultySelect("All")}
                className="dropdown-item"
              >
                <div className="item-drop">{getDifficultyIcon("All")}</div>
                All
              </div>
              <div
                onClick={() => handleDifficultySelect("1")}
                className="dropdown-item"
              >
                <div className="item-drop">{getDifficultyIcon("1")}</div>1
              </div>
              <div
                onClick={() => handleDifficultySelect("2")}
                className="dropdown-item"
              >
                <div className="item-drop">{getDifficultyIcon("2")}</div>2
              </div>
              <div
                onClick={() => handleDifficultySelect("3")}
                className="dropdown-item"
              >
                <div className="item-drop">{getDifficultyIcon("3")}</div>3
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid">
        {filteredBarData.map((bar, index) => (
          <div
            key={index}
            className="bar"
            onMouseEnter={() => handleBarHover(index)}
            onMouseLeave={() => handleBarLeave(index)}
            onClick={() => handleBarClick(index)}
          >
            <video
              className="bar-info"
              ref={(el) => {
                if (el) {
                  videoRefs.current[index] = el;
                  videoRefs.current[index].currentTime = 0;
                  videoRefs.current[index].muted = false; // Start with volume muted
                }
              }}
              autoPlay={hoveredBar === index}
              loop
            >
              <source
                src={`/videos/${bar.reference_video_filename}.mp4`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            {hoveredBar !== index ? (
              <div>
                <div className="bar-title">
                  <img src={require(`../img/main-icon(4).png`)} alt="Profile" />
                  <p className="bar-name">{bar.challenge_name}</p>
                </div>
                <p className="bar-level">LV.{bar.difficulty}</p>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
