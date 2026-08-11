'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  UpliftAIRoom,
  useUpliftAIRoom,
  useVoiceAssistant,
  BarVisualizer,
  RoomAudioRenderer,
  TrackToggle,
  useTracks,
} from '@upliftai/assistants-react';
import { Track } from 'livekit-client';

const STATE_COPY = {
  connecting: 'Connecting…',
  initializing: 'Waking the agent…',
  listening: 'Listening — go ahead',
  thinking: 'Thinking…',
  speaking: 'Speaking',
  disconnected: 'Disconnected',
};

function Stage({ label, onEnd }) {
  const { isConnected } = useUpliftAIRoom();
  const { state, audioTrack } = useVoiceAssistant();
  // Fall back to finding the agent's track manually on SDK versions where
  // useVoiceAssistant doesn't surface it.
  const tracks = useTracks([Track.Source.Microphone], { onlySubscribed: true });
  const agentTrack = audioTrack || tracks.find((t) => !t.participant?.isLocal);

  return (
    <div className="vr-stage">
      {/* Plays whatever the agent says. Without this the room is silent. */}
      <RoomAudioRenderer />

      <div className="vr-viz">
        <BarVisualizer state={state} trackRef={agentTrack} barCount={9} />
      </div>

      <p className="vr-state">
        <span className={`vr-dot ${isConnected ? 'live' : ''}`} />
        {STATE_COPY[state] || (isConnected ? 'Connected' : 'Connecting…')}
      </p>
      <p className="vr-label">{label}</p>

      <div className="vr-controls">
        <TrackToggle source={Track.Source.Microphone} className="vr-mic">
          Mute
        </TrackToggle>
        <button type="button" className="vr-end" onClick={onEnd}>End call</button>
      </div>
    </div>
  );
}

/**
 * A live voice conversation with an Uplift assistant.
 *
 * Credentials are minted by /api/sessions on demand — nothing is fetched until
 * the visitor actually asks to talk, so no page pays for WebRTC it never uses.
 */
export default function VoiceRoom({
  assistantId,
  label = 'Speak normally — Urdu or English.',
  startLabel = 'Start talking',
  hint,
  tools,
  onConnected,
}) {
  const [session, setSession] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | starting | live | error
  const [error, setError] = useState('');
  const mounted = useRef(true);

  useEffect(() => () => { mounted.current = false; }, []);

  const start = useCallback(async () => {
    setStatus('starting');
    setError('');
    try {
      // Ask for the microphone before connecting, so a refusal is a clear
      // message rather than a room that joins and then hears nothing.
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const res = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assistantId ? { assistantId } : { builder: true }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not start the conversation.');
      if (!mounted.current) return;

      setSession(data);
      setStatus('live');
      onConnected?.(data);
    } catch (e) {
      if (!mounted.current) return;
      setStatus('error');
      setError(
        e?.name === 'NotAllowedError'
          ? 'Microphone access was blocked. Allow it in your browser and try again.'
          : e.message || 'Something went wrong starting the call.'
      );
    }
  }, [assistantId, onConnected]);

  const end = useCallback(() => {
    setSession(null);
    setStatus('idle');
  }, []);

  if (status === 'live' && session) {
    return (
      <UpliftAIRoom
        token={session.token}
        serverUrl={session.wsUrl}
        connect
        audio
        video={false}
        tools={tools}
        onDisconnected={end}
        className="vr-room"
      >
        <Stage label={label} onEnd={end} />
      </UpliftAIRoom>
    );
  }

  return (
    <div className="vr-stage">
      <div className="vr-viz idle" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, n) => <i key={n} />)}
      </div>
      <button
        type="button"
        className="btn vr-start"
        onClick={start}
        disabled={status === 'starting'}
      >
        {status === 'starting' ? 'Connecting…' : startLabel}
        <span className="arr" aria-hidden="true">↗</span>
      </button>
      {hint && status !== 'error' && <p className="vr-hint">{hint}</p>}
      {status === 'error' && <p className="vr-error" role="alert">{error}</p>}
    </div>
  );
}
