import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import VideoPlayer from "../src/components/record/VideoPlayer"; // RecordPage 컴포넌트 import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/record" element={<VideoPlayer />} />
      </Routes>
    </Router>
  );
}

export default App;
