import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Initialize the Gemini API with your key
const genAI = new GoogleGenerativeAI('AIzaSyAPSRbpZVkmE68FJ8Jz86MMGxhBZf88kkU');

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Get the model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Convert chat messages to a prompt
    const prompt = messages
      .map(m => `${m.role === 'system' ? 'System: ' : 'User: '}${m.content}`)
      .join('\n');

    try {
      // Generate content
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return NextResponse.json({ content: text });
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      return NextResponse.json(
        { error: 'Failed to generate response from Gemini' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Request Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    );
  }
}
