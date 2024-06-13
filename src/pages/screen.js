import React, { useState, useRef, useEffect } from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
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
  const [searchTerm, setSearchTerm] = useState("");
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

  useEffect(() => {
    Object.keys(videoRefs.current).forEach((key) => {
      if (hoveredBar !== null && key === hoveredBar.toString()) {
        videoRefs.current[key].play().catch((error) => {
          console.error("Error playing video:", error);
        });
      } else {
        videoRefs.current[key].pause();
        videoRefs.current[key].currentTime = 0;
      }
    });
  }, [hoveredBar]);

  const handleBarHover = (barId) => {
    setHoveredBar(barId);
  };

  const handleBarLeave = () => {
    setHoveredBar(null);
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
    return category === categoryItem ? <FaCheckCircle /> : <FaRegCircle />;
  };

  const getDifficultyIcon = (level) => {
    return difficulty === level ? <FaCheckCircle /> : <FaRegCircle />;
  };

  const filterData = (
    data,
    selectedCategory,
    selectedDifficulty,
    searchTerm
  ) => {
    let filteredData = data;

    if (selectedCategory !== "All") {
      filteredData = filteredData.filter(
        (bar) => bar.tags === selectedCategory
      );
    }

    if (selectedDifficulty !== "All") {
      filteredData = filteredData.filter(
        (bar) => bar.difficulty.toString() === selectedDifficulty
      );
    }

    if (searchTerm) {
      filteredData = filteredData.filter((bar) =>
        bar.challenge_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredData;
  };

  const filteredData = filterData(barData, category, difficulty, searchTerm);

  return (
    <div className="screen-container">
      <div className="search-bar">
        <input
          type="text"
          className="bar-search"
          placeholder="추고 싶은 챌린지 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // 검색어 상태 업데이트
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
        {filteredData.map((bar) => (
          <div
            key={bar.reference_video_filename} // 고유한 key를 사용하여 컴포넌트가 올바르게 렌더링되도록
            className="bar"
            onMouseEnter={() => handleBarHover(bar.reference_video_filename)}
            onMouseLeave={handleBarLeave}
          >
            <Link
              to="/record"
              state={{
                challenge_name: bar.challenge_name,
                reference_video_filename: bar.reference_video_filename,
                difficulty: bar.difficulty,
                tags: bar.tags,
              }}
              className="bar-info"
              onClick={() =>
                console.log("Clicked bar info. Data:", {
                  challenge_name: bar.challenge_name,
                  reference_video_filename: bar.reference_video_filename,
                  difficulty: bar.difficulty,
                  tags: bar.tags,
                })
              }
            >
              <video
                className="bar-info"
                ref={(el) => {
                  if (el) {
                    videoRefs.current[bar.reference_video_filename] = el;
                    videoRefs.current[
                      bar.reference_video_filename
                    ].currentTime = 0;
                    videoRefs.current[
                      bar.reference_video_filename
                    ].muted = false;
                  }
                }}
                autoPlay={hoveredBar === bar.reference_video_filename}
                loop
                muted
              >
                <source
                  src={`/videos/${bar.reference_video_filename}.mp4`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
              <div>
                <div className="bar-title">
                  <img src={require(`../img/main-icon(4).png`)} alt="Profile" />
                  <p className="bar-name">{bar.challenge_name}</p>
                </div>
                <p className="bar-level">LV.{bar.difficulty}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
