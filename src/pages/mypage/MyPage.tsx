import { useEffect, useState } from "react";
/* hook */
import { useNickNameChk, useNickNameModify, nickNameReq, useFollowerList, useFollowingList, useMemberInfo } from "@/hooks/mypage/MypageApi";
/* component */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface props {
  userId: string;
}

const Mypage = ({userId}:props) => {

  const [nickName, setNickName] = useState("");

  const { memberInfo, memberInfoApi } = useMemberInfo();
  const { nickNameChkApi } = useNickNameChk();
  const { nickNameModifyApi } = useNickNameModify();
  const { followerList, followerListApi } = useFollowerList();
  const { followingList, followingListApi } = useFollowingList();
  
  /* 닉네임 중복 체크 */
  const nickNameChk = async() => {
    const chkResult = await nickNameChkApi(nickName);

    /* 중복이 아닐 경우 */
    if(chkResult) {
      const param:nickNameReq = {
        userId: userId,
        nickName: nickName
      }
      await nickNameModifyApi(param);
    }
  }

  useEffect(() => { 
    memberInfoApi(userId);
    followerListApi();
    followingListApi();
    console.log(followerList);
    console.log(followingList);
  
  }, []);
  

  return (
    <>
    <div className="min-h-screen flex flex-col items-center md:p-4">
      <main className="w-full max-w-8xl mt-6 grid grid-cols-1 md:grid-cols-7 gap-4">
        <aside className="rounded-lg shadow-md p-4">
          <ul className="space-y-2">
            <li>
              <button className="w-full text-left text-md font-semibold text-gray-700 hover:bg-gray-200 p-2 rounded-lg">
                내정보
              </button>
            </li>
            <li>
              <button className="w-full text-left text-md font-semibold text-gray-700 hover:bg-gray-200 p-2 rounded-lg">
                설정
              </button>
            </li>
          </ul>
        </aside>
        <section className="md:col-span-6 rounded-lg shadow-md">
          <div className="bg-gray-200">
            <h1 className="text-2xl font-semibold">사용자 이름</h1>
            <p className="text-gray-600">user@example.com</p>
            <button className="mt-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              프로필 편집
            </button>
          </div>
          <h2 className="text-lg font-semibold mb-4">최근 활동</h2>
          <ul className="space-y-3">
            <li className="p-3 border rounded-lg">
              <p className="font-semibold">최근 주문</p>
              <p className="text-sm text-gray-600">주문 번호: 12345</p>
              <p className="text-sm text-gray-600">날짜: 2024-11-13</p>
            </li>
            <li className="p-3 border rounded-lg">
              <p className="font-semibold">최근 변경 사항</p>
              <p className="text-sm text-gray-600">비밀번호가 변경되었습니다.</p>
            </li>
            <li className="p-3 border rounded-lg">
              <p className="font-semibold">알림</p>
              <p className="text-sm text-gray-600">새로운 이벤트에 참여하셨습니다.</p>
            </li>
          </ul>
        </section>
      </main>
    </div>
      <div className="flex flex-col">
        <p>팔로우 리스트</p>
        <div>
        {Array.isArray(followerList) && followerList.length > 0 ? (
          followerList.map((user) => (
            <div key={user.userId}>
              <img
                src={user.profilePicUrl || "default-profile-pic.png"}
                alt={user.name}
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
              <h3>{user.name}</h3>
              <p>{user.userGrade}</p>
            </div>
          ))
        ) : (
          <p>No following users.</p>
        )}
        </div>
        <p>팔로잉 리스트</p>
        <div>
        {Array.isArray(followingList) && followingList.length > 0 ? (
          followingList.map((user) => (
            <div key={user.userId}>
              <img
                src={user.profilePicUrl || "default-profile-pic.png"}
                alt={user.name}
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
              <h3>{user.name}</h3>
              <p>{user.userGrade}</p>
            </div>
          ))
        ) : (
          <p>No following users.</p>
        )}
        </div>
        <Input onChange={(e) => setNickName(e.target.value)}
        value={nickName}></Input>
        <Button onClick={nickNameChk}>닉네임 변경</Button>
      </div>
    </>
  );
};

export default Mypage;
