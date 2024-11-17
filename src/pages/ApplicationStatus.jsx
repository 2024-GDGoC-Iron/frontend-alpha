import Title from '../components/Title';
import style from '../styles/modules/ApplicationStatus.module.css';

function ApplicationStatus() {
    return (
        <div className={style.ApplicationStatus}>
            <Title text={"절차를 따라서 컨택 메일 작성을 완료해보세요"} />
            
        </div>
    );
}

export default ApplicationStatus;