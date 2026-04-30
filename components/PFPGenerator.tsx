'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Download, Sparkles } from 'lucide-react';

const EXAMPLE_PROMPTS = [
  "launching a memecoin with SOL raining",
  "collecting 50x more fees 🔥",
  "printing SOL for creators and referrers",
  "mooning with rocket ship",
  "wearing sunglasses and gold chain",
  "celebrating on a yacht",
];

const BASE_CHICK_URL = "https://i.imgur.com/dDD7Jfn.jpeg"; // ← REPLACE THIS

export function PFPGenerator() {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setImages([]);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (data.images) setImages(data.images);
    } catch (e) {
      console.error(e);
      alert('Something went wrong — check console');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 shadow-2xl bg-white">
      <div className="space-y-6">
        {/* Base chick preview */}
        <div className="flex justify-center">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">YOUR BASE HATCHICK (reference)</p>
            <img 
              src={BASE_CHICK_URL} 
              alt="Base Hatch Chick" 
              className="w-48 h-48 object-contain rounded-3xl border-4 border-yellow-400 shadow-xl mx-auto"
            />
          </div>
        </div>

        <Textarea
          placeholder="Describe your Hatch Chick PFP... (e.g. wearing sunglasses and gold chain)"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[110px] text-lg"
        />

        <div className="flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.map((ex) => (
            <Button
              key={ex}
              variant="outline"
              size="sm"
              onClick={() => setPrompt(ex)}
            >
              {ex}
            </Button>
          ))}
        </div>

        <Button
          onClick={generate}
          disabled={loading || !BASE_CHICK_URL.includes('imgur')}
          size="lg"
          className="w-full text-xl h-14 bg-yellow-500 hover:bg-yellow-600"
        >
          {loading ? (
            <>Generating consistent Hatchick PFPs <Sparkles className="ml-2 animate-spin" /></>
          ) : (
            <>Generate 4 PFPs 🐥</>
          )}
        </Button>

        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {images.map((url, i) => (
              <div key={i} className="relative group">
                <img
                  src={url}
                  alt={`Hatch PFP ${i}`}
                  className="w-full aspect-square object-cover rounded-3xl border-4 border-yellow-400 shadow-xl"
                />
                <Button
                  size="sm"
                  className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all"
                  onClick={() => window.open(url, '_blank')}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
