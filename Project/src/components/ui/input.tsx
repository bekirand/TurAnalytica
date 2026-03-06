'use client';

import { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, icon, type, id, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = type === 'password';
        const inputType = isPassword && showPassword ? 'text' : type;

        return (
            <div className="w-full">
                {label && (
                    <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-300">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        id={id}
                        type={inputType}
                        className={cn(
                            'w-full rounded-lg border border-white/10 bg-white/5 py-2.5 text-white placeholder:text-slate-600 transition-colors focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500',
                            icon ? 'pl-10 pr-4' : 'px-4',
                            isPassword && 'pr-10',
                            error && 'border-red-500/50 focus:border-red-500 focus:ring-red-500',
                            className,
                        )}
                        {...props}
                    />
                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-slate-300"
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    )}
                </div>
                {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
            </div>
        );
    },
);

Input.displayName = 'Input';

export { Input };
export type { InputProps };
