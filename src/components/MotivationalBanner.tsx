"use client";

import { useState, useEffect } from 'react';
import { MOTIVATIONAL_QUOTES } from '@/lib/constants';
import { Sparkles } from 'lucide-react';

export function MotivationalBanner() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl">
      <div className="flex items-start gap-3">
        <Sparkles className="w-6 h-6 flex-shrink-0 mt-1" />
        <p className="text-lg font-medium leading-relaxed">
          {quote}
        </p>
      </div>
    </div>
  );
}
