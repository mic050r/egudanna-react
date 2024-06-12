import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import VideoPlayer from "../src/components/record/VideoPlayer"; // RecordPage 컴포넌트 import
import MainPage from "./pages/Main";
import SortsPage from "./pages/Sorts";
import ScreenPage from "./pages/ChallengeSelectionScreen";
import IndexnPage from "./pages/index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/record" element={<VideoPlayer />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/sorts" element={<SortsPage />} />
        <Route path="/screen" element={<ScreenPage />} />
        <Route path="/index" element={<IndexnPage />} />
      </Routes>
    </Router>
  );
}

export default App;
