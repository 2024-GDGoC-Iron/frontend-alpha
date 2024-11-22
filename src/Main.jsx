import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import TalkInPick from './pages/TalkInPick';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';

import './styles/Main.css';

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLoginClick = () => {
    setIsLoggedIn(true);
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <div className="Main">
        <>
          <Header
            isLoggedIn={isLoggedIn}
            onLoginClick={handleLoginClick}
            onLogoutClick={handleLogoutClick} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/TalkInPick" element={<TalkInPick />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/SignIn" element={<SignIn />} />
          </Routes>
          <Footer />
        </>
      </div>
    </BrowserRouter>
  );
}

export default Main;