import { useEffect, useState } from "react";
/* hook */
import {
  useNickNameChk,
  useNickNameModify,
  nickNameReq,
  useFollowerList,
  useFollowingList,
} from "@/hooks/mypage/MypageApi";
/* component */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/router/AuthContext";
import MyInfo from "@/pages/mypage/MyInfo";
import Setting from "@/pages/mypage/Setting";

const Mypage = () => {
  const [nickName, setNickName] = useState("");
  const { nickNameChkApi } = useNickNameChk();
  const { nickNameModifyApi } = useNickNameModify();
  const { followerList, followerListApi } = useFollowerList();
  const { followingList, followingListApi } = useFollowingList();
  const { userId } = useAuth();

  const [myInfo, setMyInfo] = useState(true);
  const [setting, setSetting] = useState(false);

  // 본문 내용 change
  const switching = (apply: string) => {
    setMyInfo(apply === "myInfo");
    setSetting(apply === "setting");
  };

  /* 닉네임 중복 체크 */
  const nickNameChk = async () => {
    const chkResult = await nickNameChkApi(nickName);

    /* 중복이 아닐 경우 */
    if (chkResult && userId != null) {
      const param: nickNameReq = {
        userId: userId,
        nickName: nickName,
      };
      await nickNameModifyApi(param);
    }
  };

  useEffect(() => {
    followerListApi();
    followingListApi();
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col items-center md:p-4">
        <main className="w-full max-w-8xl mt-6 grid grid-cols-1 md:grid-cols-7 gap-4">
          <aside className="rounded-lg shadow-md p-4">
            <ul className="space-y-2">
              <li>
                <button
                  className="w-full text-left text-md font-semibold text-gray-700 hover:bg-gray-200 p-2 rounded-lg"
                  onClick={() => switching("myInfo")}
                >
                  대시보드
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left text-md font-semibold text-gray-700 hover:bg-gray-200 p-2 rounded-lg"
                  onClick={() => switching("setting")}
                >
                  설정
                </button>
              </li>
            </ul>
          </aside>
          <section className="md:col-span-6 rounded-lg shadow-md">
            {myInfo ? <MyInfo /> : null}
            {setting ? <Setting /> : null}
          </section>
        </main>
      </div>
    </>
  );
};

export default Mypage;
