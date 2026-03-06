import { Calendar, MapPin, Plane, Star, Utensils, Info } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScoreRing } from '@/components/ui/score-ring';
import { formatPrice, pluralize, formatDateShort, getScoreLabel, getScoreColor } from '@/lib/utils';
import type { Prisma } from '@prisma/client';

type Analysis = Prisma.TourAnalysisGetPayload<{}>;

export function TourAnalysisView({ analysis }: { analysis: Analysis }) {
    const scores = [
        { label: 'Качество отеля', value: analysis.hotelQuality },
        { label: 'Цена/качество', value: analysis.priceValue },
        { label: 'Расположение', value: analysis.locationScore },
        { label: 'Безопасность', value: analysis.safetyIndex },
        { label: 'Сезонность/Климат', value: analysis.climateMatch },
        { label: 'Транспорт', value: analysis.transportScore },
        { label: 'Питание', value: analysis.mealScore },
        { label: 'Активности', value: analysis.activitiesScore },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Главный скоринг и резюме */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="flex flex-col items-center justify-center p-6 text-center shadow-lg border-sky-900/30 bg-gradient-to-br from-[#0B1120] to-sky-950/20">
                    <ScoreRing score={analysis.overallScore} size={140} strokeWidth={8} className="text-4xl" />
                    <h3 className={`mt-4 text-xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                        {getScoreLabel(analysis.overallScore)}
                    </h3>
                    <p className="mt-2 text-sm text-slate-400">Общая AI-оценка тура</p>
                </Card>

                <Card className="md:col-span-2 shadow-lg bg-[#0B1120]/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <Info className="h-5 w-5 text-sky-400" /> Вердикт эксперта
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-slate-300">
                        <p className="font-medium text-white text-lg leading-relaxed">{analysis.summary}</p>
                        <p className="text-sm bg-sky-950/30 p-4 rounded-lg border border-sky-900/50">
                            <span className="text-sky-400 font-semibold mb-1 block">Рекомендация:</span>
                            {analysis.recommendation}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Детальные оценки по категориями */}
            <Card className="bg-[#0B1120]/50 backdrop-blur-sm shadow-md">
                <CardHeader>
                    <CardTitle>Оценки по параметрам</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-y-6 gap-x-8 sm:grid-cols-4">
                        {scores.map((stat, i) => (
                            <div key={i} className="flex flex-col">
                                <div className="flex justify-between mb-1 items-end">
                                    <span className="text-xs text-slate-400">{stat.label}</span>
                                    <span className={`text-sm font-bold ${getScoreColor(stat.value)}`}>{stat.value}</span>
                                </div>
                                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                    <div
                                        className={`h-1.5 rounded-full ${stat.value >= 80 ? 'bg-emerald-500' :
                                                stat.value >= 60 ? 'bg-yellow-500' :
                                                    stat.value >= 40 ? 'bg-orange-500' : 'bg-red-500'
                                            }`}
                                        style={{ width: `${stat.value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Плюсы и минусы */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-emerald-900/30 bg-emerald-950/10 shadow-sm">
                    <CardHeader className="pb-3 border-b border-white/5">
                        <CardTitle className="text-lg text-emerald-400 flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 pb-0.5">+</div>
                            Преимущества
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <ul className="space-y-3">
                            {analysis.pros.map((pro, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                                    <span>{pro}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card className="border-red-900/30 bg-red-950/10 shadow-sm">
                    <CardHeader className="pb-3 border-b border-white/5">
                        <CardTitle className="text-lg text-red-400 flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 pb-0.5">-</div>
                            Недостатки
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <ul className="space-y-3">
                            {analysis.cons.map((con, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                                    <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                                    <span>{con}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            {/* Подробный разбор */}
            <Card className="shadow-md bg-[#0B1120]/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Развернутый отзыв</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                        {analysis.detailedReview}
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
