import type { Metadata } from 'next';
import { getTours } from '@/app/actions/tours';
import { CompareClient } from '@/components/shared/compare-client';

export const metadata: Metadata = {
    title: 'Сравнение туров',
    description: 'Сравните до 3 туров по всем критериям в удобной таблице.',
};

export default async function ComparePage() {
    const allTours = await getTours();

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Сравнение туров</h1>
                <p className="mt-2 text-slate-400">
                    Добавьте до 3 туров для сравнения по всем AI-критериям
                </p>
            </div>

            <CompareClient allTours={allTours} />
        </div>
    );
}
