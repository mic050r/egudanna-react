import React from 'react';
import { FiSearch } from 'react-icons/fi';

// 검색 바 컴포넌트
const SearchBar = () => (
    <div className="search-bar-sorts">
        <input type="text" placeholder="찾고 있는 영상을 검색하세요!" className="search-input" />
        <button className="search-button"><FiSearch /></button>
    </div>
);

export default SearchBar;
