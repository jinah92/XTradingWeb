import { GoogleOAuthProvider as GoogleProvider } from '@react-oauth/google';

import { env } from '@shared';

import type { PropsWithChildren } from 'react';

export const GoogleOAuthProvider = ({ children }: PropsWithChildren) => (
  <GoogleProvider clientId={env.googleClientKey}>{children}</GoogleProvider>
);
