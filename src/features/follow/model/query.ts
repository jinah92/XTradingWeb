import { useMutation } from '@tanstack/react-query';

import { options } from './query-options';

export const useAddFollowerMutation = () => useMutation(options.postFollower());

export const useRemoveFollowerMutation = () => useMutation(options.postUnfollower());
