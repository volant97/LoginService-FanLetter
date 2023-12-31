import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginToggle } from "redux/modules/authSlice";
import styled from "styled-components";
import { saveLocalStorage } from "utils/LocalStorage";
import notify from "utils/toastify";

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

  // 로그인 화면
  const loginValidate = () => {
    if (!inputValue.id || !inputValue.password) {
      alert("아이디, 비밀번호를 모두 입력해주세요!");
      return false;
    }
    if (inputValue.id.length < 4 || inputValue.id.length > 10) {
      alert("아이디는 4~10글자로 작성해주세요!");
      return false;
    }
    if (inputValue.password.length < 4 || inputValue.password.length > 15) {
      alert("비밀번호는 4~15글자로 작성해주세요!");
      return false;
    }
    return true;
  };

  const loginFormSubmitHandler = async (e) => {
    e.preventDefault();
    if (!loginValidate()) return;

    // 로그인 로직
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_AUTH_BASE_URL}/login?expiresIn=60m`,
        inputValue
      );
      const { accessToken, userId, nickname, avatar } = data;
      saveLocalStorage("accessToken", accessToken);
      saveLocalStorage("userId", userId);
      saveLocalStorage("nickname", nickname);
      saveLocalStorage("avatar", avatar);
      dispatch(LoginToggle(auth));
      navigate("/");
      notify("🦄 로그인 성공!", "success");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        notify(`${error.response.data.message}`, "error");
      }
    }
  };

  const goToSignUpPageBtnClickHandler = () => {
    setInputValue({
      id: "",
      password: "",
      nickname: "",
    });
    setSignUpClicked(true);
  };

  // 회원가입 화면
  const signUpValidate = () => {
    if (!inputValue.id || !inputValue.password || !inputValue.nickname) {
      alert("아이디, 비밀번호, 닉네임을 모두 입력해주세요!");
      return false;
    }
    if (inputValue.id.length < 4 || inputValue.id.length > 10) {
      alert("아이디는 4~10글자로 작성해주세요!");
      return false;
    }
    if (inputValue.password.length < 4 || inputValue.password.length > 15) {
      alert("비밀번호는 4~15글자로 작성해주세요!");
      return false;
    }
    if (inputValue.nickname.length < 1 || inputValue.nickname.length > 10) {
      alert("닉네임은 1~10글자로 작성해주세요!");
      return false;
    }
    return true;
  };

  const signUpFormSubmitHandler = async (e) => {
    e.preventDefault();
    if (!signUpValidate()) return;

    // 회원가입 로직
    const { data } = await axios
      .post(`${process.env.REACT_APP_AUTH_BASE_URL}/register`, inputValue)
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          notify(`${error.response.data.message}`, "error");
          return "";
        }
      });
    if (!data) return;

    setInputValue({
      id: "",
      password: "",
      nickname: "",
    });
    setSignUpClicked(false);
  };

  const goToLoginPageBtnClickHandler = () => {
    setInputValue({
      id: "",
      password: "",
      nickname: "",
    });
    setSignUpClicked(false);
  };

  console.log("hi");

  return (
    <StContainer>
      {!signUpClicked ? (
        // 로그인 화면
        <StLogin>
          <h1>로그인</h1>
          <form onSubmit={(e) => loginFormSubmitHandler(e)}>
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
              type="password"
              placeholder="비밀번호 (4~15글자)"
              value={inputValue.password}
              onChange={(e) =>
                setInputValue({
                  ...inputValue,
                  password: e.target.value,
                })
              }
            />
            <button type="submit">로그인</button>
            <StloginSignUpToggleBtn
              type="button"
              onClick={goToSignUpPageBtnClickHandler}
            >
              회원가입
            </StloginSignUpToggleBtn>
          </form>
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
              type="password"
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
            <StloginSignUpToggleBtn
              type="button"
              onClick={goToLoginPageBtnClickHandler}
            >
              로그인
            </StloginSignUpToggleBtn>
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

  button {
    cursor: pointer;
  }
`;

const StSignUp = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 400px;
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

  button {
    cursor: pointer;
  }
`;

const StloginSignUpToggleBtn = styled.button`
  background: transparent;
  border: none;
  color: #919191;
`;
