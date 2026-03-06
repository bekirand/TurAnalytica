'use server';

import { prisma } from '@/lib/prisma';
import { openai } from '@/lib/openai';
import { Tour } from '@prisma/client';

export async function analyzeTour(tourId: string) {
    try {
        const tour = await prisma.tour.findUnique({
            where: { id: tourId },
            include: { analysis: true },
        });

        if (!tour) {
            throw new Error('Tour not found');
        }

        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('sk-...')) {
            throw new Error('OPENAI_API_KEY is not configured');
        }

        // Return existing analysis if available
        if (tour.analysis) {
            return { success: true, analysis: tour.analysis };
        }

        // Prepare tour data for the AI prompt
        const tourDataString = `
    Курорт: ${tour.country}, ${tour.destination} (Вылет из: ${tour.departureCity})
    Отель: ${tour.hotelName} (${tour.hotelStars} звезд)
    Питание: ${tour.mealType}
    Транспорт: ${tour.transport}
    Продолжительность: ${tour.duration} ночей
    Даты: ${tour.departureDate.toLocaleDateString('ru-RU')} - ${tour.returnDate.toLocaleDateString('ru-RU')}
    Цена: ${tour.price} ${tour.currency}
    Оператор: ${tour.operator}
    Включено: ${tour.included.join(', ')}
    Не включено: ${tour.excluded.join(', ')}
    Описание: ${tour.description}
    `;

        // Request structured JSON response from OpenAI
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: `Ты — элитный, абсолютно независимый и бескомпромиссный travel-эксперт. Оцени этот пакетный тур максимально объективно.
Твоя задача — найти скрытые изъяны и реальные достоинства. Оценивай тур в диапазоне от 0 до 100 по КАЖДОМУ критерию.
Инструкции по оценке (СТРОГО СОБЛЮДАТЬ):
1. **Не привязывайся к звёздам**. Бюджетная "тройка" за смешные деньги с отличным расположением может получить 85+, а "пятерка" с плохим сервисом за оверпрайс — 40.
2. Цена/Качество (priceValue) — самый важный параметр. Учитывай типичные рыночные цены на эти даты.
3. Климат (climateMatch) — жёстко штрафуй за несезон (например, Таиланд в сентябре или Турция в январе для пляжного отдыха).
4. Транспорт (transportScore) — перелёт регулярным рейсом лучше чартера. Автобус на дальние расстояния — огромный минус.
5. OverallScore — это НЕ среднее арифметическое, а твоя экспертная взвешенная оценка целесообразности покупки.
БУДЬ КРИТИЧЕН! Идеальных туров на 95-100 почти не бывает. Средний хороший тур — это 75-85.
Ответь строго в формате JSON без markdown-обёрток, со следующими полями:
{
  "overallScore": 0-100, // общий рейтинг (число)
  "priceValue": 0-100, // показатель цена/качество (число)
  "hotelQuality": 0-100, // качество отеля для заявленных звезд (число)
  "locationScore": 0-100, // привлекательность курорта (число)
  "safetyIndex": 0-100, // безопасность и инфраструктура (число)
  "climateMatch": 0-100, // соответствие сезону для дат поездки (число)
  "transportScore": 0-100, // удобство рейса/трансфера (число)
  "mealScore": 0-100, // питание (число)
  "activitiesScore": 0-100, // экскурсии и развлечения в регионе (число)
  "summary": "Краткое резюме тура в 2-3 предложениях",
  "pros": ["Плюс 1", "Плюс 2", "Плюс 3"], // минимум 3
  "cons": ["Минус 1", "Минус 2"], // хотя бы 1 минус (будь объективен)
  "recommendation": "Кому идеально подойдет",
  "detailedReview": "Детальный, экспертный отзыв-разбор на 2-3 абзаца"
}`
                },
                {
                    role: 'user',
                    content: tourDataString,
                },
            ],
            response_format: { type: 'json_object' },
            temperature: 0.7,
        });

        const aiContent = completion.choices[0].message.content;
        if (!aiContent) throw new Error('Empty response from OpenAI');

        const parsedData = JSON.parse(aiContent);

        // Save analysis results to the database
        const analysis = await prisma.tourAnalysis.create({
            data: {
                tourId: tour.id,
                overallScore: parsedData.overallScore,
                priceValue: parsedData.priceValue,
                hotelQuality: parsedData.hotelQuality,
                locationScore: parsedData.locationScore,
                safetyIndex: parsedData.safetyIndex,
                climateMatch: parsedData.climateMatch,
                transportScore: parsedData.transportScore,
                mealScore: parsedData.mealScore,
                activitiesScore: parsedData.activitiesScore,
                summary: parsedData.summary,
                pros: parsedData.pros,
                cons: parsedData.cons,
                recommendation: parsedData.recommendation,
                detailedReview: parsedData.detailedReview,
            },
        });

        return { success: true, analysis };
    } catch (error) {
        console.error('Error analyzing tour:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown analysis error'
        };
    }
}
