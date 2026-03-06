'use server';

import { prisma } from '@/lib/prisma';
import { generateSlug } from '@/lib/utils';

interface CreateTourInput {
    hotelName: string;
    country: string;
    destination: string;
    departureCity: string;
    hotelStars: number;
    price: number;
    duration: number;
    mealType: 'RO' | 'BB' | 'HB' | 'FB' | 'AI' | 'UAI';
    transport: 'FLIGHT' | 'BUS' | 'TRAIN' | 'SELF';
    operator: string;
    departureDate: string;
    returnDate: string;
    description?: string;
}

export async function createTour(input: CreateTourInput) {
    try {
        const slug = generateSlug(input.hotelName + '-' + Math.floor(Math.random() * 10000));

        const tour = await prisma.tour.create({
            data: {
                title: `${input.hotelName} — ${input.destination}`,
                slug,
                hotelName: input.hotelName,
                country: input.country,
                destination: input.destination,
                departureCity: input.departureCity,
                hotelStars: input.hotelStars,
                price: input.price,
                duration: input.duration,
                mealType: input.mealType,
                transport: input.transport,
                operator: input.operator,
                departureDate: new Date(input.departureDate),
                returnDate: new Date(input.returnDate),
                description: input.description || `Тур в ${input.country}, ${input.destination}. Отель ${input.hotelName} ${input.hotelStars}★. Питание: ${input.mealType}. Оператор: ${input.operator}.`,
                imageUrl: null,
                images: [],
                included: [],
                excluded: [],
            },
        });

        return { success: true, slug: tour.slug };
    } catch (error) {
        console.error('Error creating tour:', error);
        return { success: false, error: 'Не удалось сохранить тур' };
    }
}
