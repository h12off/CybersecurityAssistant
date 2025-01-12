# Cybersecurity Assistant

A Next.js-based chatbot application that provides expert cybersecurity assistance, created by Salma Ait Nassir.

## Features

- Modern, responsive UI with a hacker-style theme
- Real-time chat interface
- Secure API key management
- Expert cybersecurity responses powered by OpenAI

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/h12off/h12off-Cybersecurity-Assistant-Created-by-Salma-Ait-Nassir.git
cd h12off-Cybersecurity-Assistant-Created-by-Salma-Ait-Nassir
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Add your OpenAI API key to the `.env` file:
```
OPENAI_API_KEY=your-api-key-here
```

5. Run the development server:
```bash
npm run dev
```

## Deployment on Vercel

1. Fork this repository
2. Create a new project on Vercel
3. Connect your forked repository
4. Add the following environment variable in your Vercel project settings:
   - Name: `OPENAI_API_KEY`
   - Value: Your OpenAI API key
5. Deploy!

## Security Notes

- Never commit your `.env` file
- Always use environment variables for sensitive data
- The OpenAI API key should be kept secure and not shared

## License

 2025 Salma Ait Nassir. All rights reserved.
