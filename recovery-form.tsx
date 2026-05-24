'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ImageUpload } from './image-upload';
import { ProcessingLoader } from './processing-loader';
import { ResultScreen } from './result-screen';
import { AlertCircle, Shield, DollarSign } from 'lucide-react';

// Validation schema
const recoveryFormSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  country: z.string().min(2, 'Please select a country'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  emailAddress: z.string().email('Invalid email address'),
  scammerUsername: z.string().min(1, 'Scammer username is required'),
  totalAmount: z.string().min(1, 'Total amount is required'),
  paymentDate: z.string().min(1, 'Payment date is required'),
});

type RecoveryFormValues = z.infer<typeof recoveryFormSchema>;

interface FormState {
  status: 'form' | 'loading' | 'success' | 'error';
  compensationAmount?: string;
  errorMessage?: string;
}

export function RecoveryForm() {
  const [formState, setFormState] = useState<FormState>({ status: 'form' });
  const [proofOfPayment, setProofOfPayment] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RecoveryFormValues>({
    resolver: zodResolver(recoveryFormSchema),
  });

  const onSubmit = async (data: RecoveryFormValues) => {
    if (!proofOfPayment) {
      alert('Please upload proof of payment image');
      return;
    }

    setFormState({ status: 'loading' });

    try {
      const response = await fetch('/api/submit-recovery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          proofOfPaymentBase64: proofOfPayment,
          fileName: fileName,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setFormState({
          status: 'error',
          errorMessage: result.error || 'Failed to submit application',
        });
        return;
      }

      setFormState({
        status: 'success',
        compensationAmount: result.compensationAmount,
      });
    } catch (error) {
      console.error('[v0] Form submission error:', error);
      setFormState({
        status: 'error',
        errorMessage: 'An error occurred. Please try again.',
      });
    }
  };

  const handleReset = () => {
    setFormState({ status: 'form' });
    setProofOfPayment('');
    setFileName('');
    reset();
  };

  if (formState.status === 'loading') {
    return (
      <ProcessingLoader
        onLoadingComplete={() => {
          // After loading completes, show success screen
          if (formState.compensationAmount) {
            setFormState((prev) => ({
              ...prev,
              status: 'success',
            }));
          }
        }}
      />
    );
  }

  if (formState.status === 'success' && formState.compensationAmount) {
    return (
      <ResultScreen
        compensationAmount={formState.compensationAmount}
        applicantEmail={''} // Will be populated from form
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Scam Recovery
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            File your claim and receive up to 80% compensation for your loss. 
            Our secure process ensures your information is protected.
          </p>
        </div>

        {/* Error message */}
        {formState.status === 'error' && (
          <Card className="mb-6 border-destructive bg-destructive/10 p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
              <p className="text-destructive text-sm">{formState.errorMessage}</p>
            </div>
          </Card>
        )}

        {/* Main form card */}
        <Card className="border-2 border-primary/30 bg-card/50 backdrop-blur-sm overflow-hidden">
          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Form title */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Recovery Application Form
                </h2>
                <p className="text-muted-foreground">
                  Complete all fields below with accurate information about your scam loss.
                </p>
              </div>

              {/* Personal Information Section */}
              <div className="space-y-4 pb-6 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">
                  Personal Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <Input
                      {...register('fullName')}
                      placeholder="Enter your full name"
                      className="bg-input text-foreground border-border"
                    />
                    {errors.fullName && (
                      <p className="text-destructive text-sm mt-1">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Country *
                    </label>
                    <Input
                      {...register('country')}
                      placeholder="Enter your country"
                      className="bg-input text-foreground border-border"
                    />
                    {errors.country && (
                      <p className="text-destructive text-sm mt-1">{errors.country.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number *
                    </label>
                    <Input
                      {...register('phoneNumber')}
                      placeholder="Enter your phone number"
                      className="bg-input text-foreground border-border"
                    />
                    {errors.phoneNumber && (
                      <p className="text-destructive text-sm mt-1">{errors.phoneNumber.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      {...register('emailAddress')}
                      type="email"
                      placeholder="Enter your email"
                      className="bg-input text-foreground border-border"
                    />
                    {errors.emailAddress && (
                      <p className="text-destructive text-sm mt-1">{errors.emailAddress.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Scam Information Section */}
              <div className="space-y-4 pb-6 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">
                  Scam Information
                </h3>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Scammer&apos;s Username *
                  </label>
                  <Input
                    {...register('scammerUsername')}
                    placeholder="Enter the username or ID of the scammer"
                    className="bg-input text-foreground border-border"
                  />
                  {errors.scammerUsername && (
                    <p className="text-destructive text-sm mt-1">{errors.scammerUsername.message}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Total Amount Lost *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        {...register('totalAmount')}
                        placeholder="0.00"
                        type="number"
                        step="0.01"
                        className="pl-8 bg-input text-foreground border-border"
                      />
                    </div>
                    {errors.totalAmount && (
                      <p className="text-destructive text-sm mt-1">{errors.totalAmount.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Payment Date *
                    </label>
                    <Input
                      {...register('paymentDate')}
                      type="date"
                      className="bg-input text-foreground border-border"
                    />
                    {errors.paymentDate && (
                      <p className="text-destructive text-sm mt-1">{errors.paymentDate.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Proof of Payment Section */}
              <div className="space-y-4 pb-6">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    Proof of Payment
                  </h3>
                  <span className="text-destructive">*</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Upload a clear photo or screenshot showing the payment transaction (receipt, screenshot, bank confirmation, etc.)
                </p>
                <ImageUpload
                  onImageSelect={(base64) => {
                    setProofOfPayment(base64);
                    setFileName(`proof_${Date.now()}.jpg`);
                  }}
                  preview={proofOfPayment ? proofOfPayment.substring(0, 100) === 'data:image' ? proofOfPayment : undefined : undefined}
                  onRemove={() => {
                    setProofOfPayment('');
                    setFileName('');
                  }}
                />
              </div>

              {/* Info box */}
              <div className="bg-accent/20 border border-accent/50 rounded-lg p-4">
                <p className="text-foreground text-sm">
                  <strong>Compensation calculated:</strong> You will receive 80% of your reported loss. 
                  Our team will verify your claim and process the compensation within 5-10 business days.
                </p>
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                disabled={isSubmitting || !proofOfPayment}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-lg font-semibold"
                size="lg"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>

              {/* Footer text */}
              <p className="text-center text-muted-foreground text-xs">
                By submitting this form, you confirm that all information provided is accurate and truthful. 
                False information may result in claim denial and legal action.
              </p>
            </form>
          </div>
        </Card>

        {/* Trust indicators */}
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          <Card className="bg-card/30 border-border text-center p-6">
            <div className="text-primary text-2xl font-bold mb-2">100%</div>
            <p className="text-muted-foreground text-sm">Information Secure</p>
          </Card>
          <Card className="bg-card/30 border-border text-center p-6">
            <div className="text-primary text-2xl font-bold mb-2">5-10</div>
            <p className="text-muted-foreground text-sm">Days Processing</p>
          </Card>
          <Card className="bg-card/30 border-border text-center p-6">
            <div className="text-primary text-2xl font-bold mb-2">80%</div>
            <p className="text-muted-foreground text-sm">Compensation Rate</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
