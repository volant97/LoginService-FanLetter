import { useNavigate } from "react-router-dom";
import Tabs from "./Tabs";
import styled from "styled-components";
import { useSelector } from "react-redux";

export default function Header() {
  const navigete = useNavigate();
  const auth = useSelector((state) => state.auth);

  return (
    <Container>
      <button onClick={() => navigete("/login")}>로그인</button>
      <p>{auth ? "로그인 O" : "로그인 X"}</p>
      <Title>에스파 팬레터함</Title>
      <Tabs />
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  height: 300px;
  background-color: lightgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: yellow;
  flex: 1;
  display: flex;
  align-items: center;
`;
