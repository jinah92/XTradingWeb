import { queryOptions, type UseMutationOptions } from '@tanstack/react-query';

import { MemberEntity } from '@/entities';
import { queryClient } from '@/shared';

export const options = {
  rootKey: 'member',
  getMemberBaseInfo: (userId: string) =>
    queryOptions({
      queryKey: [options.rootKey],
      queryFn: () => MemberEntity.memberService.getMemberBaseInfo(userId),
    }),
  selectMemberFollowers: (userId: string) =>
    queryOptions({ ...options.getMemberBaseInfo(userId), select: user => user.getFollowers() }),
  selectMemberFollowees: (userId: string) =>
    queryOptions({ ...options.getMemberBaseInfo(userId), select: user => user.getFollowees() }),
  postMemberNickname: (userId: string) =>
    ({
      mutationKey: ['update', 'nickname', userId],
      mutationFn: (nickname: string) => MemberEntity.memberService.updateMemberNickname(userId, nickname),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: [options.rootKey] }),
    }) as UseMutationOptions<any, Error, string>,
};
