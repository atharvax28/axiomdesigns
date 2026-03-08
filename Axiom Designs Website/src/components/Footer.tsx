import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-charcoal text-cream pt-32 pb-12 border-t border-gold/15">
            <div className="max-w-[1440px] mx-auto px-[5vw]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                    <div className="col-span-1 lg:col-span-2">
                        <Link href="/" className="font-sans text-[2rem] font-bold uppercase tracking-[0.1em] block mb-6 text-cream hover-trigger">
                            Axiom<span className="text-gold">.</span>
                        </Link>
                        <p className="text-muted text-[0.9rem] max-w-[280px]">
                            Premium interior design and contracting studio. Turnkey solutions for Residential, Hospitality, Retail and Corporate spaces across western India.
                        </p>
                    </div>

                    <div>
                        <h5 className="font-sans text-[0.75rem] tracking-[0.2em] uppercase text-gold mb-8">Navigation</h5>
                        <ul className="flex flex-col gap-4 list-none">
                            <li><Link href="/#about" className="hover-trigger text-white/60 hover:text-cream text-[0.95rem] transition-colors">About Us</Link></li>
                            <li><Link href="/#services" className="hover-trigger text-white/60 hover:text-cream text-[0.95rem] transition-colors">Services</Link></li>
                            <li><Link href="/#portfolio" className="hover-trigger text-white/60 hover:text-cream text-[0.95rem] transition-colors">Projects</Link></li>
                            <li><Link href="/#why-us" className="hover-trigger text-white/60 hover:text-cream text-[0.95rem] transition-colors">Why Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-sans text-[0.75rem] tracking-[0.2em] uppercase text-gold mb-8">Sectors</h5>
                        <ul className="flex flex-col gap-4 list-none">
                            <li className="text-white/60 text-[0.95rem]">Residential</li>
                            <li className="text-white/60 text-[0.95rem]">Hospitality</li>
                            <li className="text-white/60 text-[0.95rem]">Retail</li>
                            <li className="text-white/60 text-[0.95rem]">Corporate</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-[0.8rem] text-white/40 gap-4">
                    <span>&copy; {new Date().getFullYear()} Axiom Design Studio. All rights reserved.</span>
                    <span>Designed with <span className="text-gold">intent</span>. Built with precision.</span>
                </div>
            </div>
        </footer>
    );
}
