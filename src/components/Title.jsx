import style from '../styles/modules/Title.module.css';

function Title({ text1, text2 }) {
    return (
        <div className={style.Title}>
            <h1><span>{text1}</span>{ text2 }</h1>
        </div>
    );
}

export default Title;
