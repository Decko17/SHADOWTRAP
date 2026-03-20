import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `You are ShadowTrap Arrangement Engine.

Given beat profile and session data, build a strong song structure.

Return valid JSON only:
{
  "section_order": [
    { "section": "string", "bars": number }
  ],
  "energy_flow": "string",
  "flow_switch_points": ["string"],
  "bridge_advice": "string",
  "outro_strategy": "string"
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
    return NextResponse.json({ error: 'Failed to generate arrangement' }, { status: 500 });
  }
}
