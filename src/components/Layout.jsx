import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { LoginToggle } from "redux/modules/authSlice";

function Layout() {
  const navigete = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const logoutBtnClickHandler = () => {
    dispatch(LoginToggle(auth));
    navigete("/login");
  };

  return (
    <StContainer>
      <button onClick={() => navigete("/")}>Home</button>
      <StProfileAndLogin>
        <button onClick={() => navigete("/profile")}>내프로필</button>
        {auth ? (
          // 로그인 O
          <button onClick={logoutBtnClickHandler}>로그아웃</button>
        ) : (
          // 로그인 X
          <button onClick={() => navigete("/login")}>로그인</button>
        )}
        <p>{auth ? "로그인 O" : "로그인 X"}</p>
      </StProfileAndLogin>
    </StContainer>
  );
}

export default Layout;

const StContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: lightgray;
`;

const StProfileAndLogin = styled.div`
  display: flex;
`;
