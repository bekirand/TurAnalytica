import { z } from 'zod/v4';

export const loginSchema = z.object({
    email: z.email('Введите корректный email'),
    password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
});

export const registerSchema = z
    .object({
        name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
        email: z.email('Введите корректный email'),
        password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
    });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
