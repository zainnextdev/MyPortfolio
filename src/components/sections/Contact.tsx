// src/components/sections/Contact.tsx
"use client";

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import toast from 'react-hot-toast';
import { Mail, Phone, Loader, Check, AlertTriangle, User, AtSign, MessageSquare, Send } from 'lucide-react';
// --- Step 1: Import the new, robust wrapper component ---
import { GlobeCanvas } from '@/components/core/GlobeCanvas';

gsap.registerPlugin(ScrollTrigger);
type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [myTime, setMyTime] = useState('');
  const [userTime, setUserTime] = useState('');

  // No changes to any of the form logic or time logic
  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setUserTime(formatTime(now));
      const myDate = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Karachi' }));
      setMyTime(formatTime(myDate));
    };
    updateTimes();
    const intervalId = setInterval(updateTimes, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    const toastId = toast.loading('Sending message...');
    try {
      const response = await fetch('/api/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData), });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Server responded with an unexpected error' }));
        throw new Error(errorData.error || 'Server responded with an error');
      }
      setStatus('success');
      toast.success('Message sent successfully!', { id: toastId });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error: any) {
      setStatus('error');
      toast.error(error.message || 'Failed to send. Please try again.', { id: toastId });
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // No changes to the GSAP animation logic
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } });
      tl.fromTo('.contact-header-reveal', { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.15, duration: 1, ease: 'power3.out' })
        .fromTo('.contact-content-reveal', { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out' }, "-=0.7");
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  
  const buttonState = { idle: { text: 'Send Message', icon: <Send size={20} /> }, sending: { text: 'Sending...', icon: <Loader className="animate-spin" size={20} /> }, success: { text: 'Message Sent', icon: <Check size={20} /> }, error: { text: 'Try Again', icon: <AlertTriangle size={20} /> }, };

  return (
    <section id="contact" ref={sectionRef} className="relative min-h-screen py-32 px-4 sm:px-6 lg:px-8" data-force-hide-cursor>
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-20">
          <h2 className="contact-header-reveal text-4xl md:text-5xl font-bold tracking-tighter text-primary mb-6">Let's Build What's Next</h2>
          <p className="contact-header-reveal text-lg text-secondary max-w-3xl mx-auto">Have a project in mind, a question, or just want to connect? I'm here to listen. Let's turn your vision into a tangible, high-performance digital reality.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-24 w-full h-[500px] lg:h-[calc(100vh-8rem)]">
            {/* --- Step 2: Replace the old logic with the new, stable component --- */}
            <GlobeCanvas sectionRef={sectionRef as React.RefObject<HTMLElement | null>} />
          </div>
          <div className="flex flex-col gap-12">
            <div className="contact-content-reveal">
              <h3 className="text-3xl font-bold tracking-tight text-primary mb-4">Global Sync</h3>
              <div className="p-6 bg-surface/50 backdrop-blur-lg border border-secondary/10 rounded-lg space-y-5">
                <div className="flex items-center gap-3"><div className="relative flex items-center justify-center w-4 h-4"><span className="absolute w-full h-full bg-accent rounded-full animate-ping opacity-75"></span><span className="relative w-2 h-2 bg-accent rounded-full"></span></div><p className="text-secondary">Available for Global Collaboration</p></div>
                <div className="flex justify-between items-baseline border-t border-secondary/10 pt-4"><span className="text-primary font-medium">My Local Time (PKT)</span><time className="font-mono text-lg text-accent tracking-wider">{myTime}</time></div>
                <div className="flex justify-between items-baseline border-t border-secondary/10 pt-4"><span className="text-primary font-medium">Your Local Time</span><time className="font-mono text-lg text-accent tracking-wider">{userTime}</time></div>
              </div>
            </div>
            <div className="contact-content-reveal">
              <h3 className="text-3xl font-bold tracking-tight text-primary mb-4">Contact Info</h3>
              <div className="p-6 bg-surface/50 backdrop-blur-lg border border-secondary/10 rounded-lg space-y-6">
                 <a href="mailto:zain.nextdev@gmail.com" className="group flex items-center gap-4 text-secondary hover:text-primary transition-colors duration-300" data-cursor-hover><Mail className="group-hover:text-accent transition-colors flex-shrink-0" size={24} /><span>zain.nextdev@gmail.com</span></a>
                 <a href="https://wa.me/923236748502" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-secondary hover:text-primary transition-colors duration-300" data-cursor-hover><Phone className="group-hover:text-accent transition-colors flex-shrink-0" size={24} /><span>+92 323 6748502</span></a>
              </div>
            </div>
            <div className="contact-content-reveal">
              <h3 className="text-3xl font-bold tracking-tight text-primary mb-4">Direct Message</h3>
              <div className="p-6 bg-surface/50 backdrop-blur-xl border border-secondary/10 rounded-lg">
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="relative group"><User className="absolute top-1/2 -translate-y-1/2 left-3 text-secondary peer-focus:text-accent transition-colors" size={20} /><input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="peer w-full bg-transparent border-b border-secondary/20 text-primary py-3 pl-12 pr-4 text-lg outline-none transition-colors" placeholder=" " data-cursor-text /><label htmlFor="name" className="absolute left-12 -top-3.5 text-secondary text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-accent peer-focus:text-sm">Full Name</label><span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-center" /></div>
                  <div className="relative group"><AtSign className="absolute top-1/2 -translate-y-1/2 left-3 text-secondary peer-focus:text-accent transition-colors" size={20} /><input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="peer w-full bg-transparent border-b border-secondary/20 text-primary py-3 pl-12 pr-4 text-lg outline-none transition-colors" placeholder=" " data-cursor-text /><label htmlFor="email" className="absolute left-12 -top-3.5 text-secondary text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-accent peer-focus:text-sm">Email Address</label><span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-center" /></div>
                  <div className="relative group"><MessageSquare className="absolute top-4 left-3 text-secondary peer-focus:text-accent transition-colors" size={20} /><textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={4} className="peer w-full bg-transparent border-b border-secondary/20 text-primary py-3 pl-12 pr-4 text-lg outline-none resize-none transition-colors" placeholder=" " data-cursor-text /><label htmlFor="message" className="absolute left-12 -top-3.5 text-secondary text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-accent peer-focus:text-sm">Your Message</label><span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-center" /></div>
                  <button type="submit" disabled={status === 'sending'} data-cursor-hover className={`w-full group relative flex items-center justify-center gap-3 p-4 text-lg font-semibold rounded-lg overflow-hidden transition-all duration-300 ${status === 'sending' ? 'bg-secondary/20 cursor-wait' : 'bg-accent text-background hover:shadow-[0_0_20px_-5px_theme(colors.accent)]'} ${status === 'success' ? '!bg-green-500/80 text-white' : ''} ${status === 'error' ? '!bg-red-500/80 text-white' : ''}`}><span className={`transition-transform duration-300 ${status === 'idle' ? 'group-hover:-translate-x-1' : ''}`}>{buttonState[status].icon}</span><span className={`transition-transform duration-300 ${status === 'idle' ? 'group-hover:translate-x-1' : ''}`}>{buttonState[status].text}</span></button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}