import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Avatar, Button, ProfileImage } from '@shared';

import Modal from '@/components/modal/Modal';
import { useFollowerList, useFollowingList, useMemberInfo } from '@/hooks/mypage/MyPageApi';
import NickNameChange from '@/pages/mypage/NickNameChange';
import {
  useMemberNicknameMutation,
  useSelectMemberFolloweesQuery,
  useSelectMemberFollowersQuery,
  useSelectMemberQuery,
} from '@/queries';
import { useAuth } from '@/router/AuthContext';

const MyInfo = () => {
  const { userId } = useAuth();

  const { data: user } = useSelectMemberQuery(userId!);
  const { data: followers } = useSelectMemberFollowersQuery(userId!);
  const { data: followees } = useSelectMemberFolloweesQuery(userId!);

  const location = useLocation();
  const { id } = location.state ?? { id: userId };

  // 닉네임 변경 모달
  const [nickNameModal, setNickNameModal] = useState<boolean>(false);

  const closeModal = () => {
    setNickNameModal(false);
  };

  const memoizedUser = useMemo(() => user?.getInfo(), [user]);

  return (
    <>
      <div>
        <div className="flex">
          <div>
            {memoizedUser?.profile ? (
              <ProfileImage src={memoizedUser?.profile} size={'80px'} />
            ) : (
              <Avatar id={id} size={80} />
            )}
          </div>
          <h1 className="text-2xl font-semibold">{memoizedUser?.nickname}</h1>
          <p className="text-gray-600">{memoizedUser?.email}</p>
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
              {followers?.map(({ userId, profilePicUrl, userGrade, name }) => (
                <div key={userId}>
                  <div className="flex items-center">
                    {profilePicUrl ? <ProfileImage src={profilePicUrl} /> : <Avatar id={userId} />}
                    <span>{name}</span>
                    <span className="p-1 ml-1 text-sm text-blue-500">{userGrade}</span>
                  </div>
                </div>
              ))}
              {followers?.length === 0 && <p className="mt-5">No following users.</p>}
            </li>
            <li className="flex-1 py-3 px-5">
              <span className="font-semibold">팔로잉 리스트</span>
              <div className="flex flex-col gap-3">
                {followees?.map(({ userId, profilePicUrl, userGrade, name }) => (
                  <div key={userId}>
                    <div className="flex items-center">
                      {profilePicUrl ? <ProfileImage src={profilePicUrl} /> : <Avatar id={userId} />}
                      <span>{name}</span>
                      <span className="p-1 ml-1 text-sm text-blue-500">{userGrade}</span>
                    </div>
                  </div>
                ))}
              </div>
              {followees?.length === 0 && <p className="mt-5">No following users.</p>}
            </li>
          </ul>
        </div>
      </div>
      <Modal isOpen={nickNameModal} onClose={closeModal}>
        <NickNameChange onClose={closeModal} />
      </Modal>
    </>
  );
};

export default MyInfo;
