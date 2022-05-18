import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import Profile from './components/profile';
import ProfileLinks from './components/profile/links';
import './App.css';

function App() {

  return (
    <Routes>
      <Route path="/:name" element={<Profile />} />
      <Route path="/:name/links" element={<ProfileLinks />} />
    </Routes>
  );
}

export default App;
