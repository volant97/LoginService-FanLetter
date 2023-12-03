import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { LoginToggle } from "redux/modules/authSlice";
import { deleteLocalStorage, loadLocalStorage } from "../utils/LocalStorage";
import notify from "utils/toastify";
import axios from "axios";

function Layout() {
  const navigete = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // 회원정보 확인 로직 - 토큰 만료시 자동으로 로그아웃
  const authInfo = async () => {
    try {
      const accessToken = loadLocalStorage("accessToken");
      const respone = await axios.get(
        `${process.env.REACT_APP_AUTH_BASE_URL}/user`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        notify(`${error.response.data.message}`, "error");
        navigete("/login");
        dispatch(LoginToggle(auth));
        deleteLocalStorage();
      }
    }
  };

  authInfo();

  const logoutBtnClickHandler = () => {
    dispatch(LoginToggle(auth));
    deleteLocalStorage();
    notify("로그아웃 되었습니다.", "warning");
    navigete("/login");
  };

  const profileBtnClickHandler = async () => {
    // 회원정보 확인 로직
    try {
      const accessToken = loadLocalStorage("accessToken");
      const respone = await axios.get(
        `${process.env.REACT_APP_AUTH_BASE_URL}/user`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      navigete("/profile");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        notify(`${error.response.data.message}`, "error");
        dispatch(LoginToggle(auth));
        deleteLocalStorage();
      }
    }
  };

  return (
    <>
      <StContainer>
        <button onClick={() => navigete("/")}>Home</button>
        <StProfileAndLogin>
          <button onClick={profileBtnClickHandler}>내프로필</button>
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
