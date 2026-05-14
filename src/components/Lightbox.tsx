'use client';

import React, { useState } from 'react';
import { XIcon } from 'lucide-react';

interface LightboxProps {
  imageSrc: string;
  alt: string;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ imageSrc, alt, onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4" onClick={onClose}>
      <button className="absolute top-4 right-4 text-white hover:text-gray-300" onClick={onClose}>
        <XIcon size={32} />
      </button>
      <img src={imageSrc} alt={alt} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
    </div>
  );
};
