'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { toggleFavorite } from '@/app/actions/favorites';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
    tourId: string;
    initialFavorited?: boolean;
    className?: string;
}

export function FavoriteButton({ tourId, initialFavorited = false, className }: FavoriteButtonProps) {
    const [isFavorited, setIsFavorited] = useState(initialFavorited);
    const [isLoading, setIsLoading] = useState(false);

    async function handleToggle() {
        setIsLoading(true);
        try {
            const result = await toggleFavorite(tourId);
            if (result.success) {
                setIsFavorited(result.isFavorited ?? false);
            }
        } catch {
            // Ignore
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <button
            onClick={handleToggle}
            disabled={isLoading}
            className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/60 backdrop-blur-sm border border-white/10 transition-all hover:bg-slate-900/80 hover:scale-110 active:scale-95 disabled:opacity-50',
                className,
            )}
            title={isFavorited ? 'Убрать из избранного' : 'Добавить в избранное'}
        >
            <Heart
                className={cn(
                    'h-4 w-4 transition-colors',
                    isFavorited ? 'fill-red-500 text-red-500' : 'text-white',
                )}
            />
        </button>
    );
}
