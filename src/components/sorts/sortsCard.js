import React from 'react';

const SongCard = ({ icon, name, description, audioUrl }) => {
  return (
    <div className="song-card">
      <img src={icon} alt="Icon" className="icon" />
      <div className="song-details">
        <h2 className="song-name">{name}</h2>
        <p className="song-description">{description}</p>
        <audio controls>
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default SongCard;
