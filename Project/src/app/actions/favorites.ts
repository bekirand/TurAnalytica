'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function toggleFavorite(tourId: string) {
    const session = await auth();
    if (!session?.user?.id) {
        return { success: false, error: 'Необходимо авторизоваться' };
    }

    try {
        const existing = await prisma.favorite.findUnique({
            where: {
                userId_tourId: {
                    userId: session.user.id,
                    tourId,
                },
            },
        });

        if (existing) {
            await prisma.favorite.delete({ where: { id: existing.id } });
            return { success: true, isFavorited: false };
        } else {
            await prisma.favorite.create({
                data: { userId: session.user.id, tourId },
            });
            return { success: true, isFavorited: true };
        }
    } catch (error) {
        console.error('Error toggling favorite:', error);
        return { success: false, error: 'Ошибка при обновлении избранного' };
    }
}

export async function getUserFavorites() {
    const session = await auth();
    if (!session?.user?.id) return [];

    try {
        const favorites = await prisma.favorite.findMany({
            where: { userId: session.user.id },
            include: {
                tour: {
                    include: { analysis: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        return favorites;
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return [];
    }
}

export async function isTourFavorited(tourId: string) {
    const session = await auth();
    if (!session?.user?.id) return false;

    try {
        const fav = await prisma.favorite.findUnique({
            where: {
                userId_tourId: {
                    userId: session.user.id,
                    tourId,
                },
            },
        });
        return !!fav;
    } catch (error) {
        return false;
    }
}
