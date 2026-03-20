import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `You are ShadowTrap Chorus Forge.

Given beat profile and session data, suggest 3 strong chorus directions.

Return valid JSON only:
{
  "choruses": [
    {
      "hook_type": "string",
      "emotional_tone": "string",
      "repetition_strategy": "string",
      "energy_level": "string",
      "starter_phrases": ["string"]
    }
  ]
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
    return NextResponse.json({ error: 'Failed to generate chorus ideas' }, { status: 500 });
  }
}
