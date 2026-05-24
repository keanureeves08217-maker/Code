'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Mail, Download } from 'lucide-react';

interface ResultScreenProps {
  compensationAmount: string;
  applicantEmail: string;
  onReset: () => void;
}

export function ResultScreen({ compensationAmount, applicantEmail, onReset }: ResultScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-2 border-primary/30 bg-card/50 backdrop-blur-sm">
        <div className="p-8 md:p-12">
          {/* Success icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
              <CheckCircle className="w-20 h-20 text-primary relative" />
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-4">
            Application Approved!
          </h1>

          {/* Subtitle */}
          <p className="text-center text-muted-foreground text-lg mb-8">
            Your scam recovery application has been successfully processed.
          </p>

          {/* Compensation amount display */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20 rounded-lg p-8 mb-8">
            <p className="text-center text-muted-foreground text-sm mb-2 uppercase tracking-wide">
              Estimated Compensation Amount
            </p>
            <p className="text-center text-5xl md:text-6xl font-bold text-primary">
              ${compensationAmount}
            </p>
            <p className="text-center text-muted-foreground text-sm mt-4">
              Based on 80% recovery of your reported loss
            </p>
          </div>

          {/* Information box */}
          <div className="bg-secondary/20 border border-secondary/50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">What Happens Next?</h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-primary font-bold">1.</span>
                <span className="text-foreground">A confirmation email has been sent to <strong>{applicantEmail}</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">2.</span>
                <span className="text-foreground">Our team will review all submitted documents and verify your claim</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">3.</span>
                <span className="text-foreground">You&apos;ll receive updates via email about your case status</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">4.</span>
                <span className="text-foreground">Processing typically takes 5-10 business days</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">5.</span>
                <span className="text-foreground">Compensation will be transferred once verification is complete</span>
              </li>
            </ul>
          </div>

          {/* Email notification */}
          <div className="flex items-center gap-3 bg-accent/20 border border-accent/50 rounded-lg p-4 mb-8">
            <Mail className="w-5 h-5 text-accent flex-shrink-0" />
            <p className="text-foreground text-sm">
              Check your email for confirmation and next steps. Check your spam folder if you don&apos;t see it.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={onReset}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              size="lg"
            >
              Submit Another Application
            </Button>
            <Button
              variant="outline"
              className="w-full"
              size="lg"
              onClick={() => {
                const text = `Scam Recovery Application Confirmation\n\nCompensation Amount: $${compensationAmount}\nEmail: ${applicantEmail}\n\nPlease check your email for full details.`;
                const blob = new Blob([text], { type: 'text/plain' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'recovery-confirmation.txt';
                a.click();
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Confirmation
            </Button>
          </div>

          {/* Footer note */}
          <p className="text-center text-muted-foreground text-xs mt-8">
            This confirmation has been sent to your email address on file. Reference numbers will be provided for tracking your application.
          </p>
        </div>
      </Card>
    </div>
  );
}
