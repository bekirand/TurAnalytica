import type { Metadata } from 'next';
import Link from 'next/link';
import { Search, SlidersHorizontal, AlertCircle, Plus } from 'lucide-react';
import { TourCardSkeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { TourCard } from '@/components/shared/tour-card';
import { getTours } from '@/app/actions/tours';

export const metadata: Metadata = {
    title: 'Каталог туров',
    description: 'Просмотрите каталог туров за границу с AI-оценками и детальным анализом.',
};

export default async function ToursPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedParams = await searchParams;
    const search = typeof resolvedParams.search === 'string' ? resolvedParams.search : undefined;

    // Fetch tours from the server
    const tours = await getTours({ search });

    return (
        <div>
            {/* Заголовок и кнопка добавления */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Каталог туров</h1>
                    <p className="mt-2 text-slate-400">
                        Выберите тур для AI-анализа или добавьте свой
                    </p>
                </div>
                <Link
                    href="/tours/add"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 hover:bg-sky-500 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Добавить тур
                </Link>
            </div>

            {/* Фильтры */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative max-w-md flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Поиск по стране, отелю или городу..."
                        defaultValue={search}
                        name="search"
                        /* Note: Future implementation for debounced onChange handler */
                        className="w-full rounded-lg border border-white/10 bg-[#0B1120] py-2.5 pl-10 pr-4 text-white placeholder:text-slate-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                </div>
                <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#0B1120] px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors">
                    <SlidersHorizontal className="h-4 w-4" />
                    Фильтры
                </button>
            </div>

            {/* Сетка карточек */}
            {tours.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {tours.map((tour) => (
                        <TourCard key={tour.id} tour={tour} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/5 py-24 text-center">
                    <AlertCircle className="mb-4 h-12 w-12 text-slate-500" />
                    <h3 className="text-xl font-bold text-white">Туры не найдены</h3>
                    <p className="mt-2 max-w-sm text-slate-400">
                        В базе данных пока нет туров или они не подходят под ваши фильтры.
                    </p>
                    <a href="/api/admin/seed" className="mt-6">
                        <Button variant="outline">Заполнить тестовыми данными</Button>
                    </a>
                </div>
            )}
        </div>
    );
}
