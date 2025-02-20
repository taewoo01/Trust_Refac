import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faMap,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import "./Signup.css";
import { addUser } from "../../../firebase/db"; // Firebase의 addUser 함수 가져오기

const Signup = ({ toggleForm }) => {
  // 입력값 상태 관리
  const [formData, setFormData] = useState({
    user_map: "",
    user_name: "",
    user_mail: "",
    user_pw: "",
    user_pwcf: "",
    user_phone: "",
  });

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 회원가입 버튼 클릭 시 실행되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 일치 확인
    if (formData.user_pw !== formData.user_pwcf) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // Firebase에 사용자 정보 추가
      await addUser({
        user_map: formData.user_map, // 지역 정보
        user_name: formData.user_name, // 이름
        user_mail: formData.user_mail, // 이메일
        user_pw: formData.user_pw, // 비밀번호
        user_phone: formData.user_phone, // 핸드폰 번호
        createdAt: new Date(), // 생성 날짜
      });

      alert("회원가입이 완료되었습니다!");
      toggleForm(); // 로그인 화면으로 전환
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        {/* 지역 입력 */}
        <div className="signup-input-wrapper">
          <FontAwesomeIcon icon={faMap} className="signup-icon" />
          <input
            name="user_map"
            type="text"
            placeholder="지역을 입력하세요"
            className="signup-input"
            required
            value={formData.user_map}
            onChange={handleChange}
          />
        </div>

        {/* 이름 입력 */}
        <div className="signup-input-wrapper">
          <FontAwesomeIcon icon={faUser} className="signup-icon" />
          <input
            name="user_name"
            type="text"
            placeholder="이름을 입력하세요"
            className="signup-input"
            required
            value={formData.user_name}
            onChange={handleChange}
          />
        </div>

        {/* 아이디(이메일) 입력 */}
        <div className="signup-input-wrapper">
          <FontAwesomeIcon icon={faUser} className="signup-icon" />
          <input
            name="user_mail"
            type="email"
            placeholder="이메일을 입력하세요"
            className="signup-input"
            required
            value={formData.user_mail}
            onChange={handleChange}
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className="signup-input-wrapper">
          <FontAwesomeIcon icon={faLock} className="signup-icon" />
          <input
            name="user_pw"
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="signup-input"
            required
            value={formData.user_pw}
            onChange={handleChange}
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className="signup-input-wrapper">
          <FontAwesomeIcon icon={faLock} className="signup-icon" />
          <input
            name="user_pwcf"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            className="signup-input"
            required
            value={formData.user_pwcf}
            onChange={handleChange}
          />
        </div>

        {/* 핸드폰 번호 입력 */}
        <div className="signup-input-wrapper">
          <FontAwesomeIcon icon={faPhone} className="signup-icon" />
          <input
            name="user_phone"
            type="tel"
            placeholder="핸드폰 번호를 입력하세요"
            className="signup-input"
            required
            value={formData.user_phone}
            onChange={handleChange}
          />
        </div>

        {/* 회원가입 버튼 */}
        <button type="submit" className="signup-button">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Signup;
