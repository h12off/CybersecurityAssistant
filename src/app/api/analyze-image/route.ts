import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI('AIzaSyAPSRbpZVkmE68FJ8Jz86MMGxhBZf88kkU');

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get('image') as File;

    if (!imageFile) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Convert the image file to bytes
    const imageBytes = await imageFile.arrayBuffer();

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    // Prepare the image part
    const imagePart = {
      inlineData: {
        data: Buffer.from(imageBytes).toString('base64'),
        mimeType: imageFile.type
      }
    };

    // Generate content with the image
    const result = await model.generateContent([
      "You are a cybersecurity expert. Analyze this screenshot or image for potential security issues, vulnerabilities, or suspicious activities. Provide a detailed security assessment.",
      imagePart
    ]);

    const response = await result.response;
    const analysis = response.text();

    return NextResponse.json({ analysis });
  } catch (error: any) {
    console.error('Image Analysis Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to analyze image' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
