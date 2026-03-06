import { PrismaClient, MealType, TransportType } from '@prisma/client';
import { generateSlug } from '../src/lib/utils';

const prisma = new PrismaClient();

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
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080',
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
            'https://images.unsplash.com/photo-1506540590326-6b2fe160db12?q=80&w=2070',
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
            'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070',
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
            'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2039',
        ],
        description: 'Тихий и уютный отель на пляже Ката. Отличный вариант для семейного отдыха вдали от шума Патонга.',
        departureDate: new Date(new Date().setMonth(new Date().getMonth() + 1, new Date().getDate() + 14)),
        returnDate: new Date(new Date().setMonth(new Date().getMonth() + 1, new Date().getDate() + 26)),
        included: ['Перелет чартером', 'Трансфер', 'Проживание', 'Завтраки', 'Медицинская страховка'],
        excluded: ['Личные расходы', 'Обеды и ужины'],
    },
];

async function main() {
    console.log('Seeding database with initial tours...');

    // Очистка старых данных (опционально)
    await prisma.tourAnalysis.deleteMany();
    await prisma.tour.deleteMany();

    for (const tourData of tours) {
        const slug = generateSlug(tourData.title + '-' + Math.floor(Math.random() * 1000));

        await prisma.tour.create({
            data: {
                ...tourData,
                slug,
            },
        });
        console.log(`Created tour: ${tourData.title}`);
    }

    console.log('Seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error('Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
