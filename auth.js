import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

/**
 * Google sign-in, required only for the two actions that create something:
 * deploying a template and building an agent in the studio. Listening to a
 * shared agent stays open to everyone — that is the entire point of a share
 * link, and putting a login in front of it would kill the thing it exists for.
 *
 * Configured entirely by environment variables:
 *   AUTH_SECRET         — any long random string (`openssl rand -base64 32`)
 *   AUTH_GOOGLE_ID      — OAuth client id from Google Cloud Console
 *   AUTH_GOOGLE_SECRET  — OAuth client secret
 *
 * With none of them set the site still builds and runs; `isAuthConfigured()` is
 * false and the UI says sign-in is unavailable instead of throwing a redirect
 * loop at people.
 */
export const isAuthConfigured = () =>
  Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET && process.env.AUTH_SECRET);

const providers = isAuthConfigured()
  ? [
      Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
        // We only ever need who they are, so ask for nothing else.
        authorization: { params: { scope: 'openid email profile', prompt: 'select_account' } },
      }),
    ]
  : [];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  // JWT sessions: there is no database here, and we store nothing about anyone
  // beyond what Google returns for the length of the session.
  session: { strategy: 'jwt', maxAge: 60 * 60 * 24 * 7 },
  trustHost: true,
  pages: { error: '/studio' },
  callbacks: {
    session({ session, token }) {
      if (session.user) session.user.id = token.sub;
      return session;
    },
  },
});
