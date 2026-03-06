'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart3,
    GitCompareArrows,
    Info,
    LogIn,
    LogOut,
    Menu,
    Plus,
    User,
    X,
    LayoutDashboard,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
    { href: '/tours', label: 'Каталог', icon: BarChart3 },
    { href: '/compare', label: 'Сравнение', icon: GitCompareArrows },
    { href: '/about', label: 'О проекте', icon: Info },
];

export function Header() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0F172A]/80 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Логотип */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-cyan-400">
                        <BarChart3 className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-lg font-bold text-white">
                        Tur<span className="text-sky-400">Analytica</span>
                    </span>
                </Link>

                {/* Десктоп-навигация */}
                <nav className="hidden items-center gap-1 md:flex">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-white/10 text-white'
                                        : 'text-slate-400 hover:bg-white/5 hover:text-white',
                                )}
                            >
                                <link.icon className="h-4 w-4" />
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Auth-секция */}
                <div className="hidden items-center gap-3 md:flex">
                    <Link
                        href="/tours/add"
                        className="flex items-center gap-1.5 rounded-lg border border-sky-500/30 bg-sky-500/10 px-3 py-2 text-sm font-medium text-sky-400 transition-colors hover:bg-sky-500/20"
                    >
                        <Plus className="h-4 w-4" />
                        Добавить тур
                    </Link>
                    {session?.user ? (
                        <>
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                            >
                                <LayoutDashboard className="h-4 w-4" />
                                Кабинет
                            </Link>
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-sm font-medium text-white">
                                    {session.user.name?.[0]?.toUpperCase() || <User className="h-4 w-4" />}
                                </div>
                                <button
                                    onClick={() => signOut()}
                                    className="text-slate-400 transition-colors hover:text-red-400"
                                    title="Выйти"
                                >
                                    <LogOut className="h-4 w-4" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="flex items-center gap-1.5 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-500"
                        >
                            <LogIn className="h-4 w-4" />
                            Войти
                        </Link>
                    )}
                </div>

                {/* Мобильный бургер */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="text-slate-400 md:hidden"
                >
                    {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Мобильное меню */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-white/5 md:hidden"
                    >
                        <nav className="space-y-1 px-4 py-3">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={cn(
                                            'flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                                            isActive
                                                ? 'bg-white/10 text-white'
                                                : 'text-slate-400 hover:bg-white/5 hover:text-white',
                                        )}
                                    >
                                        <link.icon className="h-4 w-4" />
                                        {link.label}
                                    </Link>
                                );
                            })}
                            <div className="border-t border-white/5 pt-2">
                                <Link
                                    href="/tours/add"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-sky-400 hover:bg-white/5"
                                >
                                    <Plus className="h-4 w-4" />
                                    Добавить тур
                                </Link>
                                {session?.user ? (
                                    <>
                                        <Link
                                            href="/dashboard"
                                            onClick={() => setMobileOpen(false)}
                                            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white"
                                        >
                                            <LayoutDashboard className="h-4 w-4" />
                                            Кабинет
                                        </Link>
                                        <button
                                            onClick={() => {
                                                signOut();
                                                setMobileOpen(false);
                                            }}
                                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Выйти
                                        </button>
                                    </>
                                ) : (
                                    <Link
                                        href="/login"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-sky-400 hover:bg-sky-500/10"
                                    >
                                        <LogIn className="h-4 w-4" />
                                        Войти
                                    </Link>
                                )}
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
