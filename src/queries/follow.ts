import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { FollowEntity } from '@/entities';

const options = {
  rootKey: 'follow',
  postFollower: () =>
    ({
      mutationKey: [options.rootKey, 'add'],
      mutationFn: (userId: string) => FollowEntity.followService.follow(userId),
    }) as UseMutationOptions<any, Error, string>,
  postUnfollower: () =>
    ({
      mutationKey: [options.rootKey, 'remove'],
      mutationFn: (userId: string) => FollowEntity.followService.unfollow(userId),
    }) as UseMutationOptions<any, Error, string>,
};

export const useAddFollowerMutation = () => useMutation(options.postFollower());
export const useRemoveFollowerMutation = () => useMutation(options.postUnfollower());
