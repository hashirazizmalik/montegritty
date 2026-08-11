'use client';

import { useEffect, useState } from 'react';
import { getProviders } from 'next-auth/react';

/**
 * Whether Google sign-in is actually available on this deployment.
 *
 * Resolved in the browser rather than passed down from the server on purpose:
 * most of these pages are statically generated, so a server-side check would be
 * frozen at build time and a deployment that added its credentials afterwards
 * would keep saying sign-in was unavailable until someone rebuilt.
 *
 * Returns null until known, so callers can avoid flashing the wrong state.
 */
export default function useAuthConfigured() {
  const [configured, setConfigured] = useState(null);

  useEffect(() => {
    let alive = true;
    getProviders()
      .then((p) => { if (alive) setConfigured(Boolean(p && p.google)); })
      .catch(() => { if (alive) setConfigured(false); });
    return () => { alive = false; };
  }, []);

  return configured;
}
