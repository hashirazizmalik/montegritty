'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// WebRTC is browser-only — keep livekit out of the server bundle entirely.
const VoiceRoom = dynamic(() => import('./VoiceRoom'), {
  ssr: false,
  loading: () => <div className="vr-stage"><p className="vr-hint">Loading the studio…</p></div>,
});

/**
 * Describe an agent out loud and get a working one.
 *
 * The builder assistant runs the interview; when it has enough, it calls the
 * create_agent tool. That tool executes here in the browser, posts the spec to
 * our own API, and the API creates the real agent with the server-held key.
 */
export default function Studio() {
  const [built, setBuilt] = useState(null);
  const [copied, setCopied] = useState(false);
  // The tool handler is built once and must not go stale, so it reads through
  // a ref rather than closing over state.
  const setBuiltRef = useRef(setBuilt);
  setBuiltRef.current = setBuilt;

  const tools = useMemo(() => [{
    name: 'create_agent',
    description:
      'Create the voice agent the user has described. Call this once you know what the agent is for, ' +
      'what language it speaks, and who it talks to. Do not call it before you have those.',
    parameters: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Short name for the agent, e.g. "Clinic Receptionist".' },
        description: { type: 'string', description: 'One line on what it does.' },
        voice: { type: 'string', description: 'A voiceId from the list you were given.' },
        greeting: { type: 'string', description: 'The exact opening line, in the agent\'s language.' },
        instructions: {
          type: 'string',
          description:
            'The full brief for the new agent, written in the second person. Must cover what it handles, ' +
            'its tone, what it must never do, and when to hand over to a human.',
        },
      },
      required: ['name', 'voice', 'instructions', 'greeting'],
    },
    timeout: 25000,
    handler: async ({ payload }) => {
      let args;
      try {
        args = typeof payload === 'string' ? JSON.parse(payload) : payload;
      } catch {
        return 'The agent specification was malformed. Ask the user to repeat what they want and try again.';
      }

      try {
        const res = await fetch('/api/agents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(args),
        });
        const data = await res.json();
        if (!res.ok) {
          return `Creation failed: ${data.error || 'unknown error'}. Tell the user plainly and offer to try again.`;
        }
        setBuiltRef.current({ ...data, ...args });
        // What the builder says next is driven by this string, so make it explicit.
        return `The agent "${args.name}" is live and its shareable link is now on screen. Tell the user it is ready and offer to change anything. Do not read the link aloud.`;
      } catch (e) {
        return `Creation failed: ${e.message}. Tell the user plainly and offer to try again.`;
      }
    },
  }], []);

  const shareUrl = built
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}${built.url}`
    : '';

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }, [shareUrl]);

  return (
    <div className="studio">
      <div className="studio-room">
        <VoiceRoom
          tools={tools}
          startLabel="Start talking"
          label="Tell it what the agent should do. Urdu or English."
          hint="You'll be asked for microphone access. Nothing is recorded."
        />
      </div>

      <aside className={`studio-out${built ? ' ready' : ''}`} aria-live="polite">
        {!built ? (
          <>
            <h3>Your agent appears here</h3>
            <ol className="studio-steps">
              <li><span>01</span> Press start and describe the call you want handled.</li>
              <li><span>02</span> Answer a few questions — language, who it talks to, what it must never say.</li>
              <li><span>03</span> It builds the agent and hands you a link anyone can talk to.</li>
            </ol>
            <p className="studio-note">
              Built agents are demos and expire. Production agents are wired into your
              systems and hosted properly — that part is a conversation with us.
            </p>
          </>
        ) : (
          <>
            <span className="studio-badge">Live now</span>
            <h3>{built.name}</h3>
            {built.description && <p className="studio-desc">{built.description}</p>}

            <dl className="studio-spec">
              <dt>Voice</dt><dd>{built.voice}</dd>
              <dt>Opens with</dt><dd className="urdu">{built.greeting}</dd>
            </dl>

            <div className="studio-share">
              <input readOnly value={shareUrl} aria-label="Shareable link to your agent" />
              <button type="button" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
            </div>

            <Link href={built.url} className="btn studio-cta">
              Talk to it <span className="arr" aria-hidden="true">↗</span>
            </Link>
          </>
        )}
      </aside>
    </div>
  );
}
