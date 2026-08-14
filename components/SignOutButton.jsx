'use client';

import { useRouter } from 'next/navigation';

export default function SignOutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      className="cd-signout"
      onClick={async () => {
        await fetch('/api/session', { method: 'DELETE' });
        router.push('/login');
        router.refresh();
      }}
    >
      Sign out
    </button>
  );
}
