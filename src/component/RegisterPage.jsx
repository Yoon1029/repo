import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './RegisterPage.css';

const RegisterPage = () => {
  const [admin_id, setUsername] = useState("");
  const [admin_password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!admin_id || !admin_password) {
      setError("아이디와 비밀번호를 모두 입력하세요.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/admin/signup", {
        admin_id,
        admin_password,
        email
      });
      console.log(response.request.status);

      if (response.request.status == 201) {
        alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
        navigate("/");
      }
    } catch (err) {
      setError("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">회원가입 페이지</h2>
      <input
        type="text"
        value={admin_id}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="아이디를 입력하세요"
        className="register-input"
      />
      <input
        type="password"
        value={admin_password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력하세요"
        className="register-input"
      />
      <button onClick={handleRegister} className="register-button">
        회원가입
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default RegisterPage;
