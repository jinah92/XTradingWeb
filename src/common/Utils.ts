/* 모달 오픈 시 스크롤 영역으로 화면 이동 제어 */
export const getScrollbarWidth = () => {
  return window.innerWidth - document.documentElement.clientWidth;
};

export const openModal = () => {
  const scrollbarWidth = getScrollbarWidth();
  document.body.style.paddingRight = `${scrollbarWidth}px`;
  document.body.style.overflow = 'hidden'; // 스크롤 비활성화
};

export const closeModal = () => {
  document.body.style.paddingRight = '';
  document.body.style.overflow = '';
};
