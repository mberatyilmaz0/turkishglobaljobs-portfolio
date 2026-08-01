import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('invalidEmail'),
  password: z.string().min(1, 'requiredField'),
});

export const registerSchema = z
  .object({
    firstName: z.string().min(1, 'requiredField'),
    lastName: z.string().min(1, 'requiredField'),
    email: z.string().email('invalidEmail'),
    password: z.string().min(6, 'passwordTooShort'),
    confirmPassword: z.string().min(1, 'requiredField'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'passwordMismatch',
    path: ['confirmPassword'],
  });

export const profileSchema = z.object({
  firstName: z.string().min(1, 'requiredField'),
  lastName: z.string().min(1, 'requiredField'),
  phone: z.string().optional(),
});

export const experienceSchema = z.object({
  company: z.string().min(1, 'requiredField'),
  position: z.string().min(1, 'requiredField'),
  startDate: z.string().min(1, 'requiredField'),
  endDate: z.string().optional(),
  description: z.string().optional(),
  current: z.boolean().default(false),
});

export const educationSchema = z.object({
  institution: z.string().min(1, 'requiredField'),
  degree: z.string().min(1, 'requiredField'),
  field: z.string().optional(),
  startDate: z.string().min(1, 'requiredField'),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
});

export const jobSchema = z.object({
  title: z.string().min(1, 'requiredField'),
  titleDe: z.string().min(1, 'requiredField'),
  sector: z.string().min(1, 'requiredField'),
  location: z.string().min(1, 'requiredField'),
  type: z.string().min(1, 'requiredField'),
  description: z.string().min(1, 'requiredField'),
  descriptionDe: z.string().min(1, 'requiredField'),
  shortDesc: z.string().min(1, 'requiredField'),
  shortDescDe: z.string().min(1, 'requiredField'),
  isActive: z.boolean().default(true),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type ExperienceInput = z.infer<typeof experienceSchema>;
export type EducationInput = z.infer<typeof educationSchema>;
export type JobInput = z.infer<typeof jobSchema>;
