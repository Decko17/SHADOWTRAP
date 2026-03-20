import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `You are ShadowTrap Flow Lab.

Given beat profile and session data, suggest 3 rap flow styles.

Return valid JSON only:
{
  "flows": [
    {
      "name": "string",
      "cadence": "string",
      "syllables_per_phrase": "string",
      "pause_behavior": "string",
      "stress_pattern": "string",
      "example_line": "string"
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
    return NextResponse.json({ error: 'Failed to generate flows' }, { status: 500 });
  }
}
