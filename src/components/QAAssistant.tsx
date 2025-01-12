'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

// Dynamically import icons to prevent hydration mismatch
const MessageCircle = dynamic(() => import('lucide-react').then(mod => mod.MessageCircle), {
  ssr: false,
  loading: () => <Loader2 className="h-6 w-6 animate-spin" />
});

const Send = dynamic(() => import('lucide-react').then(mod => mod.Send), {
  ssr: false,
  loading: () => <Loader2 className="h-4 w-4 animate-spin" />
});

const AlertTriangle = dynamic(() => import('lucide-react').then(mod => mod.AlertTriangle), {
  ssr: false,
  loading: () => <Loader2 className="h-4 w-4 animate-spin" />
});

const RefreshCcw = dynamic(() => import('lucide-react').then(mod => mod.RefreshCcw), {
  ssr: false,
  loading: () => <Loader2 className="h-4 w-4 animate-spin" />
});

const DEFAULT_OPENAI_KEY = process.env.OPENAI_API_KEY;

export default function QAAssistant() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiKey, setApiKey] = useState(DEFAULT_OPENAI_KEY);
  const [isConfigured, setIsConfigured] = useState(!!DEFAULT_OPENAI_KEY);

  const configureAPI = (key: string) => {
    if (key && (key.startsWith('sk-') || key.startsWith('sk-proj-'))) {
      setApiKey(key);
      setIsConfigured(true);
      return true;
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    if (!isConfigured) {
      setError('Please configure the OpenAI API key first');
      return;
    }

    setLoading(true);
    setError('');
    setResponse('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are a cybersecurity expert assistant. Provide detailed, technical, and accurate responses focused exclusively on cybersecurity topics.',
            },
            {
              role: 'user',
              content: question,
            },
          ],
          apiKey,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        if (error.code === 'insufficient_quota') {
          throw new Error('The API key has exceeded its quota. Please check your billing details or configure a different API key.');
        }
        throw new Error(error.error || 'Failed to get response');
      }

      const data = await res.json();
      setResponse(data.content);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching the response');
      if (err.message?.includes('quota')) {
        setIsConfigured(false);
        setApiKey('');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleConfigure = () => {
    const key = prompt('Enter your OpenAI API key (starts with sk- or sk-proj-):');
    if (key) {
      if (!configureAPI(key)) {
        setError('Invalid API key format. It should start with "sk-" or "sk-proj-"');
      } else {
        setError('');
      }
    }
  };

  return (
    <Card className="w-full shadow-lg border border-green-500 bg-black/80">
      <CardHeader className="border-b border-green-500/30">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-green-400">Cybersecurity Assistant</h2>
            </div>
            <p className="text-sm text-green-600">Created by Salma Ait Nassir</p>
          </div>
          <button
            onClick={handleConfigure}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-black/50 text-green-400 rounded-lg hover:bg-green-500/20 border border-green-500/50"
          >
            <RefreshCcw className="w-4 h-4" />
            Configure API
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isConfigured && (
            <Alert variant="destructive" className="mb-4 bg-red-900/50 border-red-500 text-red-300">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Please configure your OpenAI API key to continue
              </AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask any cybersecurity-related question..."
                className="w-full min-h-[100px] p-3 border rounded-lg resize-y bg-black/50 border-green-500/50 text-green-400 placeholder-green-700 focus:border-green-400 focus:ring-1 focus:ring-green-400"
                disabled={loading || !isConfigured}
              />
              <button
                type="submit"
                disabled={!question.trim() || loading || !isConfigured}
                className="absolute bottom-3 right-3 p-2 bg-green-500/20 text-green-400 rounded-full hover:bg-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed border border-green-500/50"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            {loading && (
              <div className="flex items-center justify-center p-4">
                <RefreshCcw className="w-6 h-6 animate-spin text-green-400" />
              </div>
            )}

            {error && (
              <Alert variant="destructive" className="bg-red-900/50 border-red-500 text-red-300">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {response && (
              <div className="mt-4 p-4 bg-black/50 rounded-lg border border-green-500/30">
                <pre className="whitespace-pre-wrap font-mono text-sm text-green-400">
                  {response}
                </pre>
              </div>
            )}
          </div>
        </form>

        <div className="mt-6 space-y-2">
          <div className="flex items-center gap-2 text-sm text-green-600">
            <AlertTriangle className="w-4 h-4" />
            <p>For cybersecurity queries only. Use responsibly and in accordance with OpenAI's usage policies.</p>
          </div>
          <p className="text-center text-sm text-green-600 pt-2 border-t border-green-500/30">
            2025 Salma Ait Nassir. All rights reserved.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
