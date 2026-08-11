'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  UpliftAIRoom,
  useUpliftAIRoom,
  useVoiceAssistant,
  useRoomContext,
  BarVisualizer,
  RoomAudioRenderer,
  TrackToggle,
  useTracks,
} from '@upliftai/assistants-react';
import { Track } from 'livekit-client';

/**
 * Echo cancellation is the whole ballgame for a speakerphone conversation: the
 * agent is talking out of the same laptop the microphone is listening through.
 * These are LiveKit's defaults on most browsers, but "usually on by default" is
 * not good enough for the thing that decides whether the agent talks to itself.
 *
 * voiceIsolation is experimental and ignored where unsupported; where it is
 * supported it supersedes noiseSuppression.
 */
const CAPTURE = {
  echoCancellation: true,
  noiseSuppression: true,
  autoGainControl: true,
  voiceIsolation: true,
};

const ROOM_OPTIONS = { audioCaptureDefaults: CAPTURE };

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
  const room = useRoomContext();
  const [echoOff, setEchoOff] = useState(false);

  // Asking for echo cancellation is not the same as getting it — some devices
  // and browsers simply cannot. Read back what the live track actually applied,
  // because if it is off, headphones are the only real fix and the visitor
  // should be told rather than left wondering why the agent talks over itself.
  useEffect(() => {
    if (!isConnected || !room) return;
    const check = () => {
      const pub = room.localParticipant?.getTrackPublication(Track.Source.Microphone);
      const settings = pub?.track?.mediaStreamTrack?.getSettings?.();
      if (settings) setEchoOff(settings.echoCancellation === false);
    };
    // Give the track a moment to publish before reading its settings.
    const t = setTimeout(check, 1200);
    return () => clearTimeout(t);
  }, [isConnected, room]);
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
      {echoOff && (
        <p className="vr-warn" role="status">
          This device cannot cancel echo. Use headphones, or the agent will hear
          itself and interrupt.
        </p>
      )}

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
      //
      // The tracks MUST be stopped again. Leaving this stream open kept a
      // second, unmanaged capture of the same microphone alive for the whole
      // call, alongside the one LiveKit opens. Chrome cancels echo against its
      // own managed capture, so the stray one defeated it: the agent's speech
      // came back in through the mic, got transcribed, and the agent answered
      // itself — and the barge-in detector, hearing that same audio, cut the
      // agent off mid-sentence.
      //
      // The constraints are repeated here on purpose. The first grant is what
      // opens the device, and the processing flags it is opened with are what
      // stick.
      const probe = await navigator.mediaDevices.getUserMedia({ audio: CAPTURE });
      probe.getTracks().forEach((t) => t.stop());

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
        options={ROOM_OPTIONS}
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
      {status !== 'error' && (
        <p className="vr-hint">Headphones give the cleanest conversation.</p>
      )}
      {status === 'error' && <p className="vr-error" role="alert">{error}</p>}
    </div>
  );
}
