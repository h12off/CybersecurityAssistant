import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: Request) {
  try {
    const { messages, apiKey } = await request.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured', code: 'no_api_key' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: apiKey,
    });

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      });

      return NextResponse.json(completion.choices[0].message);
    } catch (openaiError: any) {
      if (openaiError.code === 'insufficient_quota') {
        return NextResponse.json({
          error: 'API key has exceeded its quota. Please check your billing details or use a different API key.',
          code: 'insufficient_quota'
        }, { status: 429 });
      }

      throw openaiError;
    }
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to process request',
        code: error.code
      },
      { status: 500 }
    );
  }
}
