import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Search, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredTours, setFeaturedTours] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fallback slides if no featured tours
  const fallbackSlides = [
    {
      image: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'Discover Incredible India',
      subtitle: 'Experience the magic of diverse cultures, ancient monuments, and breathtaking landscapes',
      cta: 'Explore Tours',
      link: '/tours'
    },
    {
      image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'Serene Backwaters of Kerala',
      subtitle: 'Float through palm-fringed canals and experience the tranquil beauty of God\'s Own Country',
      cta: 'View Kerala Tours',
      link: '/tours'
    },
    {
      image: 'https://images.pexels.com/photos/3889929/pexels-photo-3889929.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'Royal Rajasthan Adventures',
      subtitle: 'Journey through magnificent palaces, desert safaris, and royal heritage',
      cta: 'Book Rajasthan',
      link: '/tours'
    }
  ];

  useEffect(() => {
    fetchFeaturedTours();
  }, []);

  const fetchFeaturedTours = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://sandctour.duckdns.org/api/v1/tour/featured');
      if (response.data.success && response.data.tours.length > 0) {
        setFeaturedTours(response.data.tours);
      }
    } catch (error) {
      console.error('Error fetching featured tours:', error);
    } finally {
      setLoading(false);
    }
  };

  // Use featured tours if available, otherwise use fallback slides
  const slides = featuredTours.length > 0 
    ? featuredTours.map(tour => ({
        image: tour.image || 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=1600',
        title: tour.title,
        subtitle: `Experience ${tour.duration} of amazing adventures in ${tour.city?.name || 'India'}`,
        cta: 'See Package',
        link: `/tour/${tour._id}`,
        isTour: true
      }))
    : fallbackSlides;

  useEffect(() => {
    if (slides.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [slides.length]);

  if (loading) {
    return (
      <section className="relative h-screen sm:h-[60vh] overflow-hidden bg-background-dark">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rolex-gold"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slideshow */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            {/* No overlay, keep image clear */}
          </div>
        ))}
        {/* Left/Right Hover Zones */}
        {slides.length > 1 && (
          <>
            {/* Left zone */}
            <div
              className="absolute left-0 top-0 h-full w-1/4 sm:w-1/5 flex items-center justify-start z-20 cursor-pointer group select-none"
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              style={{ background: 'linear-gradient(to right, rgba(20,30,20,0.10) 60%, transparent 100%)' }}
            >
              <div className="ml-2">
                <ChevronLeft className="w-10 h-10 sm:w-10 sm:h-10 text-rolex-gold drop-shadow-xl"
                  style={{ opacity: '1', filter: 'drop-shadow(0 2px 8px #0008)' }}
                />
              </div>
            </div>
            {/* Right zone */}
            <div
              className="absolute right-0 top-0 h-full w-1/4 sm:w-1/5 flex items-center justify-end z-20 cursor-pointer group select-none"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              style={{ background: 'linear-gradient(to left, rgba(20,30,20,0.10) 60%, transparent 100%)' }}
            >
              <div className="mr-2">
                <ChevronRight className="w-10 h-10 sm:w-10 sm:h-10 text-rolex-gold drop-shadow-xl"
                  style={{ opacity: '1', filter: 'drop-shadow(0 2px 8px #0008)' }}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        {/* Stronger shadow overlay, no blur */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative z-10 h-full">
          <div className="absolute left-0 right-0 top-1/2 md:left-12 md:right-auto md:top-1/2 md:bottom-auto md:w-2/3 p-2 sm:p-4 md:p-0 flex flex-col items-center md:items-start gap-3 sm:gap-4 md:gap-4 transform -translate-y-1/2">
            <div className="max-w-4xl w-full">
              <h1 className="text-3xl sm:text-4xl md:text-7xl font-cinzel font-bold text-rolex-gold leading-tight drop-shadow-2xl text-center md:text-left" style={{ textShadow: '0 8px 32px #000, 0 2px 8px #000, 0 1px 2px #000' }}>
                {slides[currentSlide].title}
              </h1>
              <p className="text-base sm:text-lg md:text-2xl font-barlow text-rolex-champagne max-w-2xl leading-relaxed text-center md:text-left mt-2 sm:mt-3 md:mt-0" style={{ textShadow: '0 1px 4px #000' }}>
                {slides[currentSlide].subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 w-full md:w-auto justify-center md:justify-start">
                <Link
                  to={slides[currentSlide].link}
                  className="group bg-rolex-gold hover:bg-rolex-brassHover text-rolex-green px-6 sm:px-8 md:px-8 py-3 sm:py-4 md:py-4 rounded-full font-semibold text-base sm:text-lg md:text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg border-2 border-rolex-gold"
                >
                  <span>{slides[currentSlide].cta}</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 md:w-3 md:h-3 rounded-full transition-all duration-300 border border-rolex-gold ${
                index === currentSlide 
                  ? 'bg-rolex-gold w-6 sm:w-8 md:w-8' 
                  : 'bg-rolex-gold/50 hover:bg-rolex-gold/75'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;