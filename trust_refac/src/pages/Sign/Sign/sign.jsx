import React, { useState, useCallback } from "react";
import Signin from "../Signin/Signin";
import Signup from "../SignUp/Signup";
import "./Sign.css"

const Sign = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  // 폼 전환 함수
  const toggleForm = useCallback(() => {
    setIsLoginForm(!isLoginForm);
  }, [isLoginForm]);

  return (
    <div className="sign-container">
      <h1 className="sign-title">TRUST</h1>
      {isLoginForm ? (
        <Signin toggleForm={toggleForm} />
      ) : (
        <Signup toggleForm={toggleForm} />
      )}
    </div>
  );
};

export default Sign;
