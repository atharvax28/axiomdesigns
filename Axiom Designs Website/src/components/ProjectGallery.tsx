'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectGalleryProps {
    images: string[];
    projectName: string;
}

export default function ProjectGallery({ images, projectName }: ProjectGalleryProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    // Close gallery on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedImageIndex(null);
            if (e.key === 'ArrowRight' && selectedImageIndex !== null) {
                setSelectedImageIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : prev));
            }
            if (e.key === 'ArrowLeft' && selectedImageIndex !== null) {
                setSelectedImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImageIndex, images.length]);

    return (
        <>
            <section className="max-w-[1440px] mx-auto px-[5vw] pb-40">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {images.map((imgPath, index) => (
                        <div
                            key={index}
                            className="w-full h-auto bg-bone relative overflow-hidden group cursor-pointer"
                            onClick={() => setSelectedImageIndex(index)}
                        >
                            <img
                                src={imgPath}
                                alt={`${projectName} photo ${index + 1}`}
                                className="w-full h-full object-cover aspect-[4/3] transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500 flex items-center justify-center">
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-cream font-sans tracking-[0.2em] uppercase text-[0.7rem] bg-charcoal/50 px-4 py-2 backdrop-blur-sm rounded-full">
                                    View
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Lightbox Overlay with Giru Dark Aesthetic */}
            <AnimatePresence>
                {selectedImageIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 backdrop-blur-xl"
                    >
                        {/* Film Grain Noise Texture */}
                        <div className="pointer-events-none absolute inset-0 z-[-1] opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }}></div>

                        <button
                            onClick={() => setSelectedImageIndex(null)}
                            className="absolute top-8 right-[5vw] text-cream/70 hover:text-cream font-sans tracking-[0.2em] uppercase text-[0.7rem] z-50 transition-colors p-4"
                        >
                            Close [ESC]
                        </button>

                        <div className="w-full max-w-[85vw] h-[85vh] relative flex items-center justify-center">
                            <img
                                src={images[selectedImageIndex]}
                                alt={`${projectName} enlarged`}
                                className="max-w-full max-h-full object-contain drop-shadow-2xl"
                            />
                        </div>

                        {/* Navigation Constraints & Counters */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-sans tracking-[0.3em] text-[0.65rem] text-cream/60 flex items-center gap-8">
                            <button
                                onClick={() => setSelectedImageIndex(prev => prev! > 0 ? prev! - 1 : prev)}
                                className={`uppercase transition-colors ${selectedImageIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:text-cream cursor-pointer'}`}
                            >
                                Prev
                            </button>
                            <span>{selectedImageIndex + 1} / {images.length}</span>
                            <button
                                onClick={() => setSelectedImageIndex(prev => prev! < images.length - 1 ? prev! + 1 : prev)}
                                className={`uppercase transition-colors ${selectedImageIndex === images.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:text-cream cursor-pointer'}`}
                            >
                                Next
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
