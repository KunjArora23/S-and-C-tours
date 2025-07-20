import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CityTourCard from './cityTourCard';
import { set } from 'mongoose';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';

const Cities = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(4); // 1, 2, or 4 columns
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('https://sandctour.duckdns.org/api/v1/city/getAll'); // Update API endpoint if needed
        setTours(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchTours();
    // Responsive check for mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Determine grid columns based on view
  let gridCols = 'grid-cols-1';
  if (view === 2) gridCols = 'grid-cols-1 md:grid-cols-2';
  if (view === 4) gridCols = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';

  return (
    <motion.div className="min-h-screen bg-rolex-champagne text-rolex-green" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <div className="container mx-auto px-4"><BackButton /></div>
      {/* Hero Section */}
      <motion.section className="bg-gradient-to-r from-rolex-gold via-rolex-champagne to-rolex-gold text-rolex-green py-10 sm:py-20" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}>
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.h1 className="text-5xl md:text-6xl font-cinzel font-bold mb-4 text-rolex-gold drop-shadow-xl" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>Explore Our Tours</motion.h1>
          <motion.p className="text-lg md:text-xl opacity-90 text-rolex-green" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>Discover incredible destinations across India with our expertly crafted tour packages.</motion.p>
        </div>
      </motion.section>
      {/* Tour List Section */}
      <motion.section className="py-16 bg-rolex-champagne text-rolex-green" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}>
        <div className="container mx-auto px-4">
          {/* View Toggle Buttons (hidden on mobile) */}
          <div className="hidden sm:flex items-center justify-end mb-8 gap-3 w-full max-w-xs ml-auto">
            <span className="font-semibold text-rolex-gold text-base mr-2">Show:</span>
            
            <button
              onClick={() => setView(2)}
              className={`px-3 py-2 rounded-lg border-2 transition-all duration-200 focus:outline-none ${view === 2 ? 'border-rolex-gold bg-rolex-gold/20 shadow-lg' : 'border-rolex-green bg-rolex-champagne hover:bg-rolex-gold/10'}`}
            >2 cities</button>
            <button
              onClick={() => setView(4)}
              className={`px-3 py-2 rounded-lg border-2 transition-all duration-200 focus:outline-none ${view === 4 ? 'border-rolex-gold bg-rolex-gold/20 shadow-lg' : 'border-rolex-green bg-rolex-champagne hover:bg-rolex-gold/10'}`}
            >4 cities</button>
          </div>
          {loading ? (
            <motion.p className="text-center text-rolex-mutedChampagne text-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>Loading tours...</motion.p>
          ) : tours.length > 0 ? (
            <motion.div className={`grid ${gridCols} gap-4 sm:gap-8 mb-8`} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={{ visible: { transition: { staggerChildren: 0.13 } } }}>
              {tours.map((tour, i) => (
                <motion.div
                  key={tour._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i*0.1, type: 'spring', stiffness: 80 }}
                  className={view === 1 ? 'flex items-center justify-center min-h-screen' : ''}
                >
                  <div className={view === 1 ? 'w-full max-w-4xl' : ''}>
                    <CityTourCard tour={tour} large={view === 1 && isMobile} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.p className="text-center text-rolex-mutedChampagne text-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>No tours available</motion.p>
          )}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Cities;