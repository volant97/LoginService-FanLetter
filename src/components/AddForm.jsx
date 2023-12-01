import { useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import Button from "./common/Button";
import { useDispatch } from "react-redux";
import { __addLetter, __getLetters } from "redux/modules/lettersSlice";
import { loadLocalStorage } from "utils/LocalStorage";

export default function AddForm() {
  // const { setLetters } = useContext(LetterContext);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [member, setMember] = useState("카리나");

  const onAddLetter = async (event) => {
    event.preventDefault();
    if (!content) return alert("닉네임과 내용은 필수값입니다.");

    const newLetter = {
      id: uuid(),
      nickname: loadLocalStorage("nickname"),
      content,
      avatar: null,
      writedTo: member,
      createdAt: new Date(),
      userId: loadLocalStorage("userId"),
    };

    await dispatch(__addLetter(newLetter));
    dispatch(__getLetters());
    setContent("");
  };

  return (
    <Form onSubmit={onAddLetter}>
      <InputWrapper>
        <label>닉네임:</label>
        <p>{loadLocalStorage("nickname")}</p>
      </InputWrapper>
      <InputWrapper>
        <label>내용:</label>
        <textarea
          placeholder="최대 100글자까지 작성할 수 있습니다."
          maxLength={100}
          onChange={(event) => setContent(event.target.value)}
          value={content}
        />
      </InputWrapper>
      <SelectWrapper>
        <label>누구에게 보내실 건가요?</label>
        <select onChange={(event) => setMember(event.target.value)}>
          <option>카리나</option>
          <option>윈터</option>
          <option>닝닝</option>
          <option>지젤</option>
        </select>
      </SelectWrapper>
      <Button text="팬레터 등록" />
    </Form>
  );
}

const Form = styled.form`
  background-color: gray;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 500px;
  border-radius: 12px;
  margin: 20px 0;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  & label {
    width: 80px;
  }
  & input,
  textarea {
    width: 100%;
    padding: 12px;
  }
  & textarea {
    resize: none;
    height: 80px;
  }
  p {
    color: #ffc919;
    font-weight: 700;
  }
`;

const SelectWrapper = styled(InputWrapper)`
  justify-content: flex-start;
  & label {
    width: 170px;
  }
`;
