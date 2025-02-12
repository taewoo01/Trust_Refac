import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import "./Signin.css";

const Signin = ({ toggleForm, users, onClose, onLoginSuccess }) => {
  // ✅ setIsLoggedIn 추가
  const [userId, setUserId] = useState(""); // 이메일
  const [userPw, setUserPw] = useState(""); // 비밀번호
  const [error, setError] = useState(""); // 로그인 오류 메시지 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const handleSubmit = (e) => {
    e.preventDefault();

    // 사용자 인증 로직
    const user = users.find(
      (user) => user.user_mail === userId && user.user_pw === userPw
    );

    if (user) {
      console.log("로그인 성공:", user);
      setError(""); // 로그인 성공 시 오류 메시지 초기화

      onLoginSuccess(true); // ✅ 로그인 상태 true로 변경
      onClose(); // ✅ 모달 닫기
      navigate("/"); // ✅ 메인 페이지로 이동
    } else {
      setError("아이디 또는 비밀번호가 잘못되었습니다."); // 로그인 실패 시 오류 메시지
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSubmit}>
        <div className="signin-input-wrapper">
          <label htmlFor="user_id" className="sr-only">
            아이디 (이메일)
          </label>
          <FontAwesomeIcon icon={faUser} className="signin-icon" />
          <input
            id="user_id"
            type="text"
            placeholder="이메일을 입력하세요"
            className="signin-input"
            required
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="signin-input-wrapper">
          <label htmlFor="user_pw" className="sr-only">
            비밀번호
          </label>
          <FontAwesomeIcon icon={faLock} className="signin-icon" />
          <input
            id="user_pw"
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="signin-input"
            required
            value={userPw}
            onChange={(e) => setUserPw(e.target.value)}
          />
        </div>
        {error && <div className="signin-error">{error}</div>}
        <div className="signin-remember-wrapper">
          <input id="remember_me" type="checkbox" className="signin-checkbox" />
          <label htmlFor="remember_me" className="signin-label">
            아이디 저장
          </label>
        </div>
        <button type="submit" className="signin-button">
          로그인
        </button>
      </form>
      <div className="signin-footer">
        <div className="signin-signup-link" onClick={toggleForm}>
          회원 가입
        </div>
      </div>
    </div>
  );
};

export default Signin;
