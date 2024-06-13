import React from 'react';
import userIcon from '../../img/sorts/user.svg';
import musicIcon from '../../img/sorts/music.svg';

// 사이드바 컴포넌트
const SideBar = ({ videoData }) => (
    <div className="left-sidebar">
        <div className="sidebar-item">
            <img src={userIcon} className='item-icon' /> {videoData.name}
        </div>
        <div className="sidebar-item">{videoData.title}</div>
        <div className="sidebar-item">
            <img src={musicIcon} className='item-icon' />
            <ul className="song-list">
                {videoData.songs.map((song, index) => (
                    <li key={index}>{song}</li>
                ))}
            </ul>
        </div>
    </div>
);

export default SideBar;
