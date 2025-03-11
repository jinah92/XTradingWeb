import { type UseMutationOptions } from '@tanstack/react-query';

import { FollowEntity } from '@/entities';

export const options = {
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
