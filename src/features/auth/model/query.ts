import { useMutation } from '@tanstack/react-query';

import { options } from './query-options';

export const useLoginByEmailMutation = () => useMutation(options.postLoginByEmail());
