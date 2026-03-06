import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {children}
            </main>
            <Footer />
        </>
    );
}
