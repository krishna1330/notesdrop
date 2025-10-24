import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import SubjectsGrid from './components/SubjectsGrid';
import SubjectDetails from './components/SubjectDetails';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<SubjectsGrid />} />
        <Route path="/subject/:id" element={<SubjectDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
