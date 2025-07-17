// components/CityTourCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CityTourCard = ({ tour, large }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/citytour/${tour._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`group cursor-pointer bg-rolex-emeraldGray text-rolex-champagne rounded-xl shadow-md overflow-hidden border-2 border-rolex-gold transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03] ${large ? 'p-4 md:p-8' : ''}`}
    >
      <img
        src={tour.image || '/default-tour.jpg'}
        alt={tour.title}
        className={`${large ? 'h-96 md:h-[32rem]' : 'h-52'} w-full object-cover border-b-2 border-rolex-gold transition-transform duration-500 group-hover:scale-110`}
      />
      <div className={large ? 'p-8' : 'p-6'}>
        <h3 className={`font-cinzel font-bold text-rolex-gold mb-2 drop-shadow ${large ? 'text-4xl md:text-5xl' : 'text-xl'}`}>
          {tour.title}
        </h3>
        <p className={`text-rolex-champagne mb-3 ${large ? 'text-xl md:text-2xl' : 'text-sm'}`}>
          {tour.description?.slice(0, large ? 300 : 120)}...
        </p>
        <div className="flex justify-between items-center">
          <span className={large ? 'text-lg md:text-xl text-rolex-gold font-semibold' : 'text-sm text-rolex-gold font-medium'}>
            {tour.tours?.length || 0} tours available
          </span>
          <span className={large ? 'text-base text-rolex-mutedChampagne' : 'text-xs text-rolex-mutedChampagne'}>
            Click to explore
          </span>
        </div>
      </div>
    </div>
  );
};

export default CityTourCard;