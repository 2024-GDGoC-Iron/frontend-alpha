import Title from '../components/Title';
import style from '../styles/modules/ApplicationStatus.module.css';

function ApplicationStatus() {
    return (
        <div className={style.ApplicationStatus}>
            <Title text={"집보내주세요....."} />
        </div>
    );
}

export default ApplicationStatus;