"""Generate Urdu voice samples for every agent via Uplift AI Orator."""
import json, os, subprocess, sys
from concurrent.futures import ThreadPoolExecutor

import requests

from agents import AGENTS

API_KEY = os.environ.get("UPLIFT_API_KEY", "").strip()
if not API_KEY:
    sys.exit("Set UPLIFT_API_KEY in the environment before running.")

URL = "https://api.upliftai.org/v1/synthesis/text-to-speech"
HERE = os.path.dirname(os.path.abspath(__file__))
# Finished clips are served straight from the Next.js public directory.
OUT = os.path.abspath(os.path.join(HERE, "..", "..", "public", "voice"))
# Per-line clips are an intermediate cache — kept so a rerun only synthesises
# the lines that actually changed, but never committed.
RAW = os.path.join(HERE, ".cache")
FMT = "MP3_22050_64"
GAP = 0.35  # seconds of silence between turns


def tts(text, voice_id, path):
    if os.path.exists(path) and os.path.getsize(path) > 1000:
        return path
    for attempt in range(3):
        r = requests.post(
            URL,
            headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"},
            json={"voiceId": voice_id, "text": text, "outputFormat": FMT},
            timeout=120,
        )
        if r.status_code == 200 and len(r.content) > 1000:
            with open(path, "wb") as f:
                f.write(r.content)
            print(f"  ok  {os.path.basename(path)}  {len(r.content)/1024:.0f} KB  [{voice_id}]")
            return path
        print(f"  retry {os.path.basename(path)} -> {r.status_code} {r.content[:160]!r}")
    raise RuntimeError(f"TTS failed for {path}")


def make_silence(path):
    if os.path.exists(path):
        return path
    subprocess.run(
        ["ffmpeg", "-y", "-f", "lavfi", "-i", "anullsrc=r=22050:cl=mono",
         "-t", str(GAP), "-b:a", "64k", path],
        check=True, capture_output=True,
    )
    return path


def stitch(parts, silence, out_path):
    listing = out_path + ".txt"
    with open(listing, "w") as f:
        for i, p in enumerate(parts):
            if i:
                f.write(f"file '{silence}'\n")
            f.write(f"file '{p}'\n")
    subprocess.run(
        ["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", listing,
         "-c:a", "libmp3lame", "-b:a", "64k", "-ar", "22050", "-ac", "1", out_path],
        check=True, capture_output=True,
    )
    os.remove(listing)
    return out_path


def duration(path):
    return float(subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=nw=1:nk=1", path],
        capture_output=True, text=True).stdout.strip())


def main():
    os.makedirs(RAW, exist_ok=True)
    os.makedirs(OUT, exist_ok=True)
    silence = make_silence(os.path.join(RAW, "_silence.mp3"))

    jobs = []
    for a in AGENTS:
        jobs.append((a["greeting"], a["voice"], os.path.join(RAW, f"{a['id']}_greeting.mp3")))
        for i, (who, line) in enumerate(a["script"]):
            voice = a["voice"] if who == "agent" else a["peer_voice"]
            jobs.append((line, voice, os.path.join(RAW, f"{a['id']}_{i:02d}_{who}.mp3")))

    print(f"Synthesising {len(jobs)} clips across {len(AGENTS)} agents...")
    with ThreadPoolExecutor(max_workers=3) as pool:
        list(pool.map(lambda j: tts(*j), jobs))

    print("\nStitching conversations...")
    total = 0
    gap = duration(silence)
    timings = {}
    for a in AGENTS:
        parts = [os.path.join(RAW, f"{a['id']}_{i:02d}_{who}.mp3")
                 for i, (who, _) in enumerate(a["script"])]

        # Cumulative start time of every turn, so the transcript on the site can
        # highlight and seek without any alignment model.
        t, marks = 0.0, []
        for p in parts:
            marks.append(round(t, 2))
            t += duration(p) + gap
        timings[a["id"]] = {"marks": marks, "total": round(t - gap, 2)}

        conv = stitch(parts, silence, os.path.join(OUT, f"{a['id']}_call.mp3"))
        greet = os.path.join(OUT, f"{a['id']}_greeting.mp3")
        subprocess.run(["cp", os.path.join(RAW, f"{a['id']}_greeting.mp3"), greet], check=True)
        size = os.path.getsize(conv) + os.path.getsize(greet)
        total += size
        print(f"  {a['id']:22s} call {duration(conv):5.1f}s   {size/1024:6.0f} KB")

    with open(os.path.join(HERE, "timings.json"), "w") as f:
        json.dump(timings, f, indent=1)
    print(f"\nTotal audio: {total/1024/1024:.2f} MB")
    print("Wrote timings.json — now run `python3 export_js.py` to refresh lib/agents.js")


if __name__ == "__main__":
    main()
