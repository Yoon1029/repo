import React, { useState, useRef } from "react";
import './LoginPage.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {

  const [admin_id, setUsername] = useState("");
  const [admin_password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const usernameInputRef = useRef(null);

  const handleLogin = async () => {
    if (!admin_id || !admin_password) {
      setError("아이디와 비밀번호를 모두 입력하세요.");
      usernameInputRef.current.focus();
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/admin/signin", {
        admin_id,
        admin_password,
        email
      });

      if (response.data.access_token) {
        localStorage.setItem("adminToken", response.data.access_token); 
        alert("로그인되었습니다!");
        navigate("/admin"); 
      }
    } catch (err) {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      usernameInputRef.current.focus();
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Admin 로그인 페이지</h2>
      <input
        ref={usernameInputRef}
        type="text"
        value={admin_id}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="아이디를 입력하세요"
        className="login-input"
      />
      <input
        type="password"
        value={admin_password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력하세요"
        className="login-input"
      />
      <button onClick={handleLogin} className="login-button">
        로그인
      </button>
      <button onClick={() => navigate("/register")} className="register-button">
        회원가입
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginPage;