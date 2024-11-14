import { useEffect, useState } from "react";
/* hook */
import {
  useNickNameChk,
  useNickNameModify,
  nickNameReq,
  useFollowerList,
  useFollowingList,
  useMemberInfo,
} from "@/hooks/mypage/MypageApi";
/* component */
import { useLocation } from "react-router-dom";
import { useAuth } from "@/router/AuthContext";
import ProfileImage from "@/components/ui/profileImg";
import Avatar from "@/components/ui/avartar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MyInfo = () => {
  const [nickName, setNickName] = useState("");

  const { memberInfo, memberInfoApi } = useMemberInfo();
  const { nickNameChkApi } = useNickNameChk();
  const { nickNameModifyApi } = useNickNameModify();
  const { followerList, followerListApi } = useFollowerList();
  const { followingList, followingListApi } = useFollowingList();
  const { userId } = useAuth();

  const location = useLocation();
  const { id } = location.state ?? { id: userId };

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
    memberInfoApi(id);
    followerListApi();
    followingListApi();
  }, [id]);

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">{memberInfo?.nickName}</h1>
        <p className="text-gray-600">{memberInfo?.email}</p>
        <div>
          {memberInfo?.profilePicUrl ? (
            <ProfileImage src={memberInfo?.profilePicUrl} />
          ) : (
            <Avatar id={id} />
          )}
        </div>
        <button
          className="mt-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={nickNameChk}
        >
          닉네임 변경
        </button>
      </div>
      <div>
        <ul className="flex min-h-96 gap-x-3 flex-col md:flex-row">
          <li className="flex-1 p-3 border rounded-lg">
            <p className="font-semibold">명성</p>
          </li>
          <li className="flex-1 p-3 border rounded-lg">
            <p className="font-semibold">작성한 글</p>
          </li>
          <li className="flex-1 p-3 border rounded-lg">
            <span className="font-semibold">팔로우 리스트</span>
            {Array.isArray(followerList) && followerList.length > 0 ? (
              followerList.map((user) => (
                <div key={user.userId}>
                  {user.profilePicUrl ? (
                    <div className="flex items-center">
                      <ProfileImage src={user.profilePicUrl} />
                      <span>{user.name}</span>
                      <span className="p-1 ml-1 text-sm text-blue-500">
                        {user.userGrade}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Avatar id={user.userId} />
                      <span>{user.name}</span>
                      <span className="p-1 ml-1 text-sm text-blue-500">
                        {user.userGrade}
                      </span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No following users.</p>
            )}
          </li>
          <li className="flex-1 py-3 px-5 border rounded-lg">
            <span className="font-semibold">팔로잉 리스트</span>
            {Array.isArray(followingList) && followingList.length > 0 ? (
              followingList.map((user) => (
                <div key={user.userId} className="mt-3">
                  {user.profilePicUrl ? (
                    <div className="flex items-center">
                      <ProfileImage src={user.profilePicUrl} />
                      <span>{user.name}</span>
                      <span className="p-1 ml-1 text-sm text-blue-500">
                        {user.userGrade}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Avatar id={user.userId} />
                      <span>{user.name}</span>
                      <span className="p-1 ml-1 text-sm text-blue-500">
                        {user.userGrade}
                      </span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No following users.</p>
            )}
          </li>
        </ul>
      </div>
      <Input
        onChange={(e) => setNickName(e.target.value)}
        value={nickName}
      ></Input>
      <Button onClick={nickNameChk}>닉네임 변경</Button>
    </>
  );
};

export default MyInfo;
