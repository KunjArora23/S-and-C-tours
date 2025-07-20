import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';

const TourDetailUser = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const { data } = await axios.get(`http://sandctour.duckdns.org/api/v1/tour/${id}`, {
          withCredentials: true,
        });
        setTour(data.tour);
        // toast.success("Tour fetched successfully");
      } catch (error) {
        console.error("Failed to fetch tour:", error);
        toast.error("Failed to load tour");
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-rolex-mutedChampagne">
        Loading tour...
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-500">
        Tour not found
      </div>
    );
  }

  return (
    <motion.div className="min-h-screen bg-rolex-champagne text-rolex-green" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <div className="container mx-auto px-4"><BackButton /></div>
      {/* Tour Image */}
      {tour.image && (
        <div className="w-full h-[400px]">
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-full object-cover border-b-4 border-rolex-gold"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/600x400?text=Tour+Image";
            }}
          />
        </div>
      )}

      {/* Tour Info */}
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-rolex-gold mb-4 drop-shadow-xl">
          {tour.title}
        </h1>
        <p className="text-lg text-rolex-champagne mb-1">
          Duration: <span className='text-rolex-green font-semibold'>{tour.duration}</span>
        </p>
        <p className="text-md text-rolex-champagne">
          Destinations: <span className='text-rolex-green font-semibold'>{tour.destinations.join(', ')}</span>
        </p>
      </div>

      {/* Itinerary Section */}
      <motion.div className="container mx-auto px-4" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}>
        <h2 className="text-2xl font-bold text-rolex-gold mb-6 text-center font-cinzel drop-shadow">
          Tour Itinerary
        </h2>
        <div className="space-y-6 max-w-4xl mx-auto">
          {tour.itinerary?.map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-rolex-emeraldGray text-rolex-champagne p-6 rounded-xl shadow-md border-2 border-rolex-gold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 80 }}
            >
              <h3 className="text-xl font-semibold text-rolex-gold mb-2 font-cinzel">
                Day {item.day}: {item.title}
              </h3>
              <p className="text-rolex-champagne text-base">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TourDetailUser;