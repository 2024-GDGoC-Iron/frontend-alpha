import React from 'react';
import { useNavigate } from 'react-router-dom';
import titleImg from '../assets/titleImg.png';
import style from '../styles/modules/Home.module.css';

function Home() {
    const navigate = useNavigate();
    return (
        <div className={style.Home}>
            <img src={titleImg} alt="logo" onClick={() => navigate('/')} />
            <div className={style.textArea}>
                <div className={style.titleArea}>
                    <h1>서비스 소개글</h1>
                    <p>소비글 텍스트 세부사항</p>
                </div>
                <div className={style.buttonArea}>
                    <button className={style.button1}>이미 원하는 교수가 있을 때</button>
                    <button className={style.button2}>컨택할 교수를 매칭할 때</button>
                </div>
            </div>
        </div>
    );
}

export default Home;