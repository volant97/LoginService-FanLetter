import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Login() {
  const navigate = useNavigate();

  return (
    <StContainer>
      <StLogin>
        <h1>로그인</h1>
        <input type="text" placeholder="아이디 (4~10글자)" />
        <input type="text" placeholder="비밀번호 (4~15글자)" />
        <button>로그인</button>
        <button onClick={() => navigate("/signup")}>회원가입</button>
      </StLogin>
      <button onClick={() => navigate("/")}>Home</button>
    </StContainer>
  );
}

export default Login;

const StContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  /* 임시버튼 */
  > button {
    position: absolute;
    top: 10%;
  }
`;

const StLogin = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 400px;
  height: 300px;
  padding: 20px;
  border: 2px solid black;
  border-radius: 10px;
  background-color: #ffffff;

  * {
    width: 100%;
    height: 40px;
  }

  h1 {
    display: flex;
    align-items: center;
  }
`;
