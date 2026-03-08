export default function ContactForm() {
    return (
        <section id="contact" className="bg-charcoal text-cream py-40">
            <div className="max-w-[1440px] mx-auto px-[5vw]">
                <span className="block w-[50px] h-[2px] bg-gold mb-6"></span>
                <span className="font-sans font-semibold text-[0.70rem] tracking-[0.25em] uppercase text-gold">Get In Touch</span>
                <h2 className="mt-4 text-[clamp(2.2rem,5vw,4.5rem)] font-serif font-light leading-[1.05] tracking-[-0.01em]">
                    Start Your<br /><span className="italic text-gold">Project</span>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 mt-20">
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-col gap-2">
                            <span className="font-sans font-semibold text-[0.70rem] tracking-[0.25em] uppercase text-gold">Phone — Aruna Swamy</span>
                            <a href="tel:+919820999296" className="hover-trigger font-serif text-2xl text-cream hover:text-gold transition-colors duration-300">+91 98 20 999 296</a>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="font-sans font-semibold text-[0.70rem] tracking-[0.25em] uppercase text-gold">Phone — Ameya Wani</span>
                            <a href="tel:+919870576945" className="hover-trigger font-serif text-2xl text-cream hover:text-gold transition-colors duration-300">+91 98705 76945</a>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="font-sans font-semibold text-[0.70rem] tracking-[0.25em] uppercase text-gold">Email</span>
                            <a href="mailto:axiomdesignstudio.ads@gmail.com" className="hover-trigger font-serif text-2xl text-cream hover:text-gold transition-colors duration-300">axiomdesignstudio.ads@gmail.com</a>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="font-sans font-semibold text-[0.70rem] tracking-[0.25em] uppercase text-gold">Location</span>
                            <p className="font-serif text-2xl text-cream">Mumbai, Maharashtra, India</p>
                        </div>
                    </div>

                    <form className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="font-sans text-[0.68rem] tracking-[0.18em] uppercase text-[#D4C4A8]">First Name</label>
                                <input type="text" placeholder="Your name" className="hover-trigger bg-white/5 border border-white/10 text-cream p-4 font-sans text-sm outline-none transition-colors focus:border-gold" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="font-sans text-[0.68rem] tracking-[0.18em] uppercase text-[#D4C4A8]">Phone</label>
                                <input type="tel" placeholder="+91" className="hover-trigger bg-white/5 border border-white/10 text-cream p-4 font-sans text-sm outline-none transition-colors focus:border-gold" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-sans text-[0.68rem] tracking-[0.18em] uppercase text-[#D4C4A8]">Email</label>
                            <input type="email" placeholder="your@email.com" className="hover-trigger bg-white/5 border border-white/10 text-cream p-4 font-sans text-sm outline-none transition-colors focus:border-gold" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-sans text-[0.68rem] tracking-[0.18em] uppercase text-[#D4C4A8]">Project Type</label>
                            <select className="hover-trigger bg-white/5 border border-white/10 text-cream p-4 font-sans text-sm outline-none transition-colors focus:border-gold appearance-none">
                                <option value="" className="bg-charcoal text-cream">Select category</option>
                                <option value="Residential" className="bg-charcoal text-cream">Residential</option>
                                <option value="Hospitality" className="bg-charcoal text-cream">Hospitality</option>
                                <option value="Retail" className="bg-charcoal text-cream">Retail</option>
                                <option value="Corporate" className="bg-charcoal text-cream">Corporate</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-sans text-[0.68rem] tracking-[0.18em] uppercase text-[#D4C4A8]">Tell us about your project</label>
                            <textarea rows={4} placeholder="Location, area, style preference..." className="hover-trigger bg-white/5 border border-white/10 text-cream p-4 font-sans text-sm outline-none transition-colors focus:border-gold resize-none"></textarea>
                        </div>
                        <button type="button" className="hover-trigger mt-4 bg-gold text-charcoal py-4 px-10 font-sans text-xs font-semibold tracking-[0.18em] uppercase self-start transition-all hover:bg-[#c9a86b] hover:-translate-y-[1px]">
                            Send Enquiry →
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
