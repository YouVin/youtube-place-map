import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import YouTubeInfo from "./components/YouTubeInfo";
import LoginPage from "./components/LoginPage";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={user ? <YouTubeInfo user={user} /> : <LoginPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
