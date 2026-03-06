import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Plane, Star, Utensils, Check, X, ArrowLeft, Building, Sparkles, Bot } from 'lucide-react';
import { getTourBySlug } from '@/app/actions/tours';
import { Badge } from '@/components/ui/badge';
import { formatPrice, pluralize, formatDateShort } from '@/lib/utils';
import { TourAnalysisView } from '@/components/shared/tour-analysis-view';
import { AnalyzeTourButton } from '@/components/shared/analyze-tour-button';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const tour = await getTourBySlug(resolvedParams.slug);
    if (!tour) return { title: 'Тур не найден' };

    return {
        title: `${tour.hotelName} - ${tour.destination}`,
        description: tour.description,
    };
}

export default async function TourDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const tour = await getTourBySlug(resolvedParams.slug);

    if (!tour) {
        notFound();
    }

    const durationText = pluralize(tour.duration, 'ночь', 'ночи', 'ночей');

    return (
        <div className="max-w-5xl mx-auto pb-20">
            {/* Навигация назад */}
            <Link href="/tours" className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 mb-6 transition-colors font-medium">
                <ArrowLeft className="h-4 w-4" /> Вернуться в каталог
            </Link>

            {/* Hero / Header секция */}
            <div className="grid gap-8 lg:grid-cols-2">
                {/* Фото */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 border border-white/5">
                    {tour.imageUrl ? (
                        <Image
                            src={tour.imageUrl}
                            alt={tour.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center">
                            <Building className="h-16 w-16 text-slate-700" />
                        </div>
                    )}

                    <div className="absolute top-4 left-4 flex gap-2">
                        <Badge variant="default" className="bg-black/60 backdrop-blur-md text-white border-white/10 hover:bg-black/80">
                            {tour.operator}
                        </Badge>
                    </div>
                </div>

                {/* Основная инфа */}
                <div className="flex flex-col">
                    <div className="flex items-center text-sm text-sky-400 mb-2 gap-1.5 font-medium">
                        <MapPin className="h-4 w-4" />
                        <span>{tour.country}, {tour.destination}</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                        {tour.hotelName}
                    </h1>

                    <div className="flex items-center gap-1 mb-6">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 ${i < tour.hotelStars ? 'text-yellow-400 fill-yellow-400' : 'text-slate-700'}`}
                            />
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="flex items-center gap-3 bg-white/5 border border-white/5 p-3 rounded-xl">
                            <Calendar className="h-5 w-5 text-sky-400" />
                            <div>
                                <p className="text-xs text-slate-400">Даты тура</p>
                                <p className="text-sm font-medium">{formatDateShort(tour.departureDate)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 border border-white/5 p-3 rounded-xl">
                            <Plane className="h-5 w-5 text-sky-400" />
                            <div>
                                <p className="text-xs text-slate-400">Длительность</p>
                                <p className="text-sm font-medium">{durationText}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 border border-white/5 p-3 rounded-xl">
                            <Utensils className="h-5 w-5 text-sky-400" />
                            <div>
                                <p className="text-xs text-slate-400">Питание</p>
                                <p className="text-sm font-medium">{tour.mealType}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white/5 border border-white/5 p-3 rounded-xl">
                            <Plane className="h-5 w-5 text-emerald-400" />
                            <div>
                                <p className="text-xs text-slate-400">Вылет из</p>
                                <p className="text-sm font-medium text-emerald-300">{tour.departureCity}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto p-6 bg-gradient-to-br from-sky-950/40 to-[#0B1120] border border-sky-900/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <p className="text-sm text-sky-200/60 mb-1">Итоговая стоимость</p>
                            <div className="text-3xl font-bold text-white">{formatPrice(tour.price)}</div>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-6 py-3 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-200 transition-colors">
                                Бронировать
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Analysis Section */}
            <div className="mt-16 pt-12 border-t border-white/10" id="ai-analysis">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Sparkles className="h-6 w-6 text-sky-400" />
                            Оценка искусственного интеллекта
                        </h2>
                        <p className="text-slate-400 mt-1">Основано на миллионах отзывов и алгоритмах TurAnalytica</p>
                    </div>

                    {!tour.analysis && (
                        <AnalyzeTourButton tourId={tour.id} />
                    )}
                </div>

                {tour.analysis ? (
                    <TourAnalysisView analysis={tour.analysis} />
                ) : (
                    <div className="border border-dashed border-sky-900/50 rounded-2xl p-12 flex flex-col items-center justify-center text-center bg-sky-950/10 backdrop-blur-sm">
                        <div className="h-16 w-16 bg-sky-900/40 rounded-full flex items-center justify-center mb-4">
                            <Bot className="h-8 w-8 text-sky-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">Этот тур еще не был оценен ИИ</h3>
                        <p className="text-slate-400 max-w-md mb-6">
                            Нажмите кнопку выше, чтобы запустить глубокий анализ туристического пакета. ИИ разберет отель, цены, сезонность и выдаст честную оценку.
                        </p>
                        <AnalyzeTourButton tourId={tour.id} />
                    </div>
                )}
            </div>

            {/* Описание и включенные услуги */}
            <div className="grid gap-12 lg:grid-cols-3 mt-16 pt-12 border-t border-white/10">
                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <h3 className="text-xl font-bold text-white mb-4">Об отеле и туре</h3>
                        <div className="prose prose-invert prose-p:leading-relaxed text-slate-300">
                            <p>{tour.description}</p>
                        </div>
                    </section>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0B1120]/50 backdrop-blur-sm border border-emerald-900/30 rounded-2xl p-6">
                        <h4 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-4">В стоимость включено</h4>
                        <ul className="space-y-3">
                            {tour.included.map((item, i) => (
                                <li key={i} className="flex gap-3 text-sm text-slate-300 items-start">
                                    <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-[#0B1120]/50 backdrop-blur-sm border border-red-900/30 rounded-2xl p-6">
                        <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-4">Не включено</h4>
                        <ul className="space-y-3">
                            {tour.excluded.map((item, i) => (
                                <li key={i} className="flex gap-3 text-sm text-slate-300 items-start">
                                    <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
}
