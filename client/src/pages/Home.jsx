import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, MapPin, Clock, Users, Award, Shield, Headphones } from 'lucide-react';
import axios from 'axios';
import Hero from '../components/Hero';
import TourCard from '../components/TourCard';
// import EnquiryForm from '../components/EnquiryForm';
import ReviewSlideshow from '../components/ReviewSlideshow';
import { motion } from 'framer-motion';
// const MotionLink = motion(Link);

const Home = () => {
  const [featuredTours, setFeaturedTours] = useState([]);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    customers: 0,
    destinations: 0,
    years: 0,
    tours: 0
  });

  useEffect(() => {
    const loadFeaturedTours = async () => {
      try {
  // Use the new featured tours endpoint that respects order
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/tour/featured`);
        const tours = response.data.tours || [];
        console.log(tours)
        setFeaturedTours(tours);
      } catch (error) {
        console.warn('Using fallback featured tours');
        // setFeaturedTours(mockPackages.filter(pkg => pkg.featured).slice(0, 3));
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedTours();

    // Animate stats counter
    const targetStats = { customers: 25000, destinations: 50, years: 25, tours: 2000 };
    const duration = 2000;
    const steps = 50;
    const increment = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setStats({
        customers: Math.floor(targetStats.customers * progress),
        destinations: Math.floor(targetStats.destinations * progress),
        years: Math.floor(targetStats.years * progress),
        tours: Math.floor(targetStats.tours * progress)
      });

      if (step >= steps) {
        clearInterval(timer);
        setStats(targetStats);
      }
    }, increment);

    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'United States',
      rating: 5,
      text: 'Absolutely incredible experience! The Golden Triangle tour exceeded all expectations. Every detail was perfectly planned.',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Michael Chen',
      location: 'Canada',
      rating: 5,
      text: 'Kerala backwaters tour was magical. The houseboat experience and local hospitality made it unforgettable.',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Emma Thompson',
      location: 'United Kingdom',
      rating: 5,
      text: 'Professional service from start to finish. The Rajasthan desert safari was the highlight of our India trip.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const features = [
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized as the leading tour operator in India for 3 consecutive years'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Your safety is our priority with comprehensive insurance and 24/7 support'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you throughout your journey'
    },
    {
      icon: Users,
      title: 'Expert Guides',
      description: 'Experienced local guides who bring destinations to life with their stories'
    }
  ];

  return (
    <motion.div className="min-h-screen bg-background text-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      {/* Hero Section */}
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}>
      <Hero />
      </motion.div>

      {/* Stats Section */}
      <motion.section className="py-10 sm:py-16 bg-rolex-champagne text-rolex-green" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}>
        <div className="container mx-auto px-2 sm:px-4">
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
            {[{label:'Happy Customers',value:stats.customers.toLocaleString()+'+'},{label:'Destinations',value:stats.destinations+'+'},{label:'Years Experience',value:stats.years+'+'},{label:'Tour Packages',value:stats.tours+'+'}].map((stat, i) => (
              <motion.div key={stat.label} className="text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i*0.1, type: 'spring', stiffness: 80 }}>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2 text-rolex-gold">{stat.value}</div>
                <div className="text-rolex-mutedChampagne text-sm sm:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Reviews Slideshow Section */}
      <motion.section className="py-20 bg-background-dark text-text-dark" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}>
        <ReviewSlideshow />
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section className="py-16 sm:py-20 bg-rolex-darkGreen text-rolex-champagne" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}>
        <div className="container mx-auto px-2 sm:px-4">
          <motion.div className="text-center mb-10 sm:mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-rolex-gold mb-3 sm:mb-4">Why Choose Us</h2>
            <p className="text-base sm:text-xl text-rolex-mutedChampagne max-w-3xl mx-auto">We're committed to providing exceptional travel experiences with unmatched service quality</p>
          </motion.div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={{ visible: { transition: { staggerChildren: 0.13 } } }}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center group bg-rolex-emeraldGray/30 rounded-xl p-6 sm:p-8 flex flex-col items-center shadow-lg border border-rolex-gold/30"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 80 }}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-rolex-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-rolex-gold transition-colors duration-300">
                  <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-rolex-gold group-hover:text-rolex-darkGreen transition-colors duration-300" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-rolex-gold mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-rolex-champagne text-sm sm:text-base leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-14 sm:py-20 bg-gradient-to-r from-rolex-gold via-rolex-champagne to-rolex-gold text-rolex-green"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}
      >
        <motion.div className="container mx-auto px-2 sm:px-4 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold mb-4 sm:mb-6">Ready for Your Next Adventure?</h2>
          <p className="text-base sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto opacity-90">Let us create a personalized itinerary that matches your travel dreams. Contact our travel experts today!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/contact"
              className="w-48 bg-rolex-green text-rolex-gold hover:bg-rolex-brassHover hover:text-white py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-colors duration-300 shadow-lg text-center border-2 border-rolex-green"
            >
              Plan My Trip
            </Link>
            <Link
              to="/tours"
              className="w-48 bg-transparent border-2 border-rolex-green text-rolex-green hover:bg-rolex-green hover:text-rolex-gold py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-colors duration-300 shadow-lg text-center"
            >
              Browse Tours
            </Link>
          </div>
        </motion.div>
      </motion.section>

      {/* Enquiry Form Modal */}
     
    </motion.div>
  );
};

export default Home;