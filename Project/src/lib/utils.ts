import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Объединение Tailwind-классов с поддержкой условий */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Форматирование цены в рублях */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(price);
}

/** Форматирование даты */
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

/** Короткое форматирование даты (01.03.2026) */
export function formatDateShort(date: Date | string): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
}

/** Склонение слова по числу (1 ночь, 2 ночи, 5 ночей) */
export function pluralize(count: number, one: string, few: string, many: string): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 14) return `${count} ${many}`;
  if (mod10 === 1) return `${count} ${one}`;
  if (mod10 >= 2 && mod10 <= 4) return `${count} ${few}`;
  return `${count} ${many}`;
}

/** Цвет по значению скора (0-100) */
export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-400';
  if (score >= 60) return 'text-yellow-400';
  if (score >= 40) return 'text-orange-400';
  return 'text-red-400';
}

/** Лейбл по значению скора */
export function getScoreLabel(score: number): string {
  if (score >= 90) return 'Превосходно';
  if (score >= 80) return 'Отлично';
  if (score >= 70) return 'Очень хорошо';
  if (score >= 60) return 'Хорошо';
  if (score >= 50) return 'Средне';
  if (score >= 40) return 'Ниже среднего';
  return 'Плохо';
}

/** Генерация slug из строки */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[а-яё]/gi, (char) => {
      const map: Record<string, string> = {
        а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo',
        ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm',
        н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u',
        ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch',
        ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
      };
      return map[char.toLowerCase()] || char;
    })
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
