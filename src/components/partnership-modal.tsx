'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Send } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { partnershipSchema, type PartnershipFormData } from '@/lib/validations';

interface PartnershipModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PartnershipModal({ open, onOpenChange }: PartnershipModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PartnershipFormData>({
    resolver: zodResolver(partnershipSchema),
  });

  const onSubmit = async (data: PartnershipFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/partnership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong');
      }

      // Enhanced success message with more details
      toast({
        title: '✅ Inquiry Submitted Successfully!',
        description: `Thank you, ${data.name}! We've received your partnership inquiry from ${data.organization}. Our team will review your message and respond within 48 hours. Check your email for confirmation.`,
        duration: 8000,
      });

      reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Unable to Submit Inquiry',
        description: error instanceof Error ? error.message : 'Failed to submit inquiry. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Partnership Inquiry</DialogTitle>
          <DialogDescription className="text-base">
            Interested in partnering with us? Fill out the form below and we'll get back to you
            within 48 hours to discuss opportunities.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="partner-name">
              Your Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="partner-name"
              placeholder="John Doe"
              {...register('name')}
              disabled={isSubmitting}
              className="h-12"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="partner-email">
              Email Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="partner-email"
              type="email"
              placeholder="you@company.com"
              {...register('email')}
              disabled={isSubmitting}
              className="h-12"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization">
              Organization <span className="text-destructive">*</span>
            </Label>
            <Input
              id="organization"
              placeholder="Company or Institution Name"
              {...register('organization')}
              disabled={isSubmitting}
              className="h-12"
            />
            {errors.organization && (
              <p className="text-sm text-destructive">{errors.organization.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">
              Message <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="message"
              placeholder="Tell us about your interest in partnering. What type of collaboration are you looking for?"
              {...register('message')}
              disabled={isSubmitting}
              className="min-h-[120px] resize-y"
            />
            {errors.message && (
              <p className="text-sm text-destructive">{errors.message.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="flex-1 h-12"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-12 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Inquiry
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
