import Hero from '@/components/Hero';
import ContactForm from '@/components/ContactForm';
import { FadeIn } from '@/components/FadeIn';
import { getProjects } from '@/data/projects';
import PortfolioSection from '@/components/PortfolioSection';
import Link from 'next/link';

export default function Home() {
  const projects = getProjects();

  return (
    <>
      <Hero />

      {/* Ticker */}
      <div className="bg-gold py-5 overflow-hidden">
        <div className="flex w-max animate-ticker gap-16">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16">
              {['Residential', 'Hospitality', 'Retail', 'Corporate', 'Design & Build', '18+ Years Experience'].map((text, j) => (
                <span key={j} className="font-sans text-[0.8rem] font-semibold tracking-[0.25em] uppercase text-charcoal flex items-center gap-16">
                  {text}
                  <span className="text-[0.6rem] text-charcoal/40">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-40 bg-cream">
        <div className="max-w-[1440px] mx-auto px-[5vw]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
            <div className="lg:sticky lg:top-48">
              <FadeIn>
                <span className="block w-[50px] h-[2px] bg-gold mb-6"></span>
                <span className="font-sans font-semibold text-[0.70rem] tracking-[0.25em] uppercase text-gold">Our Heritage</span>
              </FadeIn>
              <FadeIn delay={0.15}>
                <h2 className="mt-4 font-serif font-light text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.01em] text-charcoal">
                  Crafting<br /><span className="italic text-gold">Lived-in</span><br />Excellence
                </h2>
              </FadeIn>
            </div>
            <div>
              <FadeIn>
                <div className="font-sans text-[10rem] font-extrabold text-transparent leading-[0.8] mb-8 opacity-80" style={{ WebkitTextStroke: '2px var(--color-gold)' }}>18</div>
              </FadeIn>
              <FadeIn delay={0.15}>
                <blockquote className="font-serif italic text-[clamp(2rem,3.5vw,3rem)] leading-[1.3] text-charcoal mb-12">
                  "High aesthetic standards, superior quality, cost-efficiency and speedy execution — built purely on word-of-mouth."
                </blockquote>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="text-muted text-base leading-relaxed mb-16">
                  With a decade of history, Axiom Design Studio is one of the leading players in the interior contracting industry, with experience spanning several generations in the business. Each service is a result of highly-skilled technical talent and excellent infrastructural support. Our team is hand-picked and trained at our in-house training centre, ensuring a set of fine standards and superior values.
                </p>
              </FadeIn>
              <FadeIn delay={0.45}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-16 border-t border-line">
                  <div className="flex flex-col gap-2">
                    <span className="font-sans text-[0.75rem] tracking-[0.2em] uppercase text-gold">Founder</span>
                    <h4 className="font-serif text-[1.8rem] text-charcoal">Aruna Swamy</h4>
                    <span className="font-sans text-[0.95rem] text-muted mt-2">+91 98 20 999 296</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="font-sans text-[0.75rem] tracking-[0.2em] uppercase text-gold">Founder</span>
                    <h4 className="font-serif text-[1.8rem] text-charcoal">Ameya Wani</h4>
                    <span className="font-sans text-[0.95rem] text-muted mt-2">+91 98705 76945</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-40 bg-charcoal text-cream">
        <div className="max-w-[1440px] mx-auto px-[5vw]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-24">
            <div>
              <FadeIn>
                <span className="block w-[50px] h-[2px] bg-gold mb-6"></span>
                <span className="font-sans font-semibold text-[0.70rem] tracking-[0.25em] uppercase text-gold">What We Do</span>
              </FadeIn>
              <FadeIn delay={0.15}>
                <h2 className="mt-4 font-serif font-light text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.01em]">
                  Our<br /><span className="italic text-gold">Expertise</span>
                </h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.3}>
              <p className="text-white/70 text-lg max-w-[400px]">
                Complete contracting and civil service for any interior project — from concept to handover, we own every step.
              </p>
            </FadeIn>
          </div>

          <div className="flex flex-col border-t border-white/10">
            {['Interior Design', 'Design & Build', 'Workplace Strategy', 'Project Management'].map((service, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="hover-trigger group grid grid-cols-[40px_1fr] md:grid-cols-[80px_1fr_auto] items-center gap-4 md:gap-8 py-8 md:py-12 px-4 md:px-8 border-b border-white/10 transition-colors duration-400 hover:bg-gold/5 cursor-pointer">
                  <span className="font-serif text-[1.2rem] italic text-gold font-light">0{idx + 1}</span>
                  <h3 className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] text-cream transition-transform duration-400 ease-out group-hover:translate-x-3 md:group-hover:translate-x-5">{service}</h3>
                  <div className="hidden md:block w-[40px] h-[1px] bg-gold relative transition-all duration-400 ease-out group-hover:w-[60px]">
                    <div className="absolute right-0 -top-[5px] border-[5px] border-transparent border-l-gold border-l-[7px]"></div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <PortfolioSection projects={projects} />

      <ContactForm />
    </>
  );
}
