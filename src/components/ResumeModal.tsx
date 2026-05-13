"use client";

import React from "react";
import { X, Download } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const resumeUrl = "/Resume.pdf";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-5xl h-[90vh] bg-card text-card-foreground rounded-xl shadow-2xl flex flex-col overflow-hidden border border-border">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-border bg-background/50">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-foreground">Resume</h2>
            <a
              href={resumeUrl}
              download="Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all shadow-md hover:shadow-cyan-500/20"
            >
              <Download size={16} />
              Download PDF
            </a>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 bg-muted/30 relative">
          <iframe
            src={`${resumeUrl}#toolbar=0`}
            className="w-full h-full border-none"
            title="Resume Preview"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
