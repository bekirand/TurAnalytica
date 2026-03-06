import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'text' | 'circle' | 'rect';
    width?: string | number;
    height?: string | number;
}

function Skeleton({ className, variant = 'text', width, height, style, ...props }: SkeletonProps) {
    return (
        <div
            className={cn(
                'animate-pulse bg-white/10',
                variant === 'text' && 'h-4 w-full rounded',
                variant === 'circle' && 'rounded-full',
                variant === 'rect' && 'rounded-xl',
                className,
            )}
            style={{
                width: width,
                height: height,
                ...style,
            }}
            {...props}
        />
    );
}

/** Скелетон для карточки тура */
function TourCardSkeleton() {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-0 overflow-hidden">
            <Skeleton variant="rect" className="h-48 w-full rounded-none" />
            <div className="p-4 space-y-3">
                <Skeleton variant="text" className="h-5 w-3/4" />
                <Skeleton variant="text" className="h-4 w-1/2" />
                <div className="flex items-center justify-between pt-2">
                    <Skeleton variant="text" className="h-6 w-24" />
                    <Skeleton variant="circle" width={48} height={48} />
                </div>
            </div>
        </div>
    );
}

export { Skeleton, TourCardSkeleton };
export type { SkeletonProps };
