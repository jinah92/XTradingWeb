import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
/* hook */
import {
  useFollowerList,
  useFollowingList,
  useMemberInfo,
} from "@/hooks/mypage/MyPageApi";
/* component */
import ProfileImage from "@/components/ui/profileImg";
import Avatar from "@/components/ui/avartar";
import { Button } from "@/components/ui/button";
import Modal from "@/components/modal/Modal";
/* page */
import NickNameChange from "@/pages/mypage/NickNameChange";
import { useAuth } from "@/router/AuthContext";

const MyInfo = () => {
  const { memberInfo, memberInfoApi } = useMemberInfo();
  const { followerList, followerListApi } = useFollowerList();
  const { followingList, followingListApi } = useFollowingList();
  const { userId } = useAuth();

  const location = useLocation();
  const { id } = location.state ?? { id: userId };

  useEffect(() => {
    searchData();
  }, [id]);

  /* 데이터 조회 */
  const searchData = () => {
    memberInfoApi(id);
    if (id === userId) {
      followerListApi();
      followingListApi();
    }
  };

  // 닉네임 변경 모달
  const [nickNameModal, setNickNameModal] = useState<boolean>(false);

  const closeModal = () => {
    setNickNameModal(false);
  };

  return (
    <>
      <div>
        <div className="flex">
          <div>
            {memberInfo?.profilePicUrl ? (
              <ProfileImage src={memberInfo?.profilePicUrl} size={"80px"} />
            ) : (
              <Avatar id={id} size={80} />
            )}
          </div>
          <h1 className="text-2xl font-semibold">{memberInfo?.nickName}</h1>
          <p className="text-gray-600">{memberInfo?.email}</p>
          <Button onClick={() => setNickNameModal(true)}>닉네임 변경</Button>
        </div>
        <div>
          <ul className="flex min-h-96 gap-x-3 flex-col md:flex-row">
            <li className="flex-1 p-3">
              <span className="font-semibold">명성</span>
              <div className="mt-5">
                <span>서비스 준비중</span>
              </div>
            </li>
            <li className="flex-1 p-3">
              <span className="font-semibold">작성한 글</span>
              <div className="mt-5">
                <span>서비스 준비중</span>
              </div>
            </li>
            <li className="flex-1 p-3">
              <span className="font-semibold">팔로우 리스트</span>
              {Array.isArray(followerList) && followerList.length > 0 ? (
                followerList.map((user) => (
                  <div key={user.userId}>
                    {user.profilePicUrl ? (
                      <div className="flex items-center mt-5">
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
                <p className="mt-5">No following users.</p>
              )}
            </li>
            <li className="flex-1 py-3 px-5">
              <span className="font-semibold">팔로잉 리스트</span>
              {Array.isArray(followingList) && followingList.length > 0 ? (
                followingList.map((user) => (
                  <div key={user.userId} className="mt-5">
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
                <p className="mt-5">No following users.</p>
              )}
            </li>
          </ul>
        </div>
      </div>

      <Modal isOpen={nickNameModal} onClose={closeModal}>
        <NickNameChange searchData={searchData} onClose={closeModal} />
      </Modal>
    </>
  );
};

export default MyInfo;
