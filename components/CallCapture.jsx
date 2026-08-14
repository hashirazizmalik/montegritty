'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { RoomEvent } from 'livekit-client';

const Room = dynamic(
  () => import('@upliftai/assistants-react').then((m) => m.UpliftAIRoom),
  { ssr: false }
);
const RecorderInner = dynamic(() => import('./CallCaptureInner'), { ssr: false });

/**
 * Instrumented call harness.
 *
 * Uplift exposes no server-side call log, transcript or webhook API — there is
 * no endpoint that will tell you what happened on a call after it ends. So
 * everything the client dashboard will ever show has to be captured live, in
 * the room, and stored by us.
 *
 * This page exists to find out exactly what "everything" amounts to. It
 * attaches to every RoomEvent the SDK emits, records each with a timestamp
 * relative to call start, and hands back a JSON file. Design the dashboard from
 * that file, not from a guess.
 */
export default function CallCapture({ assistants = [] }) {
  const [assistantId, setAssistantId] = useState(assistants[0]?.id || '');
  const [session, setSession] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [log, setLog] = useState([]);
  const [mic, setMic] = useState(null);
  const startedAt = useRef(null);

  const push = useCallback((entry) => {
    setLog((l) => [...l, { at: Date.now() - (startedAt.current || Date.now()), ...entry }]);
  }, []);

  const start = async () => {
    setStatus('starting');
    setError('');
    setLog([]);
    try {
      const probe = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      probe.getTracks().forEach((t) => t.stop());

      const res = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assistantId, participantName: 'capture' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not start the session.');
      startedAt.current = Date.now();
      setSession(data);
      setStatus('live');
      push({ event: 'session.created', data: { roomName: data.roomName, assistantId: data.assistantId } });
    } catch (e) {
      setStatus('error');
      setError(e.message);
    }
  };

  const onMicLevel = useCallback((m) => setMic(m), []);

  const stop = () => {
    push({ event: 'capture.stopped', data: {} });
    setSession(null);
    setStatus('done');
  };

  // ---- derived: the actual shape of what we captured -----------------------
  const summary = useMemo(() => {
    const transcripts = log.filter((l) => l.event === 'transcription' && l.data.final);
    const states = log.filter((l) => l.event === 'agent.state');
    const byRole = (role) => transcripts.filter((t) => t.data.role === role);
    const words = (rows) => rows.reduce((n, r) => n + r.data.text.trim().split(/\s+/).filter(Boolean).length, 0);
    const durationMs = log.length ? log[log.length - 1].at : 0;

    return {
      durationMs,
      durationLabel: `${Math.floor(durationMs / 60000)}:${String(Math.floor((durationMs % 60000) / 1000)).padStart(2, '0')}`,
      totalEvents: log.length,
      eventTypes: [...new Set(log.map((l) => l.event))].sort(),
      finalTranscripts: transcripts.length,
      agentTurns: byRole('agent').length,
      callerTurns: byRole('caller').length,
      agentWords: words(byRole('agent')),
      callerWords: words(byRole('caller')),
      languagesSeen: [...new Set(transcripts.map((t) => t.data.language).filter(Boolean))],
      agentStates: [...new Set(states.map((s) => s.data.state))],
    };
  }, [log]);

  const transcript = useMemo(
    () => log.filter((l) => l.event === 'transcription' && l.data.final)
             .map((l) => ({ at: l.at, role: l.data.role, text: l.data.text })),
    [log]
  );

  const download = () => {
    const blob = new Blob(
      [JSON.stringify({ capturedAt: new Date().toISOString(), assistantId, summary, log }, null, 2)],
      { type: 'application/json' }
    );
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `call-capture-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="cap">
      <div className="cap-bar">
        <label>
          Assistant
          {assistants.length > 0 ? (
            <select value={assistantId} onChange={(e) => setAssistantId(e.target.value)} disabled={status === 'live'}>
              {assistants.map((a) => <option key={a.id} value={a.id}>{a.name} — {a.id.slice(0, 8)}</option>)}
            </select>
          ) : (
            <input
              value={assistantId}
              onChange={(e) => setAssistantId(e.target.value)}
              placeholder="Paste an assistant id"
              disabled={status === 'live'}
            />
          )}
        </label>

        {status !== 'live' ? (
          <button type="button" className="btn" onClick={start} disabled={!assistantId || status === 'starting'}>
            {status === 'starting' ? 'Connecting…' : 'Start call & capture'}
          </button>
        ) : (
          <button type="button" className="cap-stop" onClick={stop}>Stop capture</button>
        )}

        {log.length > 0 && status !== 'live' && (
          <button type="button" className="cap-dl" onClick={download}>Download JSON</button>
        )}
      </div>

      {error && <p className="adm-err">{error}</p>}
      {status === 'live' && (
        <>
          <p className="cap-hint">
            Talk to it. Watch the meter below — if it moves when you speak, your
            microphone is reaching the room. If the agent still does not answer, the
            problem is its speech recognition, not your setup.
          </p>
          <div className="cap-mic">
            <span className="cap-mic-label">Your microphone</span>
            <span className="cap-mic-bar">
              <i style={{ width: `${Math.min(100, (mic?.level || 0) * 220)}%` }} />
            </span>
            <span className={`cap-mic-state${mic?.published ? ' ok' : ''}`}>
              {mic == null ? 'starting…'
                : !mic.published ? 'NOT PUBLISHED'
                : mic.muted ? 'muted'
                : `live · ${(mic.level || 0).toFixed(2)}`}
            </span>
          </div>
        </>
      )}

      {status === 'live' && session && (
        <Room token={session.token} serverUrl={session.wsUrl} connect audio video={false}
              options={{ audioCaptureDefaults: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } }}>
          <RecorderInner push={push} onMicLevel={onMicLevel} />
        </Room>
      )}

      {(status === 'live' || transcript.length > 0) && (
        <section className="cap-convo">
          <h3>Conversation ({transcript.length})</h3>
          {transcript.length === 0 ? (
            <p className="cap-empty">
              Nothing transcribed yet. Agent lines appear as it speaks; your lines
              appear only if the platform sends caller transcripts back into the room.
            </p>
          ) : (
            <div className="cap-turns">
              {transcript.map((t, i) => (
                <div className={`cap-turn ${t.role}`} key={i}>
                  <span className="r">{t.role}</span>
                  <span className="x">{t.text}</span>
                  <span className="s">{(t.at / 1000).toFixed(1)}s</span>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {log.length > 0 && (
        <>
          <div className="cap-summary">
            {[
              ['Duration', summary.durationLabel],
              ['Events', summary.totalEvents],
              ['Final transcripts', summary.finalTranscripts],
              ['Agent turns', summary.agentTurns],
              ['Caller turns', summary.callerTurns],
              ['Agent words', summary.agentWords],
              ['Caller words', summary.callerWords],
              ['Languages', summary.languagesSeen.join(', ') || '—'],
            ].map(([k, v]) => (
              <div key={k}><span>{k}</span><b>{v}</b></div>
            ))}
          </div>

          <div className="cap-cols">
            <section>
              <h3>Event types seen</h3>
              <ul className="cap-types">
                {summary.eventTypes.map((t) => <li key={t}><code>{t}</code></li>)}
              </ul>
              <h3>Agent states</h3>
              <ul className="cap-types">
                {summary.agentStates.map((t) => <li key={t}><code>{t}</code></li>)}
              </ul>
            </section>

            <section>
              <h3>Live log ({log.length})</h3>
              <div className="cap-log">
                {log.slice(-400).map((l, i) => (
                  <div className="cap-line" key={i}>
                    <span className="t">{(l.at / 1000).toFixed(1)}s</span>
                    <span className="e">{l.event}</span>
                    <span className="d">{JSON.stringify(l.data)}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}

export { RoomEvent };
