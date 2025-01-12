'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MessageCircle, Send, AlertTriangle, RefreshCcw } from 'lucide-react';
import { ClientOnly } from './client-wrapper';

export default function QAAssistant() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

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
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to get response');
      }

      const data = await res.json();
      setResponse(data.content);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching the response');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-lg border border-green-500 bg-black/80">
      <CardHeader className="border-b border-green-500/30">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <ClientOnly>
                <img src="/logo.svg" alt="Cybersecurity Assistant Logo" className="w-8 h-8" />
              </ClientOnly>
              <h2 className="text-2xl font-bold text-green-400">Cybersecurity Assistant</h2>
            </div>
            <p className="text-sm text-green-600">Created by Salma Ait Nassir</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask any cybersecurity-related question..."
                className="w-full min-h-[100px] p-3 border rounded-lg resize-y bg-black/50 border-green-500/50 text-green-400 placeholder-green-700 focus:border-green-400 focus:ring-1 focus:ring-green-400"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!question.trim() || loading}
                className="absolute bottom-3 right-3 p-2 bg-green-500/20 text-green-400 rounded-full hover:bg-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed border border-green-500/50"
                aria-label="Send message"
              >
                <ClientOnly>
                  <Send className="w-4 h-4" />
                </ClientOnly>
              </button>
            </div>

            {loading && (
              <div className="flex items-center justify-center p-4">
                <ClientOnly>
                  <RefreshCcw className="w-6 h-6 animate-spin text-green-400" />
                </ClientOnly>
              </div>
            )}

            {error && (
              <Alert variant="destructive" className="bg-red-900/50 border-red-500 text-red-300">
                <ClientOnly>
                  <AlertTriangle className="h-4 w-4" />
                </ClientOnly>
                <ClientOnly>
                  <AlertDescription>{error}</AlertDescription>
                </ClientOnly>
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
            <ClientOnly>
              <AlertTriangle className="w-4 h-4" />
            </ClientOnly>
            <p>For cybersecurity queries only. Use responsibly and in accordance with Google's AI usage policies.</p>
          </div>
          <p className="text-center text-sm text-green-600 pt-2 border-t border-green-500/30">
            2025 Salma Ait Nassir. All rights reserved.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
