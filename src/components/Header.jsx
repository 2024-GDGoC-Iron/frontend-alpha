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
            navigate('/');
        }
    };
    return (
        <div className={style.Header}>
            <div className={style.TitleArea}>
                <img src={logo} alt="logo" onClick={() => navigate('/')} />
                <h1 onClick={() => navigate('/')}>IN!PICK</h1>
                <ul className={style.MenuArea}>
                    <li onClick={() => navigate('/')} >홈</li>
                    <li onClick={() => navigate('/TalkInPick')} >채팅하기</li>
                    <li onClick={() => navigate('/SearchProp')} >대시보드</li>
                    <li onClick={() => navigate('/SignIn')} >
                        <div className={style.login} onClick={handleAuthClick}>
                            {isLoggedIn ? "로그인 및 회원가입" : "프로필"}
                        </div>
                    </li>
                </ul>
            </div>  
        </div>
    );
}

export default Header;
