'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    BarChart3,
    GitCompareArrows,
    Shield,
    Zap,
    TrendingUp,
    Search,
    ArrowRight,
    Brain,
    Target,
    Star,
} from 'lucide-react';
import { ScoreRing } from '@/components/ui';

const steps = [
    {
        icon: Search,
        title: 'Выберите тур',
        description: 'Найдите тур в нашем каталоге или добавьте свой вариант',
    },
    {
        icon: Brain,
        title: 'AI-анализ',
        description: 'Наш ИИ оценит тур по 8 критериям: цена, отель, безопасность и другие',
    },
    {
        icon: GitCompareArrows,
        title: 'Сравните',
        description: 'Сопоставьте до 3 туров в удобной таблице с визуализацией',
    },
];

const features = [
    {
        icon: Target,
        title: 'Объективные оценки',
        description: 'Никакого субъективизма — AI анализирует реальные данные по каждому критерию',
        color: 'from-sky-500 to-cyan-400',
    },
    {
        icon: TrendingUp,
        title: 'Глубже, чем отзывы',
        description: '8 критериев оценки вместо одной звёздочки. Детальный разбор каждого аспекта',
        color: 'from-violet-500 to-purple-400',
    },
    {
        icon: Shield,
        title: 'Индекс безопасности',
        description: 'Учитываем безопасность страны, отеля, транспорта и района',
        color: 'from-emerald-500 to-teal-400',
    },
    {
        icon: Zap,
        title: 'Мгновенный результат',
        description: 'Полный анализ тура за секунды, а не часы чтения отзывов',
        color: 'from-orange-500 to-amber-400',
    },
];

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
};

export default function HomePage() {
    return (
        <div className="space-y-24 pb-16">
            {/* Hero */}
            <section className="relative pt-12 sm:pt-20">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -right-1/4 -top-1/4 h-[500px] w-[500px] rounded-full bg-sky-500/10 blur-3xl" />
                    <div className="absolute -bottom-1/4 -left-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-3xl" />
                </div>

                <div className="relative text-center">
                    <motion.div {...fadeInUp}>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-sm text-sky-400">
                            <Star className="h-3.5 w-3.5" />
                            AI-powered анализ туров
                        </span>
                    </motion.div>

                    <motion.h1
                        className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Анализ туров,{' '}
                        <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                            которому можно доверять
                        </span>
                    </motion.h1>

                    <motion.p
                        className="mx-auto mt-6 max-w-2xl text-lg text-slate-400"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Глубокий AI-анализ по 8 критериям. Объективные оценки, детальные обзоры
                        и возможность сравнить туры между собой. Для путешественников и менеджеров турагентств.
                    </motion.p>

                    <motion.div
                        className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Link
                            href="/tours"
                            className="flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white shadow-lg shadow-sky-600/20 transition-all hover:bg-sky-500 hover:shadow-sky-500/30"
                        >
                            Смотреть каталог
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/about"
                            className="flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 font-semibold text-slate-300 transition-all hover:bg-white/5 hover:text-white"
                        >
                            Как это работает
                        </Link>
                    </motion.div>

                    {/* Демо скора */}
                    <motion.div
                        className="mx-auto mt-16 flex max-w-md items-center justify-center gap-8"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <div className="text-center">
                            <ScoreRing score={87} size={100} strokeWidth={8} />
                            <p className="mt-2 text-sm text-slate-500">Турция</p>
                        </div>
                        <div className="text-center">
                            <ScoreRing score={72} size={100} strokeWidth={8} />
                            <p className="mt-2 text-sm text-slate-500">Египет</p>
                        </div>
                        <div className="text-center">
                            <ScoreRing score={94} size={100} strokeWidth={8} />
                            <p className="mt-2 text-sm text-slate-500">Мальдивы</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Как это работает */}
            <section>
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Как это работает</h2>
                    <p className="mt-3 text-slate-400">Три простых шага до идеального тура</p>
                </div>

                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            className="relative rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                        >
                            <div className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-sky-600 text-sm font-bold text-white">
                                {index + 1}
                            </div>
                            <div className="mx-auto mt-2 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10">
                                <step.icon className="h-6 w-6 text-sky-400" />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                            <p className="mt-2 text-sm text-slate-400">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Преимущества */}
            <section>
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Почему TurAnalytica</h2>
                    <p className="mt-3 text-slate-400">Инструмент, которого не хватало рынку</p>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.07]"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${feature.color}`}
                            >
                                <feature.icon className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-400">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="text-center">
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-sky-500/10 to-violet-500/10 p-12 backdrop-blur-sm">
                    <h2 className="text-3xl font-bold">Готовы попробовать?</h2>
                    <p className="mx-auto mt-3 max-w-lg text-slate-400">
                        Изучите каталог туров, получите объективную AI-оценку и сделайте правильный выбор.
                    </p>
                    <Link
                        href="/tours"
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-8 py-3 font-semibold text-white shadow-lg shadow-sky-600/20 transition-all hover:bg-sky-500 hover:shadow-sky-500/30"
                    >
                        Перейти в каталог
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
