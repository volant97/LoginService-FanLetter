// 로컬스토리지 함수

// 저장
export const saveLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// 불러오기
export const loadLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

// 삭제
export const deleteLocalStorage = () => {
  localStorage.clear();
};
