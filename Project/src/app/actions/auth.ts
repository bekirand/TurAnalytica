'use server';

import { prisma } from '@/lib/prisma';
import { registerSchema } from '@/lib/validations';
import bcrypt from 'bcryptjs';

export async function registerUser(formData: FormData) {
    const rawData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirmPassword') as string,
    };

    const validated = registerSchema.safeParse(rawData);

    if (!validated.success) {
        return { error: validated.error.issues[0].message };
    }

    const { name, email, password } = validated.data;

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return { error: 'Пользователь с таким email уже существует' };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    return { success: true };
}
