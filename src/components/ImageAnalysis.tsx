'use client';

import React, { useState } from 'react';
import { Upload, AlertTriangle, RefreshCcw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ClientOnly } from './client-wrapper';

export default function ImageAnalysis() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image size must be less than 5MB');
        return;
      }
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setError('');
    setAnalysis('');

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to analyze image');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (err: any) {
      setError(err.message || 'An error occurred while analyzing the image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border border-green-500/30 rounded-lg bg-black/50">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-green-400">Security Image Analysis</h3>
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          <div className="flex items-center gap-2 px-3 py-1.5 text-sm bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 border border-green-500/50">
            <ClientOnly>
              <Upload className="w-4 h-4" />
            </ClientOnly>
            Upload Image
          </div>
        </label>
      </div>

      {previewUrl && (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Preview"
            className="max-h-64 rounded-lg object-contain mx-auto border border-green-500/30"
          />
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-2 w-full px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed border border-green-500/50"
          >
            {loading ? (
              <ClientOnly>
                <RefreshCcw className="w-4 h-4 animate-spin mx-auto" />
              </ClientOnly>
            ) : (
              'Analyze Security Issues'
            )}
          </button>
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="bg-red-900/50 border-red-500 text-red-300">
          <ClientOnly>
            <AlertTriangle className="h-4 w-4" />
          </ClientOnly>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {analysis && (
        <div className="mt-4 p-4 bg-black/50 rounded-lg border border-green-500/30">
          <pre className="whitespace-pre-wrap font-mono text-sm text-green-400">
            {analysis}
          </pre>
        </div>
      )}
    </div>
  );
}
