'use client';

import { SessionProvider } from 'next-auth/react';

// Client components (the template library, the studio) read the session through
// useSession, which keeps /templates statically rendered.
export default function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
