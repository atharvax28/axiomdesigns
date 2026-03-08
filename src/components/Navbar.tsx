'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 80);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((window as any).__lenis) (window as any).__lenis.stop();
        } else {
            document.body.style.overflow = '';
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((window as any).__lenis) (window as any).__lenis.start();
        }
    }, [isMenuOpen]);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5vw] transition-all duration-500 ease-out ${isScrolled
                    ? 'bg-charcoal/85 py-[1.2rem] backdrop-blur-md border-b border-gold/15'
                    : 'bg-transparent py-[2rem] border-b border-transparent'
                    }`}
            >
                <Link href="/" className={`font-sans text-[1.4rem] font-bold tracking-[0.1em] uppercase transition-colors duration-400 ${isScrolled ? 'text-cream' : 'text-charcoal'}`}>
                    Axiom<span className="text-gold">.</span>
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex gap-12 list-none">
                    <li>
                        <Link href="/#about" className={`hover-trigger text-[0.75rem] font-medium tracking-[0.2em] uppercase transition-colors duration-400 relative group pb-1 ${isScrolled ? 'text-cream' : 'text-charcoal'}`}>
                            About
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-400 ease-out group-hover:w-full"></span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/#services" className={`hover-trigger text-[0.75rem] font-medium tracking-[0.2em] uppercase transition-colors duration-400 relative group pb-1 ${isScrolled ? 'text-cream' : 'text-charcoal'}`}>
                            Services
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-400 ease-out group-hover:w-full"></span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/#portfolio" className={`hover-trigger text-[0.75rem] font-medium tracking-[0.2em] uppercase transition-colors duration-400 relative group pb-1 ${isScrolled ? 'text-cream' : 'text-charcoal'}`}>
                            Portfolio
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-400 ease-out group-hover:w-full"></span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/#contact" className={`hover-trigger text-[0.75rem] font-medium tracking-[0.2em] uppercase transition-colors duration-400 relative group pb-1 ${isScrolled ? 'text-cream' : 'text-charcoal'}`}>
                            Contact
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-400 ease-out group-hover:w-full"></span>
                        </Link>
                    </li>
                </ul>

                <Link
                    href="/#contact"
                    className={`hover-trigger hidden md:inline-block text-[0.75rem] font-bold tracking-[0.15em] uppercase px-7 py-3 transition-all duration-400 hover:-translate-y-1 ${isScrolled ? 'bg-gold text-charcoal shadow-sm' : 'bg-charcoal text-cream'
                        }`}
                >
                    Get in Touch
                </Link>

                {/* Mobile Hamburger Button */}
                <button
                    className={`md:hidden flex flex-col justify-center items-center w-8 h-8 z-[60] focus:outline-none ${isScrolled || isMenuOpen ? 'text-cream' : 'text-charcoal'}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className={`block w-6 h-[2px] mb-1.5 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-cream' : 'bg-charcoal'} ${isMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
                    <span className={`block w-6 h-[2px] transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-cream' : 'bg-charcoal'} ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-[2px] mt-1.5 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-cream' : 'bg-charcoal'} ${isMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-charcoal z-40 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden flex flex-col justify-center px-[5vw] ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className="absolute top-[2rem] left-[5vw]">
                    <span className="font-sans text-[1.4rem] font-bold tracking-[0.1em] uppercase text-cream">
                        Axiom<span className="text-gold">.</span>
                    </span>
                </div>

                <ul className="flex flex-col gap-8 list-none">
                    <li className="overflow-hidden">
                        <Link href="/#about" onClick={closeMenu} className={`block text-[2.5rem] font-serif tracking-tight text-cream transition-transform duration-700 delay-100 ${isMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                            About Us
                        </Link>
                    </li>
                    <li className="overflow-hidden">
                        <Link href="/#services" onClick={closeMenu} className={`block text-[2.5rem] font-serif tracking-tight text-cream transition-transform duration-700 delay-200 ${isMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                            Services
                        </Link>
                    </li>
                    <li className="overflow-hidden">
                        <Link href="/#portfolio" onClick={closeMenu} className={`block text-[2.5rem] font-serif tracking-tight text-cream transition-transform duration-700 delay-300 ${isMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                            Portfolio
                        </Link>
                    </li>
                    <li className="overflow-hidden">
                        <Link href="/#contact" onClick={closeMenu} className={`block text-[2.5rem] font-serif tracking-tight text-cream transition-transform duration-700 delay-400 ${isMenuOpen ? 'translate-y-0' : 'translate-y-full'}`}>
                            Contact
                        </Link>
                    </li>
                </ul>

                <div className={`mt-16 flex flex-col gap-4 font-sans text-xs tracking-[0.2em] uppercase text-cream/50 transition-opacity duration-700 delay-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
                    <a href="mailto:axiomdesignstudio.ads@gmail.com" className="text-gold">axiomdesignstudio.ads@gmail.com</a>
                    <span>+91 98 20 999 296</span>
                </div>
            </div>
        </>
    );
}
