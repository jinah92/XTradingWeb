import { useState } from "react";
/* hook */
/* component */
import MyInfo from "@/pages/mypage/MyInfo";
import Setting from "@/pages/mypage/Setting";

const Mypage = () => {
  const [myInfo, setMyInfo] = useState(true);
  const [setting, setSetting] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // 사이드바 열림/닫힘 상태 관리

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // 본문 내용 change
  const switching = (apply: string) => {
    setMyInfo(apply === "myInfo");
    setSetting(apply === "setting");
  };

  return (
    <>
      <div className="flex flex-col items-center md:p-4">
        <main className="w-full max-w-8xl mt-6 grid grid-cols-1 md:grid-cols-7 gap-4">
          <div>
            {/* 모바일 화면에서 사이드바 토글 버튼 */}
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={toggleSidebar}
            >
              {isOpen ? "닫기" : "메뉴"}
            </button>

            <aside
              className={`p-4 transform transition-transform duration-300 ease-in-out ${
                isOpen ? "block" : "hidden"
              } md:block`}
            >
              <ul className="space-y-2">
                <li>
                  <button
                    className="w-full text-left text-md font-semibold text-gray-700 hover:bg-gray-200 p-2 rounded-lg"
                    onClick={() => {
                      switching("myInfo");
                      if (isOpen) toggleSidebar();
                    }}
                  >
                    대시보드
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left text-md font-semibold text-gray-700 hover:bg-gray-200 p-2 rounded-lg"
                    onClick={() => {
                      switching("setting");
                      if (isOpen) toggleSidebar();
                    }}
                  >
                    설정
                  </button>
                </li>
              </ul>
            </aside>
          </div>
          <section className="md:col-span-6">
            {myInfo ? <MyInfo /> : null}
            {setting ? <Setting /> : null}
          </section>
        </main>
      </div>
    </>
  );
};

export default Mypage;
