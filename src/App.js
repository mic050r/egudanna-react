import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

<<<<<<< HEAD
import VideoPlayer from "../src/components/record/VideoPlayer"; // RecordPage 컴포넌트 import
=======
import RecordPage from "./pages/Record"; // RecordPage 컴포넌트 import
import MainPage from "./pages/Main"
import SortsPage from "./pages/Sorts"
import ScreenPage from "./pages/ChallengeSelectionScreen"
>>>>>>> upstream/main

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/record" element={<VideoPlayer />} />
=======
        <Route path="/record" element={<RecordPage />} />
        <Route path="/main" element={<MainPage/>}/>
        <Route path="/sorts" element={<SortsPage/>}/>
        <Route path="/screen" element={<ScreenPage/>}/>
>>>>>>> upstream/main
      </Routes>
    </Router>
  );
}

export default App;
