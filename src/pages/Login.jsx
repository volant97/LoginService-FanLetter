import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginToggle } from "redux/modules/authSlice";
import styled from "styled-components";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signUpClicked, setSignUpClicked] = useState(false);
  const auth = useSelector((state) => state.auth);
  const [inputValue, setInputValue] = useState({
    id: "",
    password: "",
    nickname: "",
  });

  // const fetchAuthInfor = async () => {
  //   const { data } = await axios.get("https://moneyfulpublicpolicy.co.kr/user", {
  //     headers: {
  //       "Content-Type": "application/json",
  //     }
  //   });
  //   console.log(data);
  // };

  const loginBtnClickHandler = () => {
    dispatch(LoginToggle(auth));
    navigate("/home");
  };

  const signUpFormSubmitHandler = async (e) => {
    e.preventDefault();
    if (!inputValue.id || !inputValue.password || !inputValue.nickname) {
      return alert("아이디, 비밀번호, 닉네임을 모두 입력해주세요!");
    }
    if (inputValue.id.length < 4 || inputValue.id.length > 10) {
      return alert("아이디는 4~10글자로 작성해주세요!");
    }
    if (inputValue.password.length < 4 || inputValue.password.length > 15) {
      return alert("비밀번호는 4~15글자로 작성해주세요!");
    }
    if (inputValue.nickname.length < 1 || inputValue.nickname.length > 10) {
      return alert("닉네임은 1~10글자로 작성해주세요!");
    }
    const respone = await axios.post(
      "https://moneyfulpublicpolicy.co.kr/register",
      inputValue
    );
    console.log(respone.data);
    setInputValue({
      id: "",
      password: "",
      nickname: "",
    });
  };

  return (
    <StContainer>
      {!signUpClicked ? (
        // 로그인 화면
        <StLogin>
          <h1>로그인</h1>
          <input type="text" placeholder="아이디 (4~10글자)" />
          <input type="text" placeholder="비밀번호 (4~15글자)" />
          <button onClick={loginBtnClickHandler}>로그인</button>
          <button onClick={() => setSignUpClicked(true)}>회원가입</button>
        </StLogin>
      ) : (
        // 회원가입 화면
        <StSignUp>
          <h1>회원가입</h1>
          <form onSubmit={(e) => signUpFormSubmitHandler(e)}>
            <input
              type="text"
              placeholder="아이디 (4~10글자)"
              value={inputValue.id}
              onChange={(e) =>
                setInputValue({
                  ...inputValue,
                  id: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="비밀번호 (4~15글자)"
              value={inputValue.password}
              onChange={(e) =>
                setInputValue({
                  ...inputValue,
                  password: e.target.value,
                })
              }
            />
            <input
              type="text"
              placeholder="닉네임 (1~10글자)"
              value={inputValue.nickname}
              onChange={(e) =>
                setInputValue({
                  ...inputValue,
                  nickname: e.target.value,
                })
              }
            />
            <button type="submit">회원가입</button>
            <button type="button" onClick={() => setSignUpClicked(false)}>
              로그인
            </button>
          </form>
        </StSignUp>
      )}
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

const StSignUp = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 400px;
  height: 330px;
  padding: 20px;
  border: 2px solid black;
  border-radius: 10px;
  background-color: #ffffff;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;

    * {
      width: 100%;
      height: 40px;
    }
  }

  h1 {
    display: flex;
    align-items: center;
  }
`;
