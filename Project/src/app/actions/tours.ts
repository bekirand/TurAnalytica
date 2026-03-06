'use server';

import { prisma } from '@/lib/prisma';
import { Tour, Prisma } from '@prisma/client';

export type GetToursParams = {
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    hotelStars?: number;
    minDuration?: number;
    maxDuration?: number;
    country?: string;
};

// Fetch filtered tours for the catalog
export async function getTours(params?: GetToursParams) {
    try {
        const where: Prisma.TourWhereInput = { isActive: true };

        if (params?.search) {
            where.OR = [
                { title: { contains: params.search, mode: 'insensitive' } },
                { destination: { contains: params.search, mode: 'insensitive' } },
                { country: { contains: params.search, mode: 'insensitive' } },
                { hotelName: { contains: params.search, mode: 'insensitive' } },
            ];
        }
        if (params?.country) {
            where.country = params.country;
        }
        if (params?.minPrice || params?.maxPrice) {
            where.price = {};
            if (params.minPrice) where.price.gte = params.minPrice;
            if (params.maxPrice) where.price.lte = params.maxPrice;
        }
        if (params?.hotelStars) {
            where.hotelStars = params.hotelStars;
        }
        if (params?.minDuration || params?.maxDuration) {
            where.duration = {};
            if (params.minDuration) where.duration.gte = params.minDuration;
            if (params.maxDuration) where.duration.lte = params.maxDuration;
        }

        const tours = await prisma.tour.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: {
                analysis: true, // Include AI analysis for card scoring
            },
        });

        return tours;
    } catch (error) {
        console.error('Error fetching tours:', error);
        return [];
    }
}

// Fetch detailed information for a single tour
export async function getTourBySlug(slug: string) {
    try {
        const tour = await prisma.tour.findUnique({
            where: { slug },
            include: {
                analysis: true,
            },
        });

        return tour;
    } catch (error) {
        console.error(`Error fetching tour ${slug}:`, error);
        return null;
    }
}

// Fetch top rated tours for the homepage
export async function getFeaturedTours(limit = 4) {
    try {
        return await prisma.tour.findMany({
            where: { isActive: true },
            take: limit,
            include: {
                analysis: true,
            },
            // Sort by creation date or analysis presence
            orderBy: { createdAt: 'desc' },
        });
    } catch (error) {
        console.error('Error fetching featured tours:', error);
        return [];
    }
}
