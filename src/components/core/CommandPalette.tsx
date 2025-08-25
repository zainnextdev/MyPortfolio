// src/components/core/CommandPalette.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useTheme } from '@/contexts/ThemeContext';
// --- Step 1: Import the new context hook ---
import { useResumeViewer } from '@/contexts/ResumeViewerContext';
import { 
  Search, Home, Layers3, GraduationCap, LayoutGrid, MessageSquareQuote, 
  ClipboardCheck, ArrowUpRight, FileText, Mail, Phone, Brush 
} from 'lucide-react';
import { startLenis, stopLenis } from './SmoothScroller';

gsap.registerPlugin(ScrollToPlugin);

// --- Step 2: Add the new 'resume' action type ---
type CommandAction = 
  | { type: 'scroll', payload: string }
  | { type: 'link', payload: string }
  | { type: 'theme', payload: 'obsidian' | 'marble' | 'blueprint' }
  | { type: 'resume' }; // New action type for the viewer

type Command = {
  label: string;
  action: CommandAction;
  icon: React.ReactElement;
};

type CommandGroup = {
  section: string;
  items: Command[];
};

const commandItems: CommandGroup[] = [
  { section: 'Navigation', items: [
    { label: 'Home', action: { type: 'scroll', payload: '#hero' }, icon: <Home size={20} /> },
    { label: 'About & Skills', action: { type: 'scroll', payload: '#about' }, icon: <Layers3 size={20} /> },
    { label: 'Academic Journey', action: { type: 'scroll', payload: '#education' }, icon: <GraduationCap size={20} /> },
    { label: 'Curated Work', action: { type: 'scroll', payload: '#projects' }, icon: <LayoutGrid size={20} /> },
    { label: 'Client Reviews', action: { type: 'scroll', payload: '#testimonials' }, icon: <MessageSquareQuote size={20} /> },
    { label: 'My Packages', action: { type: 'scroll', payload: '#packages' }, icon: <ClipboardCheck size={20} /> },
    { label: 'Contact', action: { type: 'scroll', payload: '#contact' }, icon: <ArrowUpRight size={20} /> },
  ]},
  { section: 'Actions', items: [
    // --- Step 3: Update the command's action from 'link' to 'resume' ---
    { label: 'View Résumé', action: { type: 'resume' }, icon: <FileText size={20} /> },
    { label: 'Send Email', action: { type: 'link', payload: 'mailto:zain.nextdev@gmail.com' }, icon: <Mail size={20} /> },
    { label: 'Text Me', action: { type: 'link', payload: 'https://wa.me/923236748502' }, icon: <Phone size={20} /> },
  ]},
  { section: 'Change Theme', items: [
      { label: 'Set Theme: Obsidian', action: { type: 'theme', payload: 'obsidian' }, icon: <Brush size={20} /> },
      { label: 'Set Theme: Marble', action: { type: 'theme', payload: 'marble' }, icon: <Brush size={20} /> },
      { label: 'Set Theme: Blueprint', action: { type: 'theme', payload: 'blueprint' }, icon: <Brush size={20} /> },
  ]}
];

const allCommands: Command[] = commandItems.flatMap(group => group.items);

