// 로컬스토리지 함수

// 저장
export const saveLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// 삭제
export const deleteLocalStorage = () => {
  localStorage.clear();
};
