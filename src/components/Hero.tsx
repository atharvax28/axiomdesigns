'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const staggerContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } }
    };

    return (
        <section ref={containerRef} className="relative h-screen flex items-center justify-center bg-charcoal text-cream overflow-hidden px-[5vw]">
            {/* Background Video */}
            <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
                <video
                    className="w-full h-full object-cover opacity-60 scale-105"
                    src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260306_074215_04640ca7-042c-45d6-bb56-58b1e8a42489.mp4"
                    autoPlay loop muted playsInline
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-charcoal)_100%)] opacity-80" />
            </motion.div>

            {/* Content */}
            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="relative z-10 flex flex-col items-center text-center gap-6 max-w-[900px] mt-20">
                <motion.div variants={fadeInUp} className="hover-trigger inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-5 py-2 rounded-full text-[0.70rem] font-semibold tracking-[0.2em] uppercase cursor-default">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                    18+ Years of Crafted Spaces · Mumbai
                </motion.div>

                <motion.h1 variants={fadeInUp} className="font-serif font-light text-[clamp(3.5rem,9vw,8.5rem)] leading-[1.05] tracking-[-0.02em] m-0">
                    Space <br />
                    <span className="italic text-gold md:ml-8">Becomes</span><br />
                    Story.
                </motion.h1>

                <motion.p variants={fadeInUp} className="text-white/80 text-[1.1rem] leading-[1.8] max-w-[600px] mx-auto">
                    From idea to execution — Axiom Design Studio delivers world-class interiors across Residential, Hospitality, Retail and Corporate sectors.
                </motion.p>

                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 items-center justify-center mt-4">
                    <a href="#portfolio" className="hover-trigger bg-cream text-charcoal px-11 py-5 text-[0.8rem] font-semibold tracking-[0.15em] uppercase hover:bg-white hover:-translate-y-1 transition-all">
                        View Portfolio
                    </a>
                    <a href="#about" className="hover-trigger text-[0.8rem] font-medium tracking-[0.15em] uppercase text-cream border-b border-white/30 pb-1 hover:text-gold hover:border-gold transition-all">
                        Read Our Story
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}
