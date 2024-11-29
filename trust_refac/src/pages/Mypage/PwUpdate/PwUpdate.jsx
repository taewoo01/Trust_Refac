import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import "./PwUpdate.css";

const PwUpdate = () => {
  return (
    <div className="pw-update-container">
      <form className="pw-update-form">
        <h2 className="pw-update-title">비밀번호 변경</h2>

        {/* 현재 비밀번호 입력 */}
        <div className="pw-update-input-wrapper">
          <label htmlFor="current_pw" className="sr-only">
            현재 비밀번호
          </label>
          <FontAwesomeIcon icon={faLock} className="pw-update-icon" />
          <input
            id="current_pw"
            type="password"
            placeholder="현재 비밀번호를 입력하세요"
            className="pw-update-input"
            required
          />
        </div>

        {/* 새 비밀번호 입력 */}
        <div className="pw-update-input-wrapper">
          <label htmlFor="new_pw" className="sr-only">
            새 비밀번호
          </label>
          <FontAwesomeIcon icon={faLock} className="pw-update-icon" />
          <input
            id="new_pw"
            type="password"
            placeholder="새 비밀번호를 입력하세요"
            className="pw-update-input"
            required
          />
        </div>

        {/* 새 비밀번호 확인 */}
        <div className="pw-update-input-wrapper">
          <label htmlFor="confirm_pw" className="sr-only">
            새 비밀번호 확인
          </label>
          <FontAwesomeIcon icon={faLock} className="pw-update-icon" />
          <input
            id="confirm_pw"
            type="password"
            placeholder="새 비밀번호를 다시 입력하세요"
            className="pw-update-input"
            required
          />
        </div>

        {/* 변경 버튼 */}
        <button type="submit" className="pw-update-button">
          비밀번호 변경
        </button>
      </form>
    </div>
  );
};

export default PwUpdate;
