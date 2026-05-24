'use client';

import { useState, useEffect } from 'react';

interface ProcessingLoaderProps {
  onLoadingComplete: () => void;
}

export function ProcessingLoader({ onLoadingComplete }: ProcessingLoaderProps) {
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (timeRemaining <= 0) {
      onLoadingComplete();
      return;
    }

    const interval = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining, onLoadingComplete]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const percentage = ((300 - timeRemaining) / 300) * 100;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-md flex items-center justify-center z-50">
      <div className="text-center">
        {/* Circular progress animation */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-muted"
            />
            {/* Animated progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${282.7 * (percentage / 100)} 282.7`}
              className="text-primary transition-all duration-1000"
              strokeLinecap="round"
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {percentage.toFixed(0)}%
              </div>
            </div>
          </div>
        </div>

        {/* Status text */}
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Processing Your Application
        </h2>
        <p className="text-muted-foreground mb-6">
          We&apos;re verifying your information and calculating your compensation.
        </p>

        {/* Timer */}
        <div className="text-lg font-semibold text-accent">
          Time remaining: {minutes}:{seconds.toString().padStart(2, '0')}
        </div>

        {/* Loading dots animation */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>

        {/* Progress message */}
        <p className="text-sm text-muted-foreground mt-8 max-w-md">
          Please don&apos;t close this window. Your application is being processed securely.
        </p>
      </div>
    </div>
  );
}
