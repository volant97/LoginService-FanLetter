import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { LoginToggle } from "redux/modules/authSlice";
import { ToastContainer } from "react-toastify";

function Layout() {
  const navigete = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const logoutBtnClickHandler = () => {
    dispatch(LoginToggle(auth));
    navigete("/login");
  };

  return (
    <>
      {auth ? (
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
          </StProfileAndLogin>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </StContainer>
      ) : null}
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
