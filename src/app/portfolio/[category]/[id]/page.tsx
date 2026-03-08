import { getProjects } from '@/data/projects';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import ProjectGallery from '@/components/ProjectGallery';

export async function generateStaticParams() {
    const projects = getProjects();
    return projects.map((project) => {
        // extract category and id from folderPath = /projects/01_Residential/01_Dilip_...
        const parts = project.folderPath.split('/');
        return {
            category: parts[2],
            id: parts[3],
        };
    });
}

export default async function ProjectPage({ params }: { params: Promise<{ category: string, id: string }> }) {
    const { category, id } = await params;
    const decodedId = decodeURIComponent(id);
    const decodedCategory = decodeURIComponent(category);

    const projects = getProjects();
    const project = projects.find(p => p.id === decodedId && p.folderPath.includes(decodedCategory));

    if (!project) {
        return <div className="h-screen flex items-center justify-center font-sans tracking-[0.2em] uppercase text-gold">Project Not Found</div>;
    }

    const heroImage = project.coverImage;
    // Do not show the hero image in the gallery again implicitly
    const galleryImages = project.images.filter(img => img !== heroImage);

    return (
        <main className="bg-cream min-h-screen">
            <Link href="/#portfolio" className="hover-trigger fixed top-32 left-[5vw] z-40 bg-charcoal/80 backdrop-blur-md text-cream px-8 py-3 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.2em] flex items-center gap-4 transition-all hover:bg-gold hover:text-charcoal group">
                <span className="transition-transform group-hover:-translate-x-2">←</span> Back to Portfolio
            </Link>

            {/* Banner */}
            <section className="relative w-full h-[85vh] mb-20 bg-charcoal">
                {heroImage && (
                    <img
                        src={heroImage}
                        alt={project.name}
                        className="w-full h-full object-cover opacity-80"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A18] via-transparent to-transparent flex flex-col justify-end px-[5vw] pb-24">
                    <div className="max-w-[1440px] mx-auto w-full">
                        <span className="font-sans font-bold text-[0.85rem] tracking-[0.5em] uppercase text-gold mb-6 block drop-shadow-md">
                            {project.category}
                        </span>
                        <h1 className="font-sans text-[clamp(1.5rem,4vw,3.5rem)] font-bold text-cream uppercase leading-[0.95] tracking-[-0.02em] max-w-[1000px] drop-shadow-lg">
                            {project.name}
                        </h1>
                    </div>
                </div>
            </section>

            {/* Project Details */}
            {(project.client || project.location || project.area || project.style || project.description) && (
                <section className="max-w-[1440px] mx-auto px-[5vw] pt-20 pb-20">
                    <div className="border-t border-b border-charcoal/20 py-12 mb-16">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {project.client && (
                                <div className="flex flex-col gap-3">
                                    <span className="font-sans text-[0.70rem] font-bold tracking-[0.2em] uppercase text-muted">Client</span>
                                    <span className="font-serif text-[1.2rem] text-charcoal">{project.client}</span>
                                </div>
                            )}
                            {project.location && (
                                <div className="flex flex-col gap-3">
                                    <span className="font-sans text-[0.70rem] font-bold tracking-[0.2em] uppercase text-muted">Location</span>
                                    <span className="font-serif text-[1.2rem] text-charcoal">{project.location}</span>
                                </div>
                            )}
                            {project.area && (
                                <div className="flex flex-col gap-3">
                                    <span className="font-sans text-[0.70rem] font-bold tracking-[0.2em] uppercase text-muted">Size</span>
                                    <span className="font-serif text-[1.2rem] text-charcoal">{project.area}</span>
                                </div>
                            )}
                            {project.style && (
                                <div className="flex flex-col gap-3">
                                    <span className="font-sans text-[0.70rem] font-bold tracking-[0.2em] uppercase text-muted">Role</span>
                                    <span className="font-serif text-[1.2rem] text-charcoal">{project.style}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    {project.description && (
                        <div className="max-w-[800px]">
                            <p className="font-serif text-[1.3rem] leading-[1.8] text-charcoal/80">
                                {project.description}
                            </p>
                        </div>
                    )}
                </section>
            )}

            {/* Interactive Lightbox Gallery */}
            <ProjectGallery images={galleryImages} projectName={project.name} />

            <ContactForm />
        </main>
    );
}
