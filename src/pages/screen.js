import React, { useState, useRef } from 'react';
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import '../css/screen.css';
import searchImage from '../img/screen/search.svg';

// 가상의 JSON 데이터
const barData = [
  {
    id: 1,
    name: 'John Doe',
    level: "2",
    profileImage: require('../img/main-icon(4).png'),
    video: '/videos/example.mp4',
    category: 'A'
  },
  {
    id: 2,
    name: 'Jane Smith',
    level: "1",
    profileImage: require('../img/main-icon(4).png'),
    video: '/videos/example.mp4',
    category: 'B'
  },
  {
    id: 3,
    name: 'Jane Smith',
    level: "2",
    profileImage: require('../img/main-icon(4).png'),
    video: '/videos/example.mp4',
    category: 'B'
  },
  // 다른 바들의 데이터도 추가할 수 있습니다.
];

function App() {
  const [hoveredBar, setHoveredBar] = useState(null);
  const [difficulty, setDifficulty] = useState('All');
  const [difficultyDropdownVisible, setDifficultyDropdownVisible] = useState(false);
  const [category, setCategory] = useState('All');
  const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);
  const videoRefs = useRef({});

  const handleBarHover = (barId) => {
    setHoveredBar(barId);
    // 비디오 참조가 null이 아닌지 확인
    if (videoRefs.current[barId]) {
      // 비디오 재생
      videoRefs.current[barId].play();
    }
  };

  const handleBarLeave = (barId) => {
    setHoveredBar(null);
    if (videoRefs.current[barId]) {
      // 비디오 일시 정지 및 재생 시간 초기화
      videoRefs.current[barId].pause();
      videoRefs.current[barId].currentTime = 0;
    }
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

  const filteredBarData = barData.filter(bar =>
    (difficulty === 'All' || bar.level === difficulty) &&
    (category === 'All' || bar.category === category)
  );

  return (
    <div className="screen-container">
      <div className="search-bar">
        <input type="text" className="bar-search" placeholder="추고 싶은 챌린지 검색" />
        <img src={searchImage} className="bar-button" alt="Search" />
      </div>

      <div className="dropdown-container">
        <div className="difficulty-button-container">
          <button onClick={handleCategoryClick} className="difficulty-button">
            <div>아이돌</div> <div>{categoryDropdownVisible ? '▲' : '▼'}</div>
          </button>
          {categoryDropdownVisible && (
            <div className="difficulty-dropdown">
              <div onClick={() => handleCategorySelect('All')} className="dropdown-item">
                <div className='item-drop'>{getCategoryIcon('All')}</div>
                All
              </div>
              <div onClick={() => handleCategorySelect('투모로우 바이 투게더')} className="dropdown-item">
                <div className='item-drop'>{getCategoryIcon('투모로우 바이 투게더')}</div>
                투모로우 바이 투게더
              </div>
              <div onClick={() => handleCategorySelect('B')} className="dropdown-item">
                <div className='item-drop'>{getCategoryIcon('B')}</div>
                B
              </div>
              <div onClick={() => handleCategorySelect('C')} className="dropdown-item">
                <div className='item-drop'>{getCategoryIcon('C')}</div>
                C
              </div>
            </div>
          )}
        </div>
        <div className="difficulty-button-container">
          <button onClick={handleDifficultyClick} className="difficulty-button">
            <div>난이도</div> <div>{difficultyDropdownVisible ? '▲' : '▼'}</div>
          </button>
          {difficultyDropdownVisible && (
            <div className="difficulty-dropdown">
              <div onClick={() => handleDifficultySelect('All')} className="dropdown-item">
                <div className='item-drop'>{getDifficultyIcon('All')}</div>
                All
              </div>
              <div onClick={() => handleDifficultySelect('1')} className="dropdown-item">
                <div className='item-drop'>{getDifficultyIcon('1')}</div>
                1
              </div>
              <div onClick={() => handleDifficultySelect('2')} className="dropdown-item">
                <div className='item-drop'>{getDifficultyIcon('2')}</div>
                2
              </div>
              <div onClick={() => handleDifficultySelect('3')} className="dropdown-item">
                <div className='item-drop'>{getDifficultyIcon('3')}</div>
                3
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid">
        {filteredBarData.map(bar => (
          <div
            key={bar.id}
            className="bar"
            onMouseEnter={() => handleBarHover(bar.id)}
            onMouseLeave={() => handleBarLeave(bar.id)}
          >
            <video
              className="bar-info"
              ref={(el) => {
                if (el) {
                  videoRefs.current[bar.id] = el;
                  videoRefs.current[bar.id].currentTime = 0;
                  // 호버 시에만 재생되도록 수정
                  if (hoveredBar !== bar.id) {
                    videoRefs.current[bar.id].pause();
                    videoRefs.current[bar.id].currentTime = 0;
                  }
                }
              }}
              autoPlay={hoveredBar === bar.id}
              loop
              muted
            >
              <source src={bar.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {hoveredBar !== bar.id ?
              <div>
                <div className="bar-title">
                  <img src={bar.profileImage} alt="Profile" />
                  <p className='bar-name'>{bar.name}</p>
                </div>
                <p className='bar-level'>LV.{bar.level}</p>
              </div>
              :
              <div></div>
            }
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
