'use client';
import { useState } from 'react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        phone: '',
        email: '',
        projectType: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            const response = await fetch('mailto:axiomdesignstudio.ads@gmail.com?subject=New Project Inquiry&body=' + encodeURIComponent(
                `Name: ${formData.firstName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\n\nMessage:\n${formData.message}`
            ));
            
            setSubmitMessage('Thank you! We will get back to you soon.');
            setFormData({ firstName: '', phone: '', email: '', projectType: '', message: '' });
        } catch (error) {
            setSubmitMessage('Unable to send. Please contact us directly at axiomdesignstudio.ads@gmail.com');
        } finally {
            setIsSubmitting(false);
        }
    };

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

                    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="firstName" className="font-sans text-[0.68rem] tracking-[0.18em] uppercase text-[#D4C4A8]">First Name</label>
                                <input 
                                    id="firstName"
                                    type="text" 
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Your name" 
                                    required
                                    className="hover-trigger bg-white/5 border border-white/10 text-cream p-4 font-sans text-sm outline-none transition-colors focus:border-gold" 
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="phone" className="font-sans text-[0.68rem] tracking-[0.18em] uppercase text-[#D4C4A8]">Phone</label>
                                <input 
                                    id="phone"
                                    type="tel" 
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+91" 
                                    required
                                    className="hover-trigger bg-white/5 border border-white/10 text-cream p-4 font-sans text-sm outline-none transition-colors focus:border-gold" 
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="font-sans text-[0.68rem] tracking-[0.18em] uppercase text-[#D4C4A8]">Email</label>
                            <input 
                                id="email"
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your@email.com" 
                                required
                                className="hover-trigger bg-white/5 border border-white/10 text-cream p-4 font-sans text-sm outline-none transition-colors focus:border-gold" 
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="projectType" className="font-sans text-[0.68rem] tracking-[0.18em] uppercase text-[#D4C4A8]">Project Type</label>
                            <select 
                                id="projectType"
                                name="projectType"
                                value={formData.projectType}
                                onChange={handleChange}
                                required
                                className="hover-trigger bg-white/5 border border-white/10 text-cream p-4 font-sans text-sm outline-none transition-colors focus:border-gold appearance-none"
                            >
                                <option value="" className="bg-charcoal text-cream">Select category</option>
                                <option value="Residential" className="bg-charcoal text-cream">Residential</option>
                                <option value="Hospitality" className="bg-charcoal text-cream">Hospitality</option>
                                <option value="Retail" className="bg-charcoal text-cream">Retail</option>
                                <option value="Corporate" className="bg-charcoal text-cream">Corporate</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="font-sans text-[0.68rem] tracking-[0.18em] uppercase text-[#D4C4A8]">Tell us about your project</label>
                            <textarea 
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={4} 
                                placeholder="Location, area, style preference..." 
                                required
                                className="hover-trigger bg-white/5 border border-white/10 text-cream p-4 font-sans text-sm outline-none transition-colors focus:border-gold resize-none"
                            ></textarea>
                        </div>
                        {submitMessage && (
                            <div className={`text-sm font-sans tracking-[0.1em] ${submitMessage.includes('Thank you') ? 'text-green-400' : 'text-yellow-400'}`}>
                                {submitMessage}
                            </div>
                        )}
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="hover-trigger mt-4 bg-gold text-charcoal py-4 px-10 font-sans text-xs font-semibold tracking-[0.18em] uppercase self-start transition-all hover:bg-[#c9a86b] hover:-translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Enquiry →'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
