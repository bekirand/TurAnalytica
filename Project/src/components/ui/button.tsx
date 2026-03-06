import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-sky-600 text-white hover:bg-sky-500 active:bg-sky-700',
    secondary: 'bg-white/10 text-white hover:bg-white/15 active:bg-white/20',
    outline: 'border border-white/20 text-white hover:bg-white/5 active:bg-white/10',
    ghost: 'text-slate-300 hover:bg-white/5 hover:text-white active:bg-white/10',
    danger: 'bg-red-600 text-white hover:bg-red-500 active:bg-red-700',
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', loading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
        return (
            <button
                ref={ref}
                disabled={disabled || loading}
                className={cn(
                    'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:ring-offset-2 focus:ring-offset-[#0F172A] disabled:cursor-not-allowed disabled:opacity-50',
                    variantStyles[variant],
                    sizeStyles[size],
                    className,
                )}
                {...props}
            >
                {loading ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current/30 border-t-current" />
                ) : (
                    leftIcon
                )}
                {children}
                {!loading && rightIcon}
            </button>
        );
    },
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
