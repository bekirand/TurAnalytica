import { cn } from '@/lib/utils';

type BadgeVariant = 'excellent' | 'good' | 'average' | 'poor' | 'default' | 'info';
type BadgeSize = 'sm' | 'md';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    size?: BadgeSize;
}

const variantStyles: Record<BadgeVariant, string> = {
    excellent: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    good: 'bg-sky-500/15 text-sky-400 border-sky-500/20',
    average: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
    poor: 'bg-red-500/15 text-red-400 border-red-500/20',
    default: 'bg-white/10 text-slate-300 border-white/10',
    info: 'bg-violet-500/15 text-violet-400 border-violet-500/20',
};

const sizeStyles: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
};

/** Возвращает вариант бейджа по значению скора */
export function getScoreBadgeVariant(score: number): BadgeVariant {
    if (score >= 80) return 'excellent';
    if (score >= 60) return 'good';
    if (score >= 40) return 'average';
    return 'poor';
}

function Badge({ className, variant = 'default', size = 'sm', ...props }: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full border font-medium',
                variantStyles[variant],
                sizeStyles[size],
                className,
            )}
            {...props}
        />
    );
}

export { Badge };
export type { BadgeProps, BadgeVariant, BadgeSize };
