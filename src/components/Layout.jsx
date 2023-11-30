import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { LoginToggle } from "redux/modules/authSlice";
import { deleteLocalStorage } from "../utils/LocalStorage";
import notify from "utils/toastify";

function Layout() {
  const navigete = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const logoutBtnClickHandler = () => {
    dispatch(LoginToggle(auth));
    deleteLocalStorage();
    notify("로그아웃 되었습니다.", "warning");
    navigete("/login");
  };

  return (
    <>
      <StContainer>
        <button onClick={() => navigete("/")}>Home</button>
        <StProfileAndLogin>
          <button onClick={() => navigete("/profile")}>내프로필</button>
          <button onClick={logoutBtnClickHandler}>로그아웃</button>
        </StProfileAndLogin>
      </StContainer>
      <Outlet />
    </>
  );
}

export default Layout;

const StContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #8d8d8d;
`;

const StProfileAndLogin = styled.div`
  display: flex;
`;
