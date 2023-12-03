import React, { useRef, useState } from "react";
import styled from "styled-components";
import {
  deleteLocalStorage,
  loadLocalStorage,
  saveLocalStorage,
} from "utils/LocalStorage";
import Avatar from "components/common/Avatar";
import Button from "components/common/Button";
import notify from "utils/toastify";
import axios from "axios";
import defaultUser from "assets/defaultUser.png";
import { LoginToggle } from "redux/modules/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  __updateInfoLetter,
  updateInfoLetter,
} from "redux/modules/lettersSlice";

function Profile() {
  const nickname = loadLocalStorage("nickname");
  const userId = loadLocalStorage("userId");
  const avatar = loadLocalStorage("avatar");
  const accessToken = loadLocalStorage("accessToken");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isLodading, error, letters } = useSelector((state) => {
    return state.letters;
  });

  const [editClicked, setEditClicked] = useState(false);
  const [editNickname, seteditNickname] = useState(nickname);
  const [editAvatar, setEditAvatar] = useState(avatar);
  let selectedAvatar = defaultUser;

  const fileInputRef = useRef(null);

  // 회원정보 확인 로직
  const AuthInfo = async () => {
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
      saveLocalStorage("avatar", respone.data.avatar);
      saveLocalStorage("nickname", respone.data.nickname);
      setEditAvatar(respone.data.avatar);
      seteditNickname(respone.data.nickname);
      // 실행 X...
      // dispatch(updateInfoLetter({ userId, avatar, nickname }));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        notify(`${error.response.data.message}`, "error");
        dispatch(LoginToggle(auth));
        deleteLocalStorage();
      }
    }
  };

  const editBtnClickHandler = (editState) => {
    setEditClicked(editState);
  };

  const editDoneBtnClickHandler = async () => {
    // 수정 파일 전송
    const formData = new FormData();
    formData.append("avatar", selectedAvatar);
    formData.append("nickname", editNickname);
    try {
      const respone = await axios.patch(
        `${process.env.REACT_APP_AUTH_BASE_URL}/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      AuthInfo();
      setEditClicked(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        notify(`${error.response.data.message}`, "error");
      }
    }
  };

  const avatarClickHandler = () => {
    fileInputRef.current.click();
  };

  const avatarChangeHandler = (e) => {
    selectedAvatar = e.target.files[0];
  };

  return (
    <StContainer>
      <StProfile>
        <h1>프로필 관리</h1>
        {!editClicked ? (
          <Avatar src={editAvatar} />
        ) : (
          <>
            <Avatar src={editAvatar} onClick={avatarClickHandler} />
            <input
              ref={fileInputRef}
              type="file"
              onChange={avatarChangeHandler}
            />
          </>
        )}
        {!editClicked ? (
          <h2>{editNickname}</h2>
        ) : (
          <textarea
            value={editNickname}
            onChange={(e) => seteditNickname(e.target.value)}
          />
        )}
        <h3>{userId}</h3>
        {!editClicked ? (
          <Button text="수정하기" onClick={() => editBtnClickHandler(true)} />
        ) : (
          <StEditMode>
            <Button text="취소" onClick={() => editBtnClickHandler(false)} />
            <Button text="수정완료" onClick={editDoneBtnClickHandler} />
          </StEditMode>
        )}
      </StProfile>
    </StContainer>
  );
}

export default Profile;

const StContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StProfile = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  background-color: #d8d8d8;

  h1 {
    font-size: 2rem;
    font-weight: bold;
  }

  h2 {
    font-size: 1.3rem;
    font-weight: bold;
  }

  h3 {
    color: #949494;
  }

  textarea {
    resize: none;
  }

  input {
    display: none;
  }
`;

const StEditMode = styled.div`
  display: flex;
  gap: 20px;

  :nth-child(2) button {
    background-color: #3b9b40;
  }
`;
