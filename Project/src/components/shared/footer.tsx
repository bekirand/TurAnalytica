import Link from 'next/link';
import { BarChart3, Github, Mail } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-white/5 bg-[#0B1120]">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-3">
                    {/* Логотип и описание */}
                    <div>
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-cyan-400">
                                <BarChart3 className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-lg font-bold text-white">
                                Tur<span className="text-sky-400">Analytica</span>
                            </span>
                        </Link>
                        <p className="mt-3 text-sm leading-relaxed text-slate-500">
                            AI-платформа для глубокого анализа и сравнения туров за границу.
                            Объективные оценки, которым можно доверять.
                        </p>
                    </div>

                    {/* Навигация */}
                    <div>
                        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
                            Навигация
                        </h3>
                        <ul className="space-y-2">
                            {[
                                { href: '/tours', label: 'Каталог туров' },
                                { href: '/compare', label: 'Сравнение' },
                                { href: '/about', label: 'О проекте' },
                            ].map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-500 transition-colors hover:text-sky-400"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Контакты */}
                    <div>
                        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
                            Контакты
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-sky-400"
                                >
                                    <Github className="h-4 w-4" />
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:contact@turanalytica.ru"
                                    className="flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-sky-400"
                                >
                                    <Mail className="h-4 w-4" />
                                    contact@turanalytica.ru
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 border-t border-white/5 pt-8 text-center text-sm text-slate-600">
                    © {currentYear} TurAnalytica. Портфолио-проект.
                </div>
            </div>
        </footer>
    );
}
