'use client';

import { useState, useEffect, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GitCompareArrows, Plus, X, Star, Sparkles, MapPin, Calendar, Utensils, Plane, Trophy, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScoreRing } from '@/components/ui/score-ring';
import { formatPrice, pluralize, formatDateShort, getScoreColor, getScoreLabel } from '@/lib/utils';
import { getTours } from '@/app/actions/tours';
import { analyzeTour } from '@/app/actions/analysis';
import type { Prisma } from '@prisma/client';

type TourWithAnalysis = Prisma.TourGetPayload<{
    include: { analysis: true };
}>;

interface CompareClientProps {
    allTours: TourWithAnalysis[];
}

const SCORE_LABELS: { key: string; label: string }[] = [
    { key: 'overallScore', label: 'Общая оценка' },
    { key: 'priceValue', label: 'Цена / Качество' },
    { key: 'hotelQuality', label: 'Качество отеля' },
    { key: 'locationScore', label: 'Расположение' },
    { key: 'safetyIndex', label: 'Безопасность' },
    { key: 'climateMatch', label: 'Климат / Сезон' },
    { key: 'transportScore', label: 'Транспорт' },
    { key: 'mealScore', label: 'Питание' },
    { key: 'activitiesScore', label: 'Активности' },
];

export function CompareClient({ allTours }: CompareClientProps) {
    const [selectedTours, setSelectedTours] = useState<TourWithAnalysis[]>([]);
    const [showPicker, setShowPicker] = useState(false);
    const [pickerSlot, setPickerSlot] = useState(0);

    function openPicker(slotIndex: number) {
        setPickerSlot(slotIndex);
        setShowPicker(true);
    }

    function selectTour(tour: TourWithAnalysis) {
        setSelectedTours((prev) => {
            const updated = [...prev];
            updated[pickerSlot] = tour;
            return updated;
        });
        setShowPicker(false);
    }

    function removeTour(index: number) {
        setSelectedTours((prev) => prev.filter((_, i) => i !== index));
    }

    const availableTours = allTours.filter(
        (t) => !selectedTours.some((s) => s.id === t.id)
    );

    const allHaveAnalysis = selectedTours.length >= 2 && selectedTours.every((t) => t.analysis);

    // Determine category winner based on max score
    function getBestIndex(key: string): number | null {
        if (selectedTours.length < 2) return null;
        let bestIdx = -1;
        let bestVal = -1;
        selectedTours.forEach((t, i) => {
            const val = (t.analysis as any)?.[key] ?? 0;
            if (val > bestVal) {
                bestVal = val;
                bestIdx = i;
            }
        });
        return bestIdx;
    }

    return (
        <div>
            {/* Tour Slots */}
            <div className="grid gap-6 sm:grid-cols-3 mb-12">
                {[0, 1, 2].map((slotIndex) => {
                    const tour = selectedTours[slotIndex];
                    if (tour) {
                        return (
                            <div
                                key={slotIndex}
                                className="relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur-sm group"
                            >
                                <button
                                    onClick={() => removeTour(slotIndex)}
                                    className="absolute top-3 right-3 z-10 h-8 w-8 flex items-center justify-center rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                                <div className="relative h-40 w-full">
                                    {tour.imageUrl ? (
                                        <Image src={tour.imageUrl} alt={tour.title} fill className="object-cover" sizes="33vw" />
                                    ) : (
                                        <div className="h-full w-full bg-slate-800" />
                                    )}
                                    {tour.analysis && (
                                        <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md rounded-full p-1">
                                            <ScoreRing score={tour.analysis.overallScore} size={44} strokeWidth={3} className="text-xs" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <p className="text-xs text-sky-400 flex items-center gap-1 mb-1">
                                        <MapPin className="h-3 w-3" /> {tour.country}, {tour.destination}
                                    </p>
                                    <h3 className="font-semibold text-sm line-clamp-1">{tour.hotelName}</h3>
                                    <div className="flex items-center mt-1 gap-0.5">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} className={`h-3 w-3 ${i < tour.hotelStars ? 'text-yellow-400 fill-yellow-400' : 'text-slate-700'}`} />
                                        ))}
                                    </div>
                                    <p className="text-lg font-bold mt-2">{formatPrice(tour.price)}</p>
                                    {!tour.analysis && (
                                        <p className="text-xs text-orange-400 mt-1 flex items-center gap-1">
                                            <AlertTriangle className="h-3 w-3" /> Нет AI-анализа
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    }

                    return (
                        <button
                            key={slotIndex}
                            onClick={() => openPicker(slotIndex)}
                            className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-sky-500/30 hover:bg-sky-500/5"
                        >
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
                                {slotIndex === 0 ? (
                                    <GitCompareArrows className="h-7 w-7 text-slate-500" />
                                ) : (
                                    <Plus className="h-7 w-7 text-slate-500" />
                                )}
                            </div>
                            <p className="mt-3 text-sm text-slate-500 font-medium">
                                {slotIndex === 0 ? 'Добавьте первый тур' : `Добавить тур ${slotIndex + 1}`}
                            </p>
                        </button>
                    );
                })}
            </div>

            {/* Comparison Table */}
            {selectedTours.length >= 2 && allHaveAnalysis && (
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                    <div className="p-6 border-b border-white/10">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-sky-400" /> Сравнительный анализ
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="text-left p-4 text-slate-400 font-medium w-[180px]">Критерий</th>
                                    {selectedTours.map((t, i) => (
                                        <th key={i} className="p-4 text-center font-semibold text-white">
                                            {t.hotelName}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Основная инфо */}
                                <tr className="border-b border-white/5">
                                    <td className="p-4 text-slate-400">Цена</td>
                                    {selectedTours.map((t, i) => (
                                        <td key={i} className="p-4 text-center font-bold text-lg">{formatPrice(t.price)}</td>
                                    ))}
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="p-4 text-slate-400">Длительность</td>
                                    {selectedTours.map((t, i) => (
                                        <td key={i} className="p-4 text-center">{pluralize(t.duration, 'ночь', 'ночи', 'ночей')}</td>
                                    ))}
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="p-4 text-slate-400">Питание</td>
                                    {selectedTours.map((t, i) => (
                                        <td key={i} className="p-4 text-center">{t.mealType}</td>
                                    ))}
                                </tr>
                                <tr className="border-b border-white/10 bg-white/[0.02]">
                                    <td className="p-4 text-slate-300 font-semibold" colSpan={selectedTours.length + 1}>
                                        AI-Оценки
                                    </td>
                                </tr>

                                {/* AI Score rows */}
                                {SCORE_LABELS.map((item) => {
                                    const bestIdx = getBestIndex(item.key);
                                    return (
                                        <tr key={item.key} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                            <td className="p-4 text-slate-400">{item.label}</td>
                                            {selectedTours.map((t, i) => {
                                                const value = (t.analysis as any)?.[item.key] ?? 0;
                                                const isBest = bestIdx === i;
                                                return (
                                                    <td key={i} className="p-4 text-center">
                                                        <span className={`font-bold text-lg ${getScoreColor(value)} ${isBest ? 'relative' : ''}`}>
                                                            {value}
                                                            {isBest && (
                                                                <Trophy className="h-3 w-3 text-yellow-400 inline ml-1 -mt-1" />
                                                            )}
                                                        </span>
                                                        <div className="w-16 mx-auto mt-1 bg-slate-800 rounded-full h-1 overflow-hidden">
                                                            <div
                                                                className={`h-1 rounded-full ${value >= 80 ? 'bg-emerald-500' :
                                                                    value >= 60 ? 'bg-yellow-500' :
                                                                        value >= 40 ? 'bg-orange-500' : 'bg-red-500'
                                                                    }`}
                                                                style={{ width: `${value}%` }}
                                                            />
                                                        </div>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Summary */}
                    <div className="p-6 border-t border-white/10">
                        <h3 className="font-bold text-white mb-3">Резюме ИИ</h3>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {selectedTours.map((t, i) => (
                                <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5">
                                    <p className="font-semibold text-sm mb-2 text-sky-400">{t.hotelName}</p>
                                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-4">
                                        {t.analysis?.summary}
                                    </p>
                                    <Link href={`/tours/${t.slug}`} className="text-xs text-sky-400 hover:text-sky-300 mt-2 inline-block">
                                        Подробнее →
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {selectedTours.length >= 2 && !allHaveAnalysis && (
                <div className="rounded-2xl border border-dashed border-orange-500/30 bg-orange-500/5 p-8 text-center">
                    <AlertTriangle className="h-10 w-10 text-orange-400 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-white mb-2">Не все туры проанализированы</h3>
                    <p className="text-sm text-slate-400 max-w-md mx-auto">
                        Перейдите на страницу каждого тура и запустите AI-анализ, чтобы увидеть сравнительную таблицу.
                    </p>
                </div>
            )}

            {/* Tour Picker Modal */}
            {showPicker && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => setShowPicker(false)}>
                    <div className="bg-[#0B1120] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[70vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0B1120] z-10">
                            <h3 className="text-lg font-bold">Выберите тур для сравнения</h3>
                            <button onClick={() => setShowPicker(false)} className="text-slate-400 hover:text-white">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="p-4 space-y-2">
                            {availableTours.length === 0 && (
                                <p className="text-center text-slate-500 py-8">Все доступные туры уже выбраны</p>
                            )}
                            {availableTours.map((tour) => (
                                <button
                                    key={tour.id}
                                    onClick={() => selectTour(tour)}
                                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-sky-500/30 transition-all text-left"
                                >
                                    <div className="relative h-16 w-24 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800">
                                        {tour.imageUrl && (
                                            <Image src={tour.imageUrl} alt={tour.title} fill className="object-cover" sizes="96px" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-sky-400 mb-0.5">{tour.country}, {tour.destination}</p>
                                        <p className="font-semibold text-sm truncate">{tour.hotelName}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-sm font-bold">{formatPrice(tour.price)}</span>
                                            <span className="text-xs text-slate-500">• {pluralize(tour.duration, 'ночь', 'ночи', 'ночей')}</span>
                                        </div>
                                    </div>
                                    {tour.analysis && (
                                        <ScoreRing score={tour.analysis.overallScore} size={40} strokeWidth={3} className="text-xs flex-shrink-0" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
