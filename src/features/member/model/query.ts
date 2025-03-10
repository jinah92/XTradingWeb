import { useMutation, useQuery } from '@tanstack/react-query';

import { options } from './query-options';

export const useSelectMemberQuery = (userId: string) => useQuery(options.getMemberBaseInfo(userId));

export const useSelectMemberFollowersQuery = (userId: string) => useQuery(options.selectMemberFollowers(userId));

export const useSelectMemberFolloweesQuery = (userId: string) => useQuery(options.selectMemberFollowees(userId));

export const useMemberNicknameMutation = (userId: string) => useMutation(options.postMemberNickname(userId));
