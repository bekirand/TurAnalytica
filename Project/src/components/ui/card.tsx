import * as React from 'react';
import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'bordered' | 'elevated';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: CardVariant;
}

const variantStyles: Record<CardVariant, string> = {
    default: 'bg-white/5 backdrop-blur-sm',
    bordered: 'bg-white/5 border border-white/10 backdrop-blur-sm',
    elevated: 'bg-white/5 shadow-xl shadow-black/20 backdrop-blur-sm',
};

function Card({ className, variant = 'bordered', ...props }: CardProps) {
    return (
        <div
            className={cn(
                'rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/5',
                variantStyles[variant],
                className,
            )}
            {...props}
        />
    );
}

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('p-6 pb-0', className)} {...props} />;
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('p-6', className)} {...props} />;
}

function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('border-t border-white/5 px-6 py-4', className)} {...props} />
    );
}

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h3
            ref={ref}
            className={cn("font-semibold leading-none tracking-tight", className)}
            {...props}
        />
    )
)
CardTitle.displayName = "CardTitle"

export { Card, CardHeader, CardContent, CardFooter, CardTitle };
export type { CardProps, CardVariant };
