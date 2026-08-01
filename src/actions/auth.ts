'use server';

import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signIn, signOut } from '@/lib/auth';
import { registerSchema } from '@/lib/validations';

export async function registerUser(formData: FormData) {
  const rawData = {
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  };

  const validation = registerSchema.safeParse(rawData);

  if (!validation.success) {
    return { error: validation.error.issues[0]?.message || 'Validation error' };
  }

  const { firstName, lastName, email, password } = validation.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: 'emailExists' };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });

  return { success: true };
}

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    return { success: true };
  } catch {
    return { error: 'invalidCredentials' };
  }
}

export async function logoutUser() {
  await signOut({ redirect: false });
}
