import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';

const CityTourDetailPage = () => {
  const { id } = useParams();
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCityDetails = async () => {
      try {
        const res = await axios.get(`https://sandctour.duckdns.org/api/v1/city/gettours/${id}`);
        setCity(res.data.city);
      } catch (error) {
        console.error("Failed to fetch city details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCityDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-rolex-champagne">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-rolex-gold mb-6"></div>
        <span className="text-xl font-cinzel font-bold text-rolex-gold">Loading city details...</span>
      </div>
    );
  }

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-500">
        City not found
      </div>
    );
  }

  return (
    <motion.div className="min-h-screen bg-rolex-champagne text-rolex-green" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <div className="container mx-auto px-4"><BackButton /></div>
      {/* City Hero Image */}
      <motion.section className="h-[400px] w-full" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}>
        <img
          src={city.image}
          alt={city.title}
          className="w-full h-full object-cover border-b-4 border-rolex-gold"
        />
      </motion.section>

      {/* City Info */}
      <motion.section className="py-12 px-4 container mx-auto text-center" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}>
        <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-rolex-gold mb-4 drop-shadow-xl">
          Welcome to {city.title}
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-rolex-green">
          {city.description}
        </p>
      </motion.section>

      {/* Tours Section */}
      <motion.section className="py-10 px-4 container mx-auto" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}>
        <h2 className="text-3xl font-bold text-rolex-gold mb-10 text-center font-cinzel drop-shadow">
          Explore Top Tours in {city.title}
        </h2>

        {city.tours?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {city.tours.map((tour) => (
              <div
                key={tour._id}
                onClick={() => navigate(`/tour/${tour._id}`)}
                className="group bg-rolex-emeraldGray text-rolex-champagne rounded-xl shadow-md overflow-hidden border-2 border-rolex-gold transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03] cursor-pointer"
              >
                {tour.image && (
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-48 object-cover border-b-2 border-rolex-gold transition-transform duration-500 group-hover:scale-110"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/600x400?text=Tour+Image")
                    }
                  />
                )}

                <div className="p-5">
                  <h3 className="text-xl font-cinzel font-bold text-rolex-gold mb-2 drop-shadow">
                    {tour.title}
                  </h3>
                  <p className="text-sm text-rolex-champagne mb-1">
                    <strong>Duration:</strong> {tour.duration}
                  </p>
                  <p className="text-sm text-rolex-mutedChampagne">
                    <strong>Destinations:</strong> {tour.destinations.join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-rolex-mutedChampagne">
            No tours available for this city.
          </p>
        )}
      </motion.section>
    </motion.div>
  );
};

export default CityTourDetailPage;