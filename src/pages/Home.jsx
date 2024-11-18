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
                    <h1>요즘 대학원 시작은</h1>
                    <h2>IN!PICK</h2>
                    <p>매칭도, 컨택도 인픽과 함께</p>
                </div>
                <div className={style.buttonArea}>
                    <button className={style.button1} onClick={() => navigate('/TalkInPick')}>랩실 매칭이 필요해요</button>
                    <button className={style.button2} onClick={() => navigate('/SearchProp')}>컨택할 랩을 결정했어요</button>
                </div>
            </div>
        </div>
    );
}

export default Home;