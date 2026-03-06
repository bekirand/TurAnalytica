'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScoreRingProps {
    score: number;
    size?: number;
    strokeWidth?: number;
    className?: string;
    showLabel?: boolean;
}

function getColorByScore(score: number): string {
    if (score >= 80) return '#34d399';
    if (score >= 60) return '#facc15';
    if (score >= 40) return '#fb923c';
    return '#f87171';
}

function ScoreRing({ score, size = 80, strokeWidth = 6, className, showLabel = true }: ScoreRingProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    const color = getColorByScore(score);

    return (
        <div className={cn('relative inline-flex items-center justify-center', className)}>
            <svg width={size} height={size} className="-rotate-90">
                {/* Фоновое кольцо */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    className="text-white/10"
                />
                {/* Анимированное кольцо скора */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                />
            </svg>
            {showLabel && (
                <motion.span
                    className="absolute text-lg font-bold text-white"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                >
                    {score}
                </motion.span>
            )}
        </div>
    );
}

export { ScoreRing };
export type { ScoreRingProps };
