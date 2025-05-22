import { useState } from "react";
import { Navigate, Route, Routes } from 'react-router-dom';
import AboutPage from './About';
import AdminPage from "./AdminPage";
import './App.css';
import Dashboard from "./Dashboard";
import HomePage from './HomePage';
import LoginPage from "./LoginPage";




function App() {
  const [user, setUser] = useState(null); // Tracks the logged-in user

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage setUser={setUser} />} />
      <Route path="/dashboard"
        element={
          user ? <Dashboard user={user} /> : <Navigate to="/login" />
        } />
      <Route path="/admin"
        element={
          user?.role === "admin" ? <AdminPage user={user} /> : <Navigate to="/dashboard" />
        } />
    </Routes>
  );
}

export default App;