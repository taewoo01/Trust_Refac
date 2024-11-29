import "./InfoUpdate.css";
import userimg from "../../../assets/images/userimg.webp";
import KakaoLocation from "../../../components/Common/Kakaolocation/KakaoLocation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faPhone,
  } from "@fortawesome/free-solid-svg-icons";

const InfoUpdate = () => {
    return (
        <>
            <div className="infoupdateTitle">
                개인 정보 수정
            </div>
            <div className="infoupdatePage">
                <div className="infoupdate">
                    <form className="info-form">
                        {/* 프로필 */}
                        <div className="user-images">
                            <img src={userimg} />
                        </div>
                        {/* 이름 입력 */}
                        <div className="info-input-wrapper">
                        <label htmlFor="name" className="sr-only">
                            이름
                        </label>
                        <FontAwesomeIcon icon={faUser} className="info-icon" />
                        <input
                            id="name"
                            type="text"
                            placeholder="이름을 입력하세요"
                            className="info-input"
                            required
                        />
                        </div>
                        {/* 핸드폰 번호 입력 */}
                        <div className="info-input-wrapper">
                        <label htmlFor="user_phone" className="sr-only">
                            핸드폰 번호
                        </label>
                        <FontAwesomeIcon icon={faPhone} className="info-icon" />
                        <input
                            id="user_phone"
                            type="tel"
                            placeholder="핸드폰 번호를 입력하세요"
                            className="info-input"
                            required
                        />
                        </div>

                        {/* 회원가입 버튼 */}
                        <button
                        type="submit"
                        className="info-button"
                        >
                        수정
                        </button>
                    </form>
                </div>
                <div className="Line"></div>
                <div className="kakaoMap">
                    <KakaoLocation />
                </div>
            </div>
        </>
    )
}

export default InfoUpdate;