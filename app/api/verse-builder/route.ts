import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `You are ShadowTrap Verse Builder.

Improve the user's verse so it fits the beat and flow.

Return valid JSON only:
{
  "improved_versions": ["string"],
  "pause_marked_version": "string",
  "syllable_notes": ["string"],
  "section_advice": "string",
  "next_line": "string"
}`;

    const response = await openai.responses.create({
      model: 'gpt-5-mini',
      input: prompt + JSON.stringify(body),
    });

    const text = response.output_text;
    const parsed = JSON.parse(text);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to build verse' }, { status: 500 });
  }
}
