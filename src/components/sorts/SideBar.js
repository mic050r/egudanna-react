import React from 'react';
import userIcon from '../../img/sorts/user.svg';
import musicIcon from '../../img/sorts/music.svg';

const SideBar = ({ videoData }) => (
    <div className="left-sidebar">
        <div className="sidebar-item">
            <img src={userIcon} className='item-icon' /> {videoData.nickname}
        </div>
        <div className="sidebar-item">{videoData.title}</div>
        <div className="sidebar-item">
            <img src={musicIcon} className='item-icon' />
            <ul className="song-list">
                {
                    videoData.hashtags.split(/(?=#)/).map((tag, index) => (
                        <li key={index}>{tag}</li>
                    ))}


            </ul>
        </div>
    </div>
);

export default SideBar;
