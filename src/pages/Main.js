// src/components/main/Main.js
import React from 'react';
import '../css/main.css';

import PropTypes from 'prop-types';

import icon1 from '../img/main-icon(1).png';
import icon2 from '../img/main-icon(2).png';
import icon3 from '../img/main-icon(3).png';
import icon4 from '../img/main-icon(4).png';

// 메인 컴포넌트
const Main = () => {
  return (
    <div className="good123456789">
      <div className="container">
        <div className="title">
          <h1>이 구역의 댄싱 퀸은 나야 나</h1>
          <h2>댄스 챌린지를 보다 쉽게 연출하세요</h2>
        </div>
        <button className="challenge-button">챌린지 시작하기</button>
        <div className="rectangle">
          {/* 각 아이콘 컴포넌트 생성 */}
          <Icon icon={icon1} text="챌린지를<br>익히세요" color="85B6FF" />
          <Icon icon={icon2} text="동영상을<br>촬영하세요" color="FFD233" />
          <Icon icon={icon3} text="챌린지영상을<br>모두에게 공유하세요" color="4ECB71" />
          <Icon icon={icon4} text="좋아요 top3에겐<br>선물을 드립니다" color="F24E1E" />
        </div>
      </div>
      <div className='background'>
        <div className='img'></div>
        <div className='box'></div>
      </div>
    </div>
  );
};

// 아이콘 컴포넌트
const Icon = ({ icon, text, color }) => {
  return (
    <div className="icon">
      <div className="rhombus" style={{ backgroundColor: `#${color}` }}>
        {/* 이미지를 45도 회전 */}
        <img src={icon} style={{ transform: 'rotateZ(-45deg)' }} alt="icon"></img>
      </div>
      {/* 텍스트를 HTML로 렌더링 */}
      <div className="diamond-text" dangerouslySetInnerHTML={{ __html: text }}></div>
    </div>
  );
};

// 프로퍼티 타입 정의
Icon.propTypes = {
  text: PropTypes.string.isRequired, // 필수 문자열
  icon: PropTypes.string.isRequired, // 필수 문자열 (이미지 경로)
  color: PropTypes.string.isRequired // 필수 문자열 (색상 코드)
};

export default Main;
