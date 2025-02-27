import { queryOptions, useMutation, useQuery, type UseMutationOptions } from '@tanstack/react-query';

import { MemberEntity } from '@/entities';
import { queryClient } from '@/shared';

const options = {
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
      mutationKey: [options.rootKey, userId],
      mutationFn: (nickname: string) => MemberEntity.memberService.updateMemberNickname(userId, nickname),
      onSuccess: () => queryClient.invalidateQueries({ queryKey: [options.rootKey] }),
    }) as unknown as UseMutationOptions<string, Error, string>,
};

export const useSelectMemberQuery = (userId: string) => useQuery(options.getMemberBaseInfo(userId));
export const useSelectMemberFollowersQuery = (userId: string) => useQuery(options.selectMemberFollowers(userId));
export const useSelectMemberFolloweesQuery = (userId: string) => useQuery(options.selectMemberFollowees(userId));
export const useMemberNicknameMutation = (userId: string) => useMutation(options.postMemberNickname(userId));
