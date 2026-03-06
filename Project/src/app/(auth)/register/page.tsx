'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Lock, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import { registerUser } from '@/app/actions/auth';

export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError('');
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const result = await registerUser(formData);

        if (result.error) {
            setError(result.error);
            setLoading(false);
            return;
        }

        router.push('/login?registered=true');
    }

    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-8 text-center">
                <h1 className="mb-2 text-3xl font-bold text-white">Регистрация</h1>
                <p className="text-sm text-slate-400">
                    Создайте аккаунт для сохранения и сравнения туров
                </p>
            </div>

            {error && (
                <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-300">
                        Имя
                    </label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="Ваше имя"
                            className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-white placeholder:text-slate-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-300">
                        Email
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="your@email.com"
                            className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-white placeholder:text-slate-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-300">
                        Пароль
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            minLength={6}
                            placeholder="Минимум 6 символов"
                            className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-white placeholder:text-slate-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-slate-300">
                        Подтверждение пароля
                    </label>
                    <div className="relative">
                        <CheckCircle className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            placeholder="Повторите пароль"
                            className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-white placeholder:text-slate-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 py-2.5 font-medium text-white transition-colors hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                        <>
                            <UserPlus className="h-4 w-4" />
                            Создать аккаунт
                        </>
                    )}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
                Уже есть аккаунт?{' '}
                <Link href="/login" className="text-sky-400 transition-colors hover:text-sky-300">
                    Войти
                </Link>
            </p>
        </div>
    );
}
