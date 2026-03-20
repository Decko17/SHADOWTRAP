export function beatProfilePrompt(data: any) {
  return `You are ShadowTrap, a rap songwriting assistant.

Given beat metadata:
Title: ${data.title}
Mood: ${data.mood}
BPM: ${data.bpm || 'unknown'}
Key: ${data.key || 'unknown'}
Inspiration: ${data.inspiration || 'none'}
Lyrics: ${data.lyrics || 'none'}

Return valid JSON only:
{
  "atmosphere": "string",
  "energy_curve": "string",
  "vocal_lanes": ["string"],
  "structure": [{ "section": "string", "bars": number }],
  "mistakes": ["string"]
}`;
}
