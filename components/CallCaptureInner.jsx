'use client';

import { useEffect } from 'react';
import { useRoomContext } from '@upliftai/assistants-react';
import { RoomEvent } from 'livekit-client';

/**
 * Attaches to every RoomEvent and records it.
 *
 * Payloads are flattened to plain values on the way in — LiveKit hands you
 * Participant and Track objects with circular references, which would make the
 * log impossible to serialise.
 */

const who = (p) => {
  if (!p) return 'unknown';
  if (p.isLocal) return 'caller';
  // Uplift's agent joins as a non-local participant; identity is the reliable tell.
  return p.identity?.includes('agent') || p.isAgent ? 'agent' : 'remote';
};

export default function CallCaptureInner({ push }) {
  const room = useRoomContext();

  useEffect(() => {
    if (!room) return;

    const handlers = {
      [RoomEvent.Connected]: () => push({
        event: 'room.connected',
        data: { room: room.name, localIdentity: room.localParticipant?.identity },
      }),
      [RoomEvent.Disconnected]: (reason) => push({ event: 'room.disconnected', data: { reason: String(reason ?? '') } }),
      [RoomEvent.Reconnecting]: () => push({ event: 'room.reconnecting', data: {} }),
      [RoomEvent.Reconnected]: () => push({ event: 'room.reconnected', data: {} }),
      [RoomEvent.ConnectionStateChanged]: (state) => push({ event: 'room.state', data: { state: String(state) } }),

      [RoomEvent.ParticipantConnected]: (p) => push({
        event: 'participant.joined',
        data: { role: who(p), identity: p.identity, name: p.name, attributes: p.attributes || {} },
      }),
      [RoomEvent.ParticipantDisconnected]: (p) => push({
        event: 'participant.left', data: { role: who(p), identity: p.identity },
      }),

      // This is where Uplift reports listening / thinking / speaking.
      [RoomEvent.ParticipantAttributesChanged]: (changed, p) => {
        push({ event: 'participant.attributes', data: { role: who(p), changed } });
        const state = changed?.['lk.agent.state'];
        if (state) push({ event: 'agent.state', data: { state } });
      },

      [RoomEvent.TrackSubscribed]: (track, pub, p) => push({
        event: 'track.subscribed',
        data: { role: who(p), kind: track.kind, source: String(pub.source), sid: pub.trackSid },
      }),
      [RoomEvent.TrackUnsubscribed]: (track, pub, p) => push({
        event: 'track.unsubscribed', data: { role: who(p), sid: pub.trackSid },
      }),
      [RoomEvent.TrackMuted]: (pub, p) => push({ event: 'track.muted', data: { role: who(p), source: String(pub.source) } }),
      [RoomEvent.TrackUnmuted]: (pub, p) => push({ event: 'track.unmuted', data: { role: who(p), source: String(pub.source) } }),

      [RoomEvent.ActiveSpeakersChanged]: (speakers) => push({
        event: 'speakers.changed',
        data: { speaking: speakers.map((s) => ({ role: who(s), level: Number(s.audioLevel?.toFixed?.(3) ?? 0) })) },
      }),

      // The one that matters most for a dashboard.
      [RoomEvent.TranscriptionReceived]: (segments, p) => {
        segments.forEach((s) => push({
          event: 'transcription',
          data: {
            role: who(p),
            text: s.text,
            final: s.final,
            language: s.language || '',
            startTime: s.startTime,
            endTime: s.endTime,
            id: s.id,
          },
        }));
      },

      [RoomEvent.DataReceived]: (payload, p, _kind, topic) => {
        let text = '';
        try { text = new TextDecoder().decode(payload).slice(0, 500); } catch { /* binary */ }
        push({ event: 'data.received', data: { role: who(p), topic: topic || '', text } });
      },

      [RoomEvent.ConnectionQualityChanged]: (quality, p) => push({
        event: 'quality', data: { role: who(p), quality: String(quality) },
      }),
      [RoomEvent.MetricsReceived]: (metrics, p) => push({
        event: 'metrics', data: { role: who(p), keys: Object.keys(metrics || {}) },
      }),
      [RoomEvent.ChatMessage]: (msg, p) => push({
        event: 'chat', data: { role: who(p), message: msg?.message?.slice?.(0, 500) || '' },
      }),
      [RoomEvent.MediaDevicesError]: (e) => push({ event: 'media.error', data: { message: e?.message || '' } }),
      [RoomEvent.LocalAudioSilenceDetected]: () => push({ event: 'audio.silence', data: {} }),
    };

    Object.entries(handlers).forEach(([evt, fn]) => room.on(evt, fn));

    // A periodic sample of the local mic level, so the log shows who was
    // actually talking and when, not just what was transcribed.
    const tick = setInterval(() => {
      const level = room.localParticipant?.audioLevel;
      if (typeof level === 'number' && level > 0.02) {
        push({ event: 'caller.level', data: { level: Number(level.toFixed(3)) } });
      }
    }, 1000);

    push({ event: 'capture.attached', data: { events: Object.keys(handlers).length } });

    return () => {
      clearInterval(tick);
      Object.entries(handlers).forEach(([evt, fn]) => room.off(evt, fn));
    };
  }, [room, push]);

  return null;
}
