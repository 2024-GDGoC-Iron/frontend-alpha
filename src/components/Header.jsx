import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import style from '../styles/modules/Header.module.css';

function Header({ isLoggedIn = false, onLoginClick, onLogoutClick }) {
    const navigate = useNavigate();

    const handleAuthClick = () => {
        if (isLoggedIn) {
            onLogoutClick(); 
            navigate('/'); 
        } else {
            onLoginClick();
            navigate('/login');
        }
    };
    return (
        <div className={style.Header}>
            <div className={style.TitleArea}>
                <img src={logo} alt="logo" onClick={() => navigate('/')} />
                <h1>IT!PICK</h1>
                <ul className={style.MenuArea}>
                    <li onClick={() => navigate('/')} >Home</li>
                    <li onClick={() => navigate('/ContactProp')} >교수 컨택</li>
                    <li onClick={() => navigate('/SearchProp')} >교수 찾기</li>
                    <li onClick={() => navigate('/ApplicationStatus')} >지원현황</li>
                    <li onClick={() => navigate('/SignIn')} >
                        <div className={style.login} onClick={handleAuthClick}>
                            {isLoggedIn ? "로그인 및 회원가입" : "로그아웃"}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Header;
