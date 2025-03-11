import React, { useEffect, useState } from 'react';

import { Button, Input } from '@shared';

import { MemberFeature } from '@/features';
import { type nickNameReq, useNickNameChk, useNickNameModify } from '@/hooks/mypage/MyPageApi';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/router/AuthContext';

interface ParentComponentProps {
  onClose: () => void;
}

const NickNameChange = ({ onClose }: ParentComponentProps) => {
  const { nickNameChkApi } = useNickNameChk();
  const { nickNameModifyApi } = useNickNameModify();
  const [nickName, setNickName] = useState('');
  const { userId } = useAuth();
  const { mutate, isError, isSuccess, error } = MemberFeature.useMemberNicknameMutation(userId!);

  /* 닉네임 중복 체크, 변경 */
  const nickNameChk = async () => {
    // const chkResult = await nickNameChkApi(nickName);
    if (nickName.length > 0) {
      mutate(nickName);
    }
    // /* 중복이 아닐 경우 변경 */
    // if (chkResult && userId != null) {
    //   const param: nickNameReq = {
    //     userId: userId,
    //     nickName: nickName,
    //   };
    //   const result = await nickNameModifyApi(param);
    //   if (result) {
    //     searchData();
    //     onClose();
    //   }
    // }
  };

  useEffect(() => {
    if (isError) {
      toast({
        description: error.message,
        duration: 2000,
      });
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        description: '변경되었습니다.',
        duration: 2000,
      });
      onClose();
    }
  }, [isSuccess]);

  return (
    <>
      <div className="flex flex-col justify-center space-y-6 pt-3 pb-3">
        <div>
          <span>닉네임 변경</span>
        </div>
        <div className="flex">
          <Input onChange={e => setNickName(e.target.value)} value={nickName}></Input>
          <Button onClick={nickNameChk}>변경</Button>
        </div>
        <div>
          <span>문자와 숫자를 포함하여 최소 1자에서 최대 20자까지 입력해야 합니다.</span>
        </div>
      </div>
    </>
  );
};

export default NickNameChange;
