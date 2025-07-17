import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const BackButton = ({ className = '', label = 'Back' }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className={`flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-md bg-rolex-champagne text-rolex-green border border-rolex-green/40 font-medium shadow-sm hover:bg-rolex-gold/10 hover:text-rolex-gold transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-rolex-gold text-sm sm:text-base mt-3 mb-4 ${className}`}
      style={{ minWidth: 60 }}
    >
      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      <span>{label}</span>
    </button>
  );
};

export default BackButton; 