"""Emit lib/agents.js from the Python catalogue.

agents.py is the single source of truth: it drives both the audio synthesis and
the site. Run this after editing a script, a price, or a persona.
"""
import json, os

from agents import AGENTS
from translations import EN

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.abspath(os.path.join(HERE, "..", "..", "lib", "agents.js"))
TIMINGS = json.load(open(os.path.join(HERE, "timings.json")))


def main():
    out = []
    for a in AGENTS:
        t = TIMINGS[a["id"]]
        turns = [
            {"who": who, "ur": ur, "en": en, "at": at}
            for (who, ur), en, at in zip(a["script"], EN[a["id"]], t["marks"])
        ]
        out.append({
            "id": a["id"],
            "name": a["name"],
            "role": a["role"],
            "vertical": a["vertical"],
            "voice": a["voice"],
            "peerVoice": a["peer_voice"],
            "tagline": a["tagline"],
            "problem": a["problem"],
            "solution": a["solution"],
            "kpis": [{"label": k, "value": v, "note": d} for k, v, d in a["kpis"]],
            "integrations": a["integrations"],
            "pricing": {
                "setup": a["pricing"]["setup"],
                "monthly": a["pricing"]["monthly"],
                "included": a["pricing"]["included"],
                "overage": a["pricing"]["overage"],
            },
            "greeting": a["greeting"],
            "duration": t["total"],
            "call": f"/voice/{a['id']}_call.mp3",
            "greetingAudio": f"/voice/{a['id']}_greeting.mp3",
            "turns": turns,
        })

    body = json.dumps(out, ensure_ascii=False, indent=2)
    with open(OUT, "w") as f:
        f.write(
            "// GENERATED FILE — do not edit by hand.\n"
            "// Source: tools/voice-agents/{agents,translations}.py + timings.json\n"
            "// Regenerate: cd tools/voice-agents && python3 export_js.py\n"
            "//\n"
            "// Each agent carries its full bilingual transcript and the start time of\n"
            "// every turn, measured from the generated audio — that's what lets the\n"
            "// transcript on the site seek and highlight in sync.\n\n"
            f"export const AGENTS = {body};\n\n"
            "export function getAgent(id) {\n"
            "  return AGENTS.find((a) => a.id === id) || null;\n"
            "}\n"
        )
    print(f"wrote {OUT}  ({os.path.getsize(OUT)/1024:.0f} KB, {len(out)} agents)")


if __name__ == "__main__":
    main()
