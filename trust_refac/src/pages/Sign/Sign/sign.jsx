import React, { useState, useCallback, useEffect } from "react";
import { fetchUsers } from "../../../firebase/db";
import Signin from "../Signin/Signin";
import Signup from "../SignUp/Signup";
import "./Sign.css";

const Sign = ({ onClose, onLoginSuccess }) => {
  // ✅ onLoginSuccess 추가
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [usersList, setUsersList] = useState([]); // 사용자 정보 상태 추가

  // 폼 전환 함수
  const toggleForm = useCallback(() => {
    setIsLoginForm(!isLoginForm);
  }, [isLoginForm]);

  // Firebase에서 사용자 정보 불러오기
  useEffect(() => {
    const loadUsers = async () => {
      const users = await fetchUsers(); // 사용자 데이터 가져오기
      setUsersList(users); // 가져온 데이터를 상태로 저장
    };
    loadUsers();
  }, []);

  return (
    <div className="sign-container">
      <h1 className="sign-title">TRUST</h1>
      {isLoginForm ? (
        <Signin
          toggleForm={toggleForm}
          users={usersList}
          onClose={onClose}
          onLoginSuccess={onLoginSuccess} // ✅ 추가
        />
      ) : (
        <Signup toggleForm={toggleForm} />
      )}
    </div>
  );
};

export default Sign;
