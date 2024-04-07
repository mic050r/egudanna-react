import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import RecordPage from "./pages/Record"; // RecordPage 컴포넌트 import
import Example from "./components/record/Example"; // RecordPage 컴포넌트 import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/record" element={<RecordPage />} />
        <Route path="/ex" element={<Example />} />
        {/* 다른 경로들에 대한 라우팅 설정 */}
      </Routes>
    </Router>
  );
}

export default App;
