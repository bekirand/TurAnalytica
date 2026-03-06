export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0F172A] px-4">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-sky-500/10 blur-3xl" />
                <div className="absolute -bottom-1/4 -right-1/4 h-[600px] w-[600px] rounded-full bg-orange-500/10 blur-3xl" />
            </div>
            <div className="relative z-10 w-full max-w-md">{children}</div>
        </div>
    );
}
