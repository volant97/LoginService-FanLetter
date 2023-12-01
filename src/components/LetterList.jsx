import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import LetterCard from "./LetterCard";
import { __getLetters } from "redux/modules/lettersSlice";
import { useEffect } from "react";

export default function LetterList() {
  const dispatch = useDispatch();

  const activeMember = useSelector((state) => state.member);
  const { isLodading, error, letters } = useSelector((state) => {
    return state.letters;
  });

  useEffect(() => {
    dispatch(__getLetters());
  }, []);

  // 작동 안하는 듯?
  // if (isLodading) {
  //   return <div>로딩중...</div>;
  // }
  // if (error) {
  //   return <div>{error.message}</div>;
  // }

  const filteredLetters = letters.filter(
    (letter) => letter.writedTo === activeMember
  );
  return (
    <ListWrapper>
      {filteredLetters.length === 0 ? (
        <p>
          {activeMember}에게 남겨진 팬레터가 없습니다. 첫 번째 팬레터의 주인공이
          되보세요!
        </p>
      ) : (
        filteredLetters.map((letter) => (
          <LetterCard key={letter.id} letter={letter} />
        ))
      )}
    </ListWrapper>
  );
}

const ListWrapper = styled.ul`
  background-color: black;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 500px;
  border-radius: 12px;
  padding: 12px;
  color: white;
`;
