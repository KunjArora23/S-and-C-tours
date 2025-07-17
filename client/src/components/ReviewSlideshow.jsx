import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, X } from 'lucide-react';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';

function truncateWords(str, num) {
  if (!str) return '';
  const words = str.split(' ');
  if (words.length <= num) return str;
  return words.slice(0, num).join(' ') + '...';
}

const ReviewSlideshow = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [slideDirection, setSlideDirection] = useState('next');
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const slideshowRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => { setImageLoaded(false); }, [currentIndex]);

  useEffect(() => {
    fetchReviews();
  }, []);

  // Preload image before updating review index
  const preloadAndSetIndex = (nextIndex) => {
    setImageLoaded(false);
    const nextReview = reviews[nextIndex];
    if (!nextReview || !nextReview.image) {
      setCurrentIndex(nextIndex);
      setImageLoaded(true);
      return;
    }
    const img = new window.Image();
    img.src = nextReview.image;
    img.onload = () => {
      setCurrentIndex(nextIndex);
      setImageLoaded(true);
    };
    img.onerror = () => {
      setCurrentIndex(nextIndex);
      setImageLoaded(true);
    };
  };

  // Update nextSlide and prevSlide to use preloadAndSetIndex
  const nextSlide = () => {
    setSlideDirection('next');
    const nextIndex = (currentIndex + 1) % reviews.length;
    setModalOpen(false);
    preloadAndSetIndex(nextIndex);
  };

  const prevSlide = () => {
    setSlideDirection('prev');
    const prevIndex = (currentIndex - 1 + reviews.length) % reviews.length;
    setModalOpen(false);
    preloadAndSetIndex(prevIndex);
  };

  const goToSlide = (index) => {
    setSlideDirection(index > currentIndex ? 'next' : 'prev');
    setModalOpen(false);
    preloadAndSetIndex(index);
  };

  // Update auto-advance interval to 8000ms (8s)
  useEffect(() => {
    if (reviews.length > 1) {
      const interval = setInterval(() => {
        setSlideDirection('next');
        const nextIndex = (currentIndex + 1) % reviews.length;
        setModalOpen(false);
        preloadAndSetIndex(nextIndex);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [reviews.length, currentIndex]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:8000/api/v1/review/active');
      setReviews(response.data.reviews || []);
    } catch (error) {
      setError('Failed to load reviews from the server.');
      console.error('Error fetching reviews:', error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  // Touch handlers for swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <section className="py-20 bg-rolex-softWhite">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-rolex-green mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-xl text-rolex-mutedChampagne max-w-3xl mx-auto">
              Real experiences from real travelers who have explored India with us
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rolex-gold"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-rolex-softWhite">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-rolex-green mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-xl text-rolex-mutedChampagne max-w-3xl mx-auto">
              Real experiences from real travelers who have explored India with us
            </p>
          </div>
          <div className="text-center text-red-600 font-semibold">
            {error}
          </div>
        </div>
      </section>
    );
  }

  const currentReview = reviews[currentIndex];
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const wordLimit = isMobile ? 30 : 50;
  const cardClass =
    'bg-white rounded-2xl shadow-2xl overflow-hidden border border-rolex-gold/30 flex flex-col justify-between ' +
    'h-[340px] md:h-[400px] lg:h-[420px] w-full';

  return (
    <section className="relative py-20 bg-rolex-softWhite overflow-hidden">
      {/* Full-bleed review image as background with fade+slide */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentIndex}
          className="absolute inset-0 w-full h-full z-0"
          initial={{ opacity: 0, x: slideDirection === 'next' ? 60 : -60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: slideDirection === 'next' ? -60 : 60 }}
          transition={{ type: 'tween', duration: 0.25, ease: 'easeInOut' }}
          style={{ pointerEvents: 'none' }}
        >
          {/* Spinner or blurred placeholder while loading */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-rolex-softWhite z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rolex-gold"></div>
            </div>
          )}
          <img
            key={currentReview?.image || currentIndex}
            src={currentReview?.image}
            alt={`Journey by ${currentReview?.customerName}`}
            className={`w-full h-full object-cover object-center transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800';
              setImageLoaded(true);
            }}
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>
      {/* Review card with fade+slide, synchronized with image */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[350px] sm:min-h-[420px] md:min-h-[500px] px-2 sm:px-8">
        <AnimatePresence mode="wait" initial={false}>
          {imageLoaded && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: slideDirection === 'next' ? 40 : -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: slideDirection === 'next' ? -40 : 40 }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeInOut' }}
              className="w-full flex flex-col items-center justify-center"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-rolex-gold drop-shadow-lg mb-2">
                  What Our Travelers Say
                </h2>
                <p className="text-base sm:text-xl text-rolex-champagne max-w-3xl mx-auto drop-shadow">
                  Real experiences from real travelers who have explored India with us
                </p>
              </div>
              {/* Review content overlayed on image */}
              <div className="inline-block bg-black/60 backdrop-blur-md rounded-xl px-4 sm:px-8 py-4 sm:py-6 max-w-2xl sm:max-w-3xl mx-auto">
                <div className="flex items-center justify-center mb-2 sm:mb-4">
                  {renderStars(currentReview?.rating || 5)}
                </div>
                <blockquote className="text-lg sm:text-2xl md:text-3xl text-white font-semibold leading-relaxed italic text-center mb-4 sm:mb-6 drop-shadow-xl">
                  “{truncateWords(currentReview?.review, wordLimit)}”
                  {currentReview?.review && currentReview?.review.split(' ').length > wordLimit && (
                    <>
                      {' '}
                      <button
                        className="text-rolex-gold underline ml-1 text-base font-semibold hover:text-rolex-green focus:outline-none"
                        onClick={() => setModalOpen(true)}
                      >
                        Read more
                      </button>
                    </>
                  )}
                </blockquote>
                <div className="font-bold text-lg sm:text-2xl text-rolex-gold drop-shadow-xl text-center mt-2 sm:mt-4">
                  {currentReview?.customerName || 'Customer'}
                </div>
              </div>
              {/* Dots Indicator, Navigation, and Counter remain unchanged */}
            </motion.div>
          )}
        </AnimatePresence>
        {/* Navigation Arrows, Dots, and Counter remain unchanged */}
        {reviews.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-8 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-rolex-gold/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center text-rolex-green hover:bg-rolex-gold hover:text-white transition-all duration-300 z-20 border-2 border-rolex-gold"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-8 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 bg-rolex-gold/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center text-rolex-green hover:bg-rolex-gold hover:text-white transition-all duration-300 z-20 border-2 border-rolex-gold"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
            </button>
          </>
        )}
        {/* Dots Indicator */}
        {reviews.length > 1 && (
          <div className="flex justify-center mt-8 space-x-3 z-10">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full transition-all duration-300 ease-in-out border border-rolex-gold ${
                  index === currentIndex
                    ? 'bg-rolex-gold scale-125 shadow-lg'
                    : 'bg-rolex-gold/40 hover:bg-rolex-gold/70 hover:scale-110'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        )}
        {/* Review Counter */}
        <div className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-rolex-champagne z-10">
          Review {currentIndex + 1} of {reviews.length}
        </div>
      </div>
      {/* Modal for full review */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-rolex-gold max-w-lg w-[90vw] p-6 relative">
            <button
              className="absolute top-2 right-2 text-rolex-gold hover:text-rolex-green text-2xl font-bold focus:outline-none"
              onClick={() => setModalOpen(false)}
              aria-label="Close full review"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-2 mb-2">
              {renderStars(currentReview?.rating || 5)}
              <span className="font-semibold text-rolex-green text-lg">{currentReview?.customerName || 'Customer'}</span>
            </div>
            <div className="mb-2">
              <img
                src={currentReview?.image}
                alt={`Journey by ${currentReview?.customerName}`}
                className="w-24 h-24 object-cover rounded-xl border-2 border-rolex-gold mx-auto"
                onError={(e) => {
                  e.target.src = 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800';
                }}
              />
            </div>
            <blockquote className="text-rolex-charcoal text-base sm:text-lg leading-relaxed italic text-center">
              {currentReview?.review}
            </blockquote>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReviewSlideshow; 