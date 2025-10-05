// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import HistoryPage from "./pages/HistoryPage";
import ResultPage from "./pages/ResultPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/upload"
            element={<PrivateRoute><UploadPage /></PrivateRoute>}
          />
          <Route
            path="/history"
            element={<PrivateRoute><HistoryPage /></PrivateRoute>}
          />
          <Route
            path="/result/:id"
            element={<PrivateRoute><ResultPage /></PrivateRoute>}
          />
          <Route
            path="/analytics"
            element={<PrivateRoute><AnalyticsPage /></PrivateRoute>}
          />
          <Route path="*" element={<Navigate to="/upload" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
