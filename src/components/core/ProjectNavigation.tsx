"use client";

import { MoveLeft, MoveRight } from 'lucide-react';

interface ProjectNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalCount: number;
}

const ProjectNavigation: React.FC<ProjectNavigationProps> = ({ onPrev, onNext, currentIndex, totalCount }) => {
  const formattedCurrent = String(currentIndex + 1).padStart(2, '0');
  const formattedTotal = String(totalCount).padStart(2, '0');

  return (
    <div className="flex items-center justify-between w-full max-w-sm" data-cursor-text>
      {/* --- REFINEMENT: Removed hover text for a cleaner, icon-only interaction --- */}
      <button onClick={onPrev} className="group p-3 text-secondary hover:text-primary transition-colors duration-300" data-cursor-hover>
        <MoveLeft size={24} className="transition-transform duration-300 group-hover:-translate-x-1" />
      </button>

      <div className="font-mono text-lg tracking-widest text-secondary">
        {formattedCurrent} / <span className="text-primary">{formattedTotal}</span>
      </div>

      <button onClick={onNext} className="group p-3 text-secondary hover:text-primary transition-colors duration-300" data-cursor-hover>
        <MoveRight size={24} className="transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  );
};

export default ProjectNavigation;