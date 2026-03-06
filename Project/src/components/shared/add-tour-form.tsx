'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Hotel, MapPin, Plane, Calendar, Utensils, DollarSign, Building2, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createTour } from '@/app/actions/create-tour';

const MEAL_OPTIONS = [
    { value: 'RO', label: 'RO — Без питания' },
    { value: 'BB', label: 'BB — Завтраки' },
    { value: 'HB', label: 'HB — Завтрак + Ужин' },
    { value: 'FB', label: 'FB — Полный пансион' },
    { value: 'AI', label: 'AI — Всё включено' },
    { value: 'UAI', label: 'UAI — Ультра всё включено' },
];

const TRANSPORT_OPTIONS = [
    { value: 'FLIGHT', label: 'Авиаперелёт' },
    { value: 'BUS', label: 'Автобус' },
    { value: 'TRAIN', label: 'Поезд' },
    { value: 'SELF', label: 'Самостоятельно' },
];

export function AddTourForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);

        const result = await createTour({
            hotelName: formData.get('hotelName') as string,
            country: formData.get('country') as string,
            destination: formData.get('destination') as string,
            departureCity: formData.get('departureCity') as string,
            hotelStars: Number(formData.get('hotelStars')),
            price: Number(formData.get('price')),
            duration: Number(formData.get('duration')),
            mealType: formData.get('mealType') as any,
            transport: formData.get('transport') as any,
            operator: formData.get('operator') as string,
            departureDate: formData.get('departureDate') as string,
            returnDate: formData.get('returnDate') as string,
            description: formData.get('description') as string,
        });

        if (result.success && result.slug) {
            router.push(`/tours/${result.slug}`);
        } else {
            setError(result.error || 'Произошла ошибка');
            setIsLoading(false);
        }
    }

    const inputClass = "w-full rounded-xl border border-white/10 bg-[#0B1120] px-4 py-3 text-white placeholder:text-slate-600 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors";
    const labelClass = "block text-sm font-medium text-slate-300 mb-1.5";
    const selectClass = "w-full rounded-xl border border-white/10 bg-[#0B1120] px-4 py-3 text-white focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors appearance-none cursor-pointer";

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-red-400 text-sm">
                    {error}
                </div>
            )}

            {/* Отель */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 space-y-5">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Hotel className="h-5 w-5 text-sky-400" /> Информация об отеле
                </h3>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label className={labelClass}>Название отеля *</label>
                        <input name="hotelName" required placeholder="Rixos Premium Belek" className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Страна *</label>
                        <input name="country" required placeholder="Турция" className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Курорт / Город *</label>
                        <input name="destination" required placeholder="Белек" className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Звёздность отеля *</label>
                        <select name="hotelStars" required defaultValue="5" className={selectClass}>
                            {[1, 2, 3, 4, 5].map((s) => (
                                <option key={s} value={s}>{s} {s === 1 ? 'звезда' : s < 5 ? 'звезды' : 'звёзд'}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>Тип питания *</label>
                        <select name="mealType" required defaultValue="AI" className={selectClass}>
                            {MEAL_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Поездка */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 space-y-5">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Plane className="h-5 w-5 text-sky-400" /> Детали поездки
                </h3>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label className={labelClass}>Город вылета *</label>
                        <input name="departureCity" required placeholder="Москва" className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Транспорт *</label>
                        <select name="transport" required defaultValue="FLIGHT" className={selectClass}>
                            {TRANSPORT_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>Дата вылета *</label>
                        <input name="departureDate" type="date" required className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Дата возврата *</label>
                        <input name="returnDate" type="date" required className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Длительность (ночей) *</label>
                        <input name="duration" type="number" required min="1" max="60" placeholder="7" className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>Туроператор *</label>
                        <input name="operator" required placeholder="Coral Travel" className={inputClass} />
                    </div>
                </div>
            </div>

            {/* Цена */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 space-y-5">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-sky-400" /> Стоимость
                </h3>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label className={labelClass}>Цена за тур (₽) *</label>
                        <input name="price" type="number" required min="1000" placeholder="350000" className={inputClass} />
                    </div>
                </div>
            </div>

            {/* Описание */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 space-y-5">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-sky-400" /> Дополнительно
                </h3>

                <div>
                    <label className={labelClass}>Описание (необязательно)</label>
                    <textarea
                        name="description"
                        rows={4}
                        placeholder="Скопируйте описание тура с сайта оператора или опишите своими словами..."
                        className={`${inputClass} resize-none`}
                    />
                    <p className="mt-1.5 text-xs text-slate-500">
                        Чем подробнее описание, тем точнее будет AI-анализ
                    </p>
                </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isLoading}
                >
                    Отмена
                </Button>
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white shadow-lg shadow-sky-500/25"
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <Clock className="h-4 w-4 animate-spin" /> Сохранение...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <Send className="h-4 w-4" /> Сохранить и перейти к анализу
                        </span>
                    )}
                </Button>
            </div>
        </form>
    );
}
