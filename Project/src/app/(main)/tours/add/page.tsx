import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { AddTourForm } from '@/components/shared/add-tour-form';

export const metadata: Metadata = {
    title: 'Добавить тур',
    description: 'Добавьте новый тур для AI-анализа и сравнения.',
};

export default function AddTourPage() {
    return (
        <div className="max-w-3xl mx-auto pb-20">
            <Link href="/tours" className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 mb-6 transition-colors font-medium">
                <ArrowLeft className="h-4 w-4" /> Назад в каталог
            </Link>

            <div className="mb-10">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Sparkles className="h-8 w-8 text-sky-400" />
                    Добавить тур для анализа
                </h1>
                <p className="mt-3 text-slate-400 max-w-xl">
                    Заполните данные тура, которые вы нашли на сайте туроператора. После сохранения вы сможете запустить AI-анализ по 8 критериям.
                </p>
            </div>

            <AddTourForm />
        </div>
    );
}
