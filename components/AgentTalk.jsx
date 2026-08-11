'use client';

import dynamic from 'next/dynamic';

// livekit-client touches browser APIs at import time — never render it on the server.
const VoiceRoom = dynamic(() => import('./VoiceRoom'), {
  ssr: false,
  loading: () => <div className="vr-stage"><p className="vr-hint">Loading…</p></div>,
});

export default function AgentTalk({ assistantId }) {
  return (
    <div className="agent-talk">
      <VoiceRoom
        assistantId={assistantId}
        startLabel="Start the call"
        label="Speak normally. Urdu, English, or a mix."
        hint="You'll be asked for microphone access. Nothing is recorded."
      />
    </div>
  );
}
