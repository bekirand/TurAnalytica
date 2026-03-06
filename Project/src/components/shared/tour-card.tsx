import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Plane, Star, Utensils } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ScoreRing } from '@/components/ui/score-ring';
import { Badge } from '@/components/ui/badge';
import { FavoriteButton } from '@/components/shared/favorite-button';
import { formatPrice, pluralize, formatDateShort } from '@/lib/utils';
import type { Prisma } from '@prisma/client';

type TourWithAnalysis = Prisma.TourGetPayload<{
    include: { analysis: true };
}>;

interface TourCardProps {
    tour: TourWithAnalysis;
}

export function TourCard({ tour }: TourCardProps) {
    // Calculate basic metrics
    const durationText = pluralize(tour.duration, 'ночь', 'ночи', 'ночей');
    const hasAnalysis = !!tour.analysis;

    return (
        <Card variant="elevated" className="group overflow-hidden flex flex-col h-full">
            <Link href={`/tours/${tour.slug}`} className="relative h-48 w-full block overflow-hidden">
                {tour.imageUrl ? (
                    <Image
                        src={tour.imageUrl}
                        alt={tour.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="h-full w-full bg-slate-800 flex items-center justify-center">
                        <Plane className="h-8 w-8 text-slate-600" />
                    </div>
                )}

                {/* badges on image */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {hasAnalysis && (
                        <Badge variant="excellent" size="sm" className="shadow-lg backdrop-blur-md bg-emerald-500/90">
                            AI Одобрено
                        </Badge>
                    )}
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-2">
                    <FavoriteButton tourId={tour.id} className="opacity-0 group-hover:opacity-100 transition-opacity" />

                    {hasAnalysis && tour.analysis && (
                        <div className="bg-slate-900/80 backdrop-blur-md rounded-full p-1 shadow-lg">
                            <ScoreRing score={tour.analysis.overallScore} size={40} strokeWidth={3} className="text-xs" />
                        </div>
                    )}
                </div>

                {/* Градиент затемнения снизу для текста */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0B1120] to-transparent h-1/2 opacity-60" />
            </Link>

            <CardContent className="flex flex-col flex-1 p-5 gap-4">
                <div>
                    <div className="flex items-center text-xs text-slate-400 mb-1 gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{tour.country}, {tour.destination}</span>
                    </div>
                    <Link href={`/tours/${tour.slug}`} className="hover:text-primary transition-colors">
                        <h3 className="font-bold text-lg leading-tight line-clamp-2" title={tour.hotelName}>
                            {tour.hotelName}
                        </h3>
                    </Link>
                    <div className="flex items-center mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                className={`h-3 w-3 ${i < tour.hotelStars ? 'text-yellow-400 fill-yellow-400' : 'text-slate-700'}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-y-2 gap-x-1 text-xs text-slate-300 mt-auto">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-sky-400" />
                        <span>{formatDateShort(tour.departureDate)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Plane className="h-3.5 w-3.5 text-sky-400" />
                        <span>{durationText}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Utensils className="h-3.5 w-3.5 text-sky-400" />
                        <span>{tour.mealType}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-medium bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                            {tour.operator}
                        </span>
                    </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-end justify-between mt-2">
                    <div>
                        <p className="text-xs text-slate-400 mb-0.5">Цена за тур</p>
                        <p className="text-xl font-bold text-white">{formatPrice(tour.price)}</p>
                    </div>
                    <Link
                        href={`/tours/${tour.slug}`}
                        className="text-sm font-medium text-sky-400 hover:text-sky-300 transition-colors"
                    >
                        Подробнее →
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
