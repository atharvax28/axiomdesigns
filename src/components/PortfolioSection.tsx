'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FadeIn } from './FadeIn';
import { ProjectData } from '@/data/projects';

export default function PortfolioSection({ projects }: { projects: ProjectData[] }) {
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = ['All', 'Residential', 'Hospitality', 'Retail', 'Corporate'];

    const filteredProjects = activeFilter === 'All'
        ? projects
        : projects.filter(p => p.category === activeFilter);

    return (
        <section id="portfolio" className="py-40 bg-cream min-h-screen">
            <div className="max-w-[1440px] mx-auto px-[5vw]">
                <div className="flex flex-wrap justify-between items-end gap-8 mb-20">
                    <div>
                        <FadeIn>
                            <span className="block w-[50px] h-[2px] bg-gold mb-6"></span>
                            <span className="font-sans font-semibold text-[0.70rem] tracking-[0.25em] uppercase text-gold">Selected Work</span>
                        </FadeIn>
                        <FadeIn delay={0.15}>
                            <h2 className="mt-4 font-serif font-regular text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.01em] text-charcoal">
                                Our<br /><span className="italic text-gold">Portfolio</span>
                            </h2>
                        </FadeIn>
                    </div>

                    <FadeIn delay={0.3}>
                        <div className="flex flex-wrap gap-4">
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`hover-trigger font-sans text-[0.75rem] font-semibold tracking-[0.15em] uppercase px-6 py-3 border transition-all ${activeFilter === filter
                                            ? 'bg-charcoal text-cream border-charcoal'
                                            : 'bg-transparent border-line text-muted hover:bg-charcoal hover:text-cream hover:border-charcoal'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-500 ease-in-out">
                    {filteredProjects.map((project, index) => (
                        <FadeIn key={project.id} delay={(index % 4) * 0.1}>
                            <Link href={project.link} className="group block relative w-full aspect-[4/3] bg-bone overflow-hidden hover-trigger">
                                {project.coverImage && (
                                    <img
                                        src={project.coverImage}
                                        alt={project.name}
                                        className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex flex-col justify-end p-10">
                                    <span className="font-sans text-[0.70rem] font-semibold tracking-[0.25em] uppercase text-gold mb-2">{project.category}</span>
                                    <h3 className="font-serif text-[2.2rem] text-cream">{project.name}</h3>
                                </div>
                            </Link>
                        </FadeIn>
                    ))}

                    {filteredProjects.length === 0 && (
                        <div className="col-span-2 py-20 text-center text-muted font-sans text-sm tracking-widest uppercase">
                            No projects found in this category.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
