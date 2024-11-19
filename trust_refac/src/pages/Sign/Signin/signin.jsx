import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import "../../../assets/styles/Signin.css"

const Signin = ({ toggleForm }) => {
  return (
    <div className="signin-container">
      <form className="signin-form">
        <div className="signin-input-wrapper">
          <label htmlFor="user_id" className="sr-only">
            아이디
          </label>
          <FontAwesomeIcon
            icon={faUser}
            className="signin-icon"
          />
          <input
            id="user_id"
            type="text"
            placeholder="아이디를 입력하세요"
            className="signin-input"
            required
          />
        </div>
        <div className="signin-input-wrapper">
          <label htmlFor="user_pw" className="sr-only">
            비밀번호
          </label>
          <FontAwesomeIcon
            icon={faLock}
            className="signin-icon"
          />
          <input
            id="user_pw"
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="signin-input"
            required
          />
        </div>
        <div className="signin-remember-wrapper">
          <input
            id="remember_me"
            type="checkbox"
            className="signin-checkbox"
          />
          <label htmlFor="remember_me" className="signin-label">
            아이디 저장
          </label>
        </div>
        <button
          type="submit"
          className="signin-button"
        >
          로그인
        </button>
      </form>
      <div className="signin-footer">
        <div
          className="signin-signup-link"
          onClick={toggleForm}
        >
          회원 가입
        </div>
      </div>
    </div>
  );
};

export default Signin;
