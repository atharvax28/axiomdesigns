'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const cursorRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        // Smooth scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Store lenis instance on window for route change access
        (window as any).lenis = lenis;

        // Custom cursor movement
        const onMouseMove = (e: MouseEvent) => {
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
            }
        };

        // Add hover states to interactive elements
        const handleGlobalHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, input, select, textarea, .hover-trigger')) {
                document.body.classList.add('hovering');
            } else {
                document.body.classList.remove('hovering');
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseover', handleGlobalHover);

        return () => {
            lenis.destroy();
            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseover', handleGlobalHover);
            delete (window as any).lenis;
        };
    }, []);

    useEffect(() => {
        if ((window as any).lenis) {
            (window as any).lenis.scrollTo(0, { immediate: true });
        }
    }, [pathname]);

    return (
        <>
            <div
                ref={cursorRef}
                className="pointer-events-none fixed top-0 left-0 z-[9999] flex h-8 w-8 items-center justify-center rounded-full border border-gold mix-blend-difference transition-all duration-150 ease-out will-change-transform"
            >
                <div className="h-1 w-1 rounded-full bg-gold transition-all duration-150"></div>
            </div>

            {/* Giru-style global film grain overlay */}
            <div
                className="pointer-events-none fixed inset-0 z-[9998] opacity-[0.035] mix-blend-multiply"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }}
            ></div>

            {children}
        </>
    );
}
