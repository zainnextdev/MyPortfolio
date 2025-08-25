// src/contexts/ResumeViewerContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import ResumeViewer from '@/components/core/ResumeViewer';

interface ResumeViewerContextType {
  openResume: () => void;
}

const ResumeViewerContext = createContext<ResumeViewerContextType | undefined>(undefined);

export const useResumeViewer = () => {
  const context = useContext(ResumeViewerContext);
  if (!context) {
    throw new Error('useResumeViewer must be used within a ResumeViewerProvider');
  }
  return context;
};

export const ResumeViewerProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openResume = () => setIsOpen(true);
  const closeResume = () => setIsOpen(false);

  return (
    <ResumeViewerContext.Provider value={{ openResume }}>
      {children}
      <ResumeViewer isOpen={isOpen} onClose={closeResume} />
    </ResumeViewerContext.Provider>
  );
};