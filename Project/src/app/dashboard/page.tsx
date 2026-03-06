import type { Metadata } from 'next';
import Link from 'next/link';
import { Heart, GitCompareArrows, BarChart3, ArrowRight, Sparkles, MapPin, Star } from 'lucide-react';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { formatPrice } from '@/lib/utils';
import { Header } from '@/components/shared/header';
import { ScoreRing } from '@/components/ui/score-ring';

export const metadata: Metadata = {
    title: 'Личный кабинет',
};

export default async function DashboardPage() {
    const session = await auth();
    if (!session?.user?.id) {
        redirect('/login');
    }

    // Fetch user statistics
    const [favoritesCount, analysesCount, favorites] = await Promise.all([
        prisma.favorite.count({ where: { userId: session.user.id } }),
        prisma.tourAnalysis.count(),
        prisma.favorite.findMany({
            where: { userId: session.user.id },
            include: { tour: { include: { analysis: true } } },
            take: 6,
            orderBy: { createdAt: 'desc' },
        }),
    ]);

    const stats = [
        { icon: Heart, label: 'В избранном', count: favoritesCount, color: 'text-red-400 bg-red-500/10', href: '#favorites' },
        { icon: BarChart3, label: 'AI-анализов', count: analysesCount, color: 'text-emerald-400 bg-emerald-500/10', href: '/tours' },
        { icon: GitCompareArrows, label: 'Сравнений', count: 0, color: 'text-sky-400 bg-sky-500/10', href: '/compare' },
    ];

    return (
        <>
            <Header />
            <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            Привет, {session.user.name || 'Пользователь'}!
                        </h1>
                        <p className="mt-1 text-slate-400">Ваши туры, сравнения и избранное</p>
                    </div>
                    <Link
                        href="/tours"
                        className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 hover:bg-sky-500 transition-colors"
                    >
                        <Sparkles className="h-4 w-4" />
                        Найти новый тур
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid gap-6 sm:grid-cols-3 mb-12">
                    {stats.map((stat) => (
                        <Link
                            key={stat.label}
                            href={stat.href}
                            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:bg-white/[0.07] hover:border-white/20 transition-all group"
                        >
                            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}>
                                <stat.icon className="h-5 w-5" />
                            </div>
                            <p className="mt-3 text-3xl font-bold">{stat.count}</p>
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-slate-500">{stat.label}</p>
                                <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-sky-400 transition-colors" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Favorites Section */}
                <section id="favorites">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Heart className="h-5 w-5 text-red-400" /> Избранные туры
                        </h2>
                        {favorites.length > 0 && (
                            <Link href="/tours" className="text-sm text-sky-400 hover:text-sky-300 transition-colors">
                                Все туры →
                            </Link>
                        )}
                    </div>

                    {favorites.length > 0 ? (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {favorites.map((fav) => (
                                <Link
                                    key={fav.id}
                                    href={`/tours/${fav.tour.slug}`}
                                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/[0.07] hover:border-white/20 transition-all"
                                >
                                    <div className="relative h-16 w-20 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800">
                                        {fav.tour.imageUrl && (
                                            <img src={fav.tour.imageUrl} alt={fav.tour.title} className="h-full w-full object-cover" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-sky-400 flex items-center gap-1">
                                            <MapPin className="h-3 w-3" /> {fav.tour.country}
                                        </p>
                                        <p className="font-semibold text-sm truncate">{fav.tour.hotelName}</p>
                                        <p className="text-sm font-bold text-white mt-0.5">{formatPrice(fav.tour.price)}</p>
                                    </div>
                                    {fav.tour.analysis && (
                                        <ScoreRing score={fav.tour.analysis.overallScore} size={36} strokeWidth={3} className="text-[10px] flex-shrink-0" />
                                    )}
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-12 text-center">
                            <Heart className="h-10 w-10 text-slate-600 mx-auto mb-3" />
                            <h3 className="text-lg font-semibold text-white mb-2">Пока ничего нет</h3>
                            <p className="text-sm text-slate-400 max-w-sm mx-auto mb-4">
                                Добавляйте туры в избранное, нажимая на иконку ❤️ на карточках в каталоге.
                            </p>
                            <Link
                                href="/tours"
                                className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-500 transition-colors"
                            >
                                Перейти в каталог <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    )}
                </section>
            </main>
        </>
    );
}