const CommandPalette = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  
  const paletteRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const { setTheme } = useTheme();
  // --- Step 4: Initialize the resume viewer hook ---
  const { openResume } = useResumeViewer();

  const filteredCommands = query
    ? allCommands.filter(item => item.label.toLowerCase().includes(query.toLowerCase()))
    : allCommands;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // --- Step 5: Update the command execution logic ---
  const executeCommand = useCallback((command: Command) => {
    setIsOpen(false); 
    // Timeout allows the palette closing animation to begin before the new action starts
    setTimeout(() => {
      const { action } = command;
      if (action.type === 'scroll') {
        gsap.to(window, { duration: 1.5, scrollTo: { y: action.payload, offsetY: 0 }, ease: 'power3.inOut' });
      } else if (action.type === 'link') {
        window.open(action.payload, '_blank');
      } else if (action.type === 'theme') {
        setTheme(action.payload);
      } else if (action.type === 'resume') {
        openResume();
      }
    }, 150);
  // --- Step 6: Add openResume to the dependency array ---
  }, [setTheme, openResume]);

  // ... (No other changes are needed below this line) ...

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        return;
      }
      
      if (isOpen) {
        if (e.key === 'Escape') setIsOpen(false);
        else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveIndex(prev => (prev + 1) % (filteredCommands.length || 1));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveIndex(prev => (prev - 1 + (filteredCommands.length || 1)) % (filteredCommands.length || 1));
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (filteredCommands[activeIndex]) executeCommand(filteredCommands[activeIndex]);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, filteredCommands, executeCommand]);

  useEffect(() => {
    if (isOpen) {
      stopLenis();
      gsap.to(overlayRef.current, { autoAlpha: 1, duration: 0.3 });
      gsap.fromTo(paletteRef.current, 
        { autoAlpha: 0, scale: 0.98, y: -20 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.3, ease: 'power3.out', delay: 0.1 }
      );
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      startLenis();
      gsap.to(paletteRef.current, { autoAlpha: 0, scale: 0.98, y: -20, duration: 0.2, ease: 'power2.in' });
      gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.2, delay: 0.1 });
      setQuery('');
      setActiveIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) listRef.current?.querySelector(`[data-index="${activeIndex}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, isOpen]);

  useEffect(() => setActiveIndex(0), [query]);

  if (!isMounted) {
    return null;
  }

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-[9999] bg-background/60 backdrop-blur-sm invisible"
      style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
      onMouseDown={() => setIsOpen(false)}
    >
      <div 
        ref={paletteRef} 
        className="invisible absolute top-[20vh] left-1/2 -translate-x-1/2 w-[90vw] max-w-2xl bg-surface/80 backdrop-blur-xl border border-secondary/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden"
        onMouseDown={e => e.stopPropagation()}
      >
        <div className="relative">
          <Search className="absolute top-1/2 -translate-y-1/2 left-4 text-secondary" size={20} />
          <input ref={inputRef} type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Type a command or search..." className="w-full bg-transparent h-14 pl-12 pr-4 text-lg text-primary outline-none border-b border-secondary/10" />
        </div>
        <ul ref={listRef} className="max-h-[40vh] overflow-y-auto p-2">
          {query ? (
            filteredCommands.length > 0 ? (
              filteredCommands.map((item, index) => (
                <li key={`${item.label}-search-${index}`}><button data-index={index} onMouseMove={() => setActiveIndex(index)} onClick={() => executeCommand(item)} className={`w-full flex items-center gap-4 text-left p-3 rounded-md transition-colors duration-150 ${activeIndex === index ? 'bg-accent/20 text-accent' : 'text-secondary hover:bg-secondary/10 hover:text-primary'}`}>{item.icon} {item.label}</button></li>
              ))
            ) : (<li className="text-center p-8 text-secondary">No results found.</li>)
          ) : (
            commandItems.map(group => (
              <li key={group.section}><h3 className="text-xs text-secondary uppercase tracking-widest px-3 pt-4 pb-2">{group.section}</h3><ul>{group.items.map(item => {
                const flatIndex = allCommands.findIndex(cmd => cmd.label === item.label);
                return (<li key={item.label}><button data-index={flatIndex} onMouseMove={() => setActiveIndex(flatIndex)} onClick={() => executeCommand(item)} className={`w-full flex items-center gap-4 text-left p-3 rounded-md transition-colors duration-150 ${activeIndex === flatIndex ? 'bg-accent/20 text-accent' : 'text-secondary hover:bg-secondary/10 hover:text-primary'}`}>{item.icon} <span className="flex-1">{item.label}</span></button></li>);
              })}</ul></li>
            ))
          )}
        </ul>
        <div className="bg-background/50 border-t border-secondary/10 p-2 flex items-center justify-end text-xs text-secondary gap-3">
          <span>Navigate: <kbd className="font-sans bg-secondary/20 px-1.5 py-0.5 rounded">↑</kbd><kbd className="font-sans bg-secondary/20 px-1.5 py-0.5 rounded">↓</kbd></span>
          <span>Select: <kbd className="font-sans bg-secondary/20 px-1.5 py-0.5 rounded">↵</kbd></span>
          <span>Close: <kbd className="font-sans bg-secondary/20 px-1.5 py-0.5 rounded">esc</kbd></span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;