import { type UseMutationOptions } from '@tanstack/react-query';

import { MyPageEntity } from '@/entities';

export const options = {
  rootKey: 'follow',
  postFollower: () =>
    ({
      mutationKey: [options.rootKey, 'add'],
      mutationFn: (userId: string) => MyPageEntity.followService.follow(userId),
    }) as UseMutationOptions<any, Error, string>,
  postUnfollower: () =>
    ({
      mutationKey: [options.rootKey, 'remove'],
      mutationFn: (userId: string) => MyPageEntity.followService.unfollow(userId),
    }) as UseMutationOptions<any, Error, string>,
};
