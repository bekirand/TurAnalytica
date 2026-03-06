import type { Metadata } from 'next';
import {
    BarChart3,
    Brain,
    Code2,
    Database,
    Github,
    Layers,
    Palette,
    Shield,
} from 'lucide-react';

export const metadata: Metadata = {
    title: 'О проекте',
    description: 'TurAnalytica — портфолио-проект для демонстрации навыков fullstack-разработки.',
};

const stack = [
    { icon: Layers, name: 'Next.js 15', description: 'App Router, Server Actions, RSC' },
    { icon: Code2, name: 'TypeScript', description: 'Строгая типизация' },
    { icon: Database, name: 'PostgreSQL', description: 'Supabase + Prisma ORM' },
    { icon: Shield, name: 'Auth.js v5', description: 'Аутентификация и авторизация' },
    { icon: Brain, name: 'OpenAI API', description: 'AI-анализ и скоринг туров' },
    { icon: Palette, name: 'Tailwind CSS', description: 'Стилизация + Framer Motion' },
];

export default function AboutPage() {
    return (
        <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400">
                    <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold">О проекте TurAnalytica</h1>
                <p className="mt-3 text-slate-400">
                    Портфолио-проект, демонстрирующий навыки fullstack-разработки
                </p>
            </div>

            {/* Описание */}
            <section className="mb-12 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <h2 className="mb-3 text-xl font-semibold">Что это?</h2>
                <p className="leading-relaxed text-slate-400">
                    <strong className="text-white">TurAnalytica</strong> — это веб-платформа для глубокого
                    AI-анализа и сравнения туров за границу. Система оценивает каждый тур по 8 критериям
                    (цена/качество, отель, безопасность, климат, транспорт и другие), генерирует детальный
                    обзор и позволяет сравнивать туры между собой.
                </p>
                <p className="mt-3 leading-relaxed text-slate-400">
                    Проект полезен как обычным путешественникам, ищущим объективную оценку, так и менеджерам
                    турагентств для быстрого анализа предложений.
                </p>
            </section>

            {/* Стек */}
            <section className="mb-12">
                <h2 className="mb-6 text-xl font-semibold">Технологический стек</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    {stack.map((tech) => (
                        <div
                            key={tech.name}
                            className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-500/10">
                                <tech.icon className="h-5 w-5 text-sky-400" />
                            </div>
                            <div>
                                <h3 className="font-medium">{tech.name}</h3>
                                <p className="text-sm text-slate-500">{tech.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Ссылка на GitHub */}
            <section className="text-center">
                <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 font-medium text-slate-300 transition-all hover:bg-white/5 hover:text-white"
                >
                    <Github className="h-5 w-5" />
                    Посмотреть код на GitHub
                </a>
            </section>
        </div>
    );
}
