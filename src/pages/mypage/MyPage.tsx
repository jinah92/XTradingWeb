import { useEffect, useState } from "react";
/* hook */
import { useNickNameChk, useNickNameModify, nickNameReq, useFollowerList, useFollowingList } from "@/hooks/mypage/MypageApi";
/* component */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";



const Mypage = () => {

  const [nickName, setNickName] = useState("");

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
        userId: localStorage.getItem("userId") || '',
        nickName: nickName
      }
      await nickNameModifyApi(param);
    }
  }

  useEffect(() => { 
    followerListApi();
    followingListApi();
    console.log(followerList);
    console.log(followingList);
  
  }, []);
  

  return (
    <>
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
