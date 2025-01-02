import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faMap,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import "./Signup.css";

const Signup = ({ toggleForm }) => {
  return (
    <div className="signup-container">
      <form className="signup-form">
        {/* 지역 입력 */}
        <div className="signup-input-wrapper">
          <label htmlFor="user_map" className="sr-only">
            지역
          </label>
          <FontAwesomeIcon icon={faMap} className="signup-icon" />
          <input
            id="user_map"
            type="map"
            placeholder="지역을 입력하세요"
            className="signup-input"
            required
          />
        </div>

        {/* 이름 입력 */}
        <div className="signup-input-wrapper">
          <label htmlFor="name" className="sr-only">
            이름
          </label>
          <FontAwesomeIcon icon={faUser} className="signup-icon" />
          <input
            id="user_name"
            type="text"
            placeholder="이름을 입력하세요"
            className="signup-input"
            required
          />
        </div>

        {/* 아이디 입력 */}
        <div className="signup-input-wrapper">
          <label htmlFor="user_mail" className="sr-only">
            아이디
          </label>
          <FontAwesomeIcon icon={faUser} className="signup-icon" />
          <input
            id="user_mail"
            type="text"
            placeholder="아이디를 입력하세요"
            className="signup-input"
            required
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className="signup-input-wrapper">
          <label htmlFor="user_pw" className="sr-only">
            비밀번호
          </label>
          <FontAwesomeIcon icon={faLock} className="signup-icon" />
          <input
            id="user_pw"
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="signup-input"
            required
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className="signup-input-wrapper">
          <label htmlFor="user_pwcf" className="sr-only">
            비밀번호 확인
          </label>
          <FontAwesomeIcon icon={faLock} className="signup-icon" />
          <input
            id="user_pwcf"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            className="signup-input"
            required
          />
        </div>

        {/* 핸드폰 번호 입력 */}
        <div className="signup-input-wrapper">
          <label htmlFor="user_phone" className="sr-only">
            핸드폰 번호
          </label>
          <FontAwesomeIcon icon={faPhone} className="signup-icon" />
          <input
            id="user_phone"
            type="tel"
            placeholder="핸드폰 번호를 입력하세요"
            className="signup-input"
            required
          />
        </div>

        {/* 회원가입 버튼 */}
        <button type="submit" className="signup-button" onClick={toggleForm}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Signup;
