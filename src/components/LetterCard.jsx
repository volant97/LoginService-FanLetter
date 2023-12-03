import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import Avatar from "./common/Avatar";
import { getFormattedDate } from "utils/date";
import { deleteLocalStorage, loadLocalStorage } from "utils/LocalStorage";
import axios from "axios";
import notify from "utils/toastify";
import { useDispatch, useSelector } from "react-redux";
import { LoginToggle } from "redux/modules/authSlice";

export default function LetterCard({ letter }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const cardClickHandler = async () => {
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
      navigate(`/detail/${letter.id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        notify(`${error.response.data.message}`, "error");
        dispatch(LoginToggle(auth));
        deleteLocalStorage();
      }
    }
  };

  return (
    <LetterWrapper onClick={cardClickHandler}>
      <UserInfo>
        <Avatar src={letter.avatar} />
        <NicknameAndDate>
          <p>{letter.nickname}</p>
          <time>{getFormattedDate(letter.createdAt)}</time>
        </NicknameAndDate>
      </UserInfo>
      <Content>{letter.content}</Content>
    </LetterWrapper>
  );
}

const LetterWrapper = styled.li`
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: white;
  padding: 12px;
  border: 1px solid white;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.02);
  }
`;

const UserInfo = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const NicknameAndDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Content = styled.p`
  background-color: gray;
  border-radius: 12px;
  padding: 12px;
  margin-left: 62px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
