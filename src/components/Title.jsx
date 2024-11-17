import style from '../styles/modules/Title.module.css';

function Title({ text }) {
    return (
        <div className={style.Title}>
            <h1>{ text }</h1>
        </div>
    );
}

export default Title;
