'use client';

import { useState } from 'react';
import { Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { analyzeTour } from '@/app/actions/analysis';
import { useRouter } from 'next/navigation';

export function AnalyzeTourButton({ tourId }: { tourId: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function handleAnalyze() {
        setIsLoading(true);
        try {
            const result = await analyzeTour(tourId);
            if (result.success) {
                // Refresh page to load new analysis from DB
                router.refresh();
            } else {
                alert('Ошибка при анализе: ' + result.error);
                setIsLoading(false);
            }
        } catch (err) {
            alert('Проблема с сетью или сервером');
            setIsLoading(false);
        }
    }

    return (
        <Button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="w-full sm:w-auto bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white shadow-lg shadow-sky-500/25 relative overflow-hidden group"
            size="lg"
        >
            <div className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full transition-transform duration-700 -translate-x-full skew-x-12" />

            {isLoading ? (
                <span className="flex items-center gap-2">
                    <Bot className="h-5 w-5 animate-pulse" />
                    Выполняется AI-анализ... (до 15 сек)
                </span>
            ) : (
                <span className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Оценить тур с помощью ИИ
                </span>
            )}
        </Button>
    );
}
