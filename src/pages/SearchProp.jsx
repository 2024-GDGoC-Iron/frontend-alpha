import Title from '../components/Title';
import style from '../styles/modules/SearchProp.module.css';

function SearchProp({ result = 4, info }) {
    return (
        <div className={style.SearchProp}>
            <Title text={"교수 검색 결과"} />
            <div className={style.listBoxArea}>
                {/* Loop through to simulate similar box structure */}
                {Array.from({ length: result }).map((_, index) => (
                    <div key={index} className={style.box}>
                        <div className={style.container}>
                            <img alt="대표 이미지" className={style.imagePlaceholder} />
                            <div className={style.titleArea}>
                                <h2>블록체인</h2>
                                <h1>금융 시스템 연구실</h1>
                                <p>비트코인의 흐름을 분석하고 연구비로 비트코인 투자를 진행하여 수익을 횡령하여 나눠 갖습니다.</p>
                            </div>
                            <div className={style.profileArea}>
                                <img alt="프로필 이미지" className={style.profileImage} />
                                <div>
                                    <h3>김교수</h3>
                                    <p>컴퓨터공학과 조교수</p>
                                </div>
                            </div>
                            <button className={style.applyButton}>지원하기</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchProp;
