import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Home from '../pages/Home';
import TalkInPick from '../pages/TalkToInPick';
import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/SignIn';

function AppRoutes() {
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

export default AppRoutes;