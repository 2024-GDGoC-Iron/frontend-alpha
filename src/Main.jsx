import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import ContactProp from './pages/ContactProp';
import SearchProp from './pages/SearchProp';
import ApplicationStatus from './pages/ApplicationStatus';
import Result from './pages/Result';
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
            <Route path="/ContactProp" element={<ContactProp />} />
            <Route path="/searchProp" element={<SearchProp />} />
            <Route path="/ApplicationStatus" element={<ApplicationStatus />} />
            <Route path="/Result" element={<Result />} />
            <Route path="/SignIn" element={<SignIn />} />
          </Routes>
          <ConditionalFooter />
        </>
      </div>
    </BrowserRouter>
  );
}

function ConditionalFooter() {
  const location = useLocation(); // Now `useLocation` is used inside the context of a Router
  return location.pathname === '/' ? <Footer /> : null;
}

export default Main;