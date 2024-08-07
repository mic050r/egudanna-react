import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import VideoPlayer from "../src/components/record/VideoPlayer"; // RecordPage 컴포넌트 import
import MainPage from "./pages/Main";
import SortsPage from "./pages/Sorts";
import ScreenPage from "./pages/Screen";
import IndexPage from "./pages/Index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/record" element={<VideoPlayer />} />{" "}
        {/* 챌린지 녹화화면 */}
        <Route path="/sorts" element={<SortsPage />} /> {/* 쇼츠화면 */}
        <Route path="/screen" element={<ScreenPage />} />{" "}
        {/* 챌린지 영상 선택 화면 */}
        <Route path="/" element={<IndexPage />} />
      </Routes>
    </Router>
  );
}

export default App;
