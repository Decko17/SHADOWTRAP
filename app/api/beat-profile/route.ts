import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
import { beatProfilePrompt } from '@/lib/prompts';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await openai.responses.create({
      model: 'gpt-5-mini',
      input: beatProfilePrompt(body),
    });

    const text = response.output_text;
    const parsed = JSON.parse(text);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate beat profile' }, { status: 500 });
  }
}
