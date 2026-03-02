import { z } from 'zod';

/**
 * Validation schemas for form data
 */

export const waitlistSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
});

export const partnershipSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  organization: z.string().min(2, 'Organization name is required'),
  message: z.string().min(10, 'Please provide more details (at least 10 characters)'),
});

export type WaitlistFormData = z.infer<typeof waitlistSchema>;
export type PartnershipFormData = z.infer<typeof partnershipSchema>;
