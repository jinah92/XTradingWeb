import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  useNickNameChk,
  useNickNameModify,
  type nickNameReq,
  useFollowerList,
  useFollowingList,
  useMemberInfo,
} from '@/hooks/mypage/MyPageApi';

/* component */
import Avatar from '../../components/ui/avartar';
import ProfileImage from '../../components/ui/profileImg';
import { useAuth } from '../../router/AuthContext';

const Setting = () => {
  const [nickName, setNickName] = useState('');

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
  }, []);

  return <>설정</>;
};

export default Setting;
