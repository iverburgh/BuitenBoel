import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GroupsPage from './components/GroupsPage';
import HomePage from './components/HomePage';
import ActivitiesPage from './components/ActivitiesPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GroupsPage />} />
        <Route path="/names" element={<HomePage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
