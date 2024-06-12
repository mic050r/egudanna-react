import React from 'react';
import '../css/index.css';


function App() {
  return (
    <div className="full-screen-image">
      <div className="content-top-image"></div>
      <div className="content-bottom-image"></div>
      <button className="bottom-right-button" onClick={() => window.location.href= '/sorts'}></button>
    </div>
  );
}


export default App;
