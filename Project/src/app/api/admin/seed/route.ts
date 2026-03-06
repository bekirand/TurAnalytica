import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { MealType, TransportType } from '@prisma/client';
import { generateSlug } from '@/lib/utils';

const tours = [
    {
        title: 'Rixos Premium Belek',
        destination: 'Белек',
        country: 'Турция',
        departureCity: 'Москва',
        price: 350000,
        currency: 'RUB',
        duration: 7,
        hotelName: 'Rixos Premium Belek',
        hotelStars: 5,
        mealType: MealType.UAI,
        transport: TransportType.FLIGHT,
        operator: 'Coral Travel',
        imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070',
        images: [
            'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070',
        ],
        description: 'Премиальный отдых в одном из лучших отелей Турции. Огромная территория, аквапарк, рестораны a-la carte и высочайший уровень сервиса.',
        departureDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        returnDate: new Date(new Date().setMonth(new Date().getMonth() + 1, new Date().getDate() + 7)),
        included: ['Перелет', 'Трансфер', 'Проживание', 'Питание UAI', 'Страховка'],
        excluded: ['Экскурсии', 'Личные расходы', 'Виза (если требуется)'],
    },
    {
        title: 'Rixos Sharm El Sheikh',
        destination: 'Шарм-эль-Шейх',
        country: 'Египет',
        departureCity: 'Москва',
        price: 280000,
        currency: 'RUB',
        duration: 10,
        hotelName: 'Rixos Sharm El Sheikh - Adults Only',
        hotelStars: 5,
        mealType: MealType.UAI,
        transport: TransportType.FLIGHT,
        operator: 'Anex Tour',
        imageUrl: 'https://images.unsplash.com/photo-1605537963385-2a2b37dc1dff?q=80&w=2072',
        images: [
            'https://images.unsplash.com/photo-1605537963385-2a2b37dc1dff?q=80&w=2072',
        ],
        description: 'Отель только для взрослых с шикарным домашним рифом и концепцией Ультра Всё Включено. Идеально для романтического отдыха.',
        departureDate: new Date(new Date().setMonth(new Date().getMonth() + 1, new Date().getDate() + 5)),
        returnDate: new Date(new Date().setMonth(new Date().getMonth() + 1, new Date().getDate() + 15)),
        included: ['Перелет', 'Индивидуальный трансфер', 'Проживание', 'Питание UAI', 'Страховка'],
        excluded: ['Дайвинг', 'Личные расходы', 'Виза ($25)'],
    },
    {
        title: 'Kuramathi Maldives',
        destination: 'Атолл Расду',
        country: 'Мальдивы',
        departureCity: 'Москва',
        price: 650000,
        currency: 'RUB',
        duration: 9,
        hotelName: 'Kuramathi Island Resort',
        hotelStars: 4,
        mealType: MealType.FB,
        transport: TransportType.FLIGHT,
        operator: 'Tez Tour',
        imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2065',
        images: [
            'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2065',
        ],
        description: 'Один из самых больших островов на Мальдивах. Идеальное сочетание цены и качества, зеленая территория и потрясающая песчаная коса.',
        departureDate: new Date(new Date().setMonth(new Date().getMonth() + 2)),
        returnDate: new Date(new Date().setMonth(new Date().getMonth() + 2, new Date().getDate() + 9)),
        included: ['Перелет регулярным рейсом', 'Трансфер на гидросамолете', 'Проживание (Beach Villa)', 'Питание FB+', 'Страховка'],
        excluded: ['Green Tax', 'Экскурсии'],
    },
    {
        title: 'Alpina Phuket',
        destination: 'Пхукет',
        country: 'Таиланд',
        departureCity: 'Новосибирск',
        price: 210000,
        currency: 'RUB',
        duration: 12,
        hotelName: 'Alpina Phuket Nalina Resort & Spa',
        hotelStars: 4,
        mealType: MealType.BB,
        transport: TransportType.FLIGHT,
        operator: 'Pegas Touristik',
        imageUrl: 'https://images.unsplash.com/photo-1589394815804-964ce0133ce0?q=80&w=2070',
        images: [
            'https://images.unsplash.com/photo-1589394815804-964ce0133ce0?q=80&w=2070',
        ],
        description: 'Тихий и уютный отель на пляже Ката. Отличный вариант для семейного отдыха вдали от шума Патонга.',
        departureDate: new Date(new Date().setMonth(new Date().getMonth() + 1, new Date().getDate() + 14)),
        returnDate: new Date(new Date().setMonth(new Date().getMonth() + 1, new Date().getDate() + 26)),
        included: ['Перелет чартером', 'Трансфер', 'Проживание', 'Завтраки', 'Медицинская страховка'],
        excluded: ['Личные расходы', 'Обеды и ужины'],
    },
];

export async function GET() {
    try {
        // Clean old data
        await prisma.tourAnalysis.deleteMany();
        await prisma.tour.deleteMany();

        const createdTours = [];

        for (const tourData of tours) {
            const slug = generateSlug(tourData.title + '-' + Math.floor(Math.random() * 1000));

            const tour = await prisma.tour.create({
                data: {
                    ...tourData,
                    slug,
                },
            });
            createdTours.push(tour);
        }

        return NextResponse.json({
            success: true,
            message: `Successfully seeded ${createdTours.length} tours`,
            data: createdTours
        });
    } catch (error) {
        console.error('Seeding error:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to seed database'
        }, { status: 500 });
    }
}
