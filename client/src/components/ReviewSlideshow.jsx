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

  useEffect(() => {
    fetchReviews();
  }, []);

  const nextSlide = () => {
    setSlideDirection('next');
    const nextIndex = (currentIndex + 1) % reviews.length;
    setModalOpen(false);
    setCurrentIndex(nextIndex);
  };

  const prevSlide = () => {
    setSlideDirection('prev');
    const prevIndex = (currentIndex - 1 + reviews.length) % reviews.length;
    setModalOpen(false);
    setCurrentIndex(prevIndex);
  };

  const goToSlide = (index) => {
    setSlideDirection(index > currentIndex ? 'next' : 'prev');
    setModalOpen(false);
    setCurrentIndex(index);
  };

  // Auto-advance interval
  useEffect(() => {
    if (reviews.length > 1) {
      const interval = setInterval(() => {
        setSlideDirection('next');
        const nextIndex = (currentIndex + 1) % reviews.length;
        setModalOpen(false);
        setCurrentIndex(nextIndex);
      }, 6000);
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

  // 1. Remove the single review card rendering.
  // 2. Render a flex row with three cards: previous, current, next.
  // 3. Use motion.div for each card, with appropriate classes and animation.
  // 4. Center card: sharp, interactive. Side cards: blurred, not interactive, offset left/right.
  // 5. Animate transitions on next/prev.
  const prevIndex = (currentIndex - 1 + reviews.length) % reviews.length;
  const nextIndex = (currentIndex + 1) % reviews.length;

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const wordLimit = isMobile ? 30 : 50;

  return (
    <section className="relative py-6 md:py-10 bg-gradient-to-b from-[#FFF8E1] via-white to-white overflow-hidden">
      {/* Section Header */}
      <div className="container mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-rolex-darkGreen mb-2">
          What Our Travelers Say
        </h2>
        <p className="text-lg md:text-xl text-rolex-darkGreen/70 max-w-2xl mx-auto">
          Real experiences from real travelers who have explored India with us
        </p>
      </div>

      {/* Review Slideshow */}
      <div className="relative flex flex-col items-center justify-center min-h-[350px]">
        {/* Background image, blurred and faded for depth */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      <AnimatePresence mode="wait" initial={false}>
            {reviews.map((review, idx) =>
              idx === currentIndex ? (
                <motion.img
                  key={review.image || idx}
                  src={review.image}
                  alt={`Journey by ${review.customerName}`}
                  className="absolute inset-0 w-full h-full object-contain object-center scale-125 opacity-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2 }}
          style={{ pointerEvents: 'none' }}
                  onError={(e) => {
                    e.target.src = 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />
              ) : null
            )}
          </AnimatePresence>
            </div>

        {/* Review Card */}
        <div className="relative z-20 flex flex-col items-center w-full max-w-md mx-auto">
          <div className="relative bg-black/30 backdrop-blur-sm rounded-2xl px-4 py-6 shadow-xl border-2 border-rolex-gold/60 flex flex-col items-center w-full mt-[-3rem] pt-20">
            <div className="flex items-center justify-center mb-4">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-5 h-5 ${index < (reviews[currentIndex]?.rating || 5) ? 'text-rolex-gold fill-current' : 'text-gray-300'}`}
                />
              ))}
                </div>
            <blockquote className="text-white text-base sm:text-lg md:text-xl font-medium leading-relaxed italic text-center mb-4 min-h-[2.5em]">
              <span>"</span>
              {truncateWords(reviews[currentIndex]?.review || '', wordLimit)}
              <span>"</span>
                  {reviews[currentIndex]?.review && reviews[currentIndex]?.review.split(' ').length > wordLimit && (
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
            <div className="font-bold text-lg sm:text-xl text-rolex-gold text-center mt-2 tracking-wide">
                  {reviews[currentIndex]?.customerName || 'Customer'}
                </div>
              </div>

          {/* Avatar - gold ring, overlaps card */}
          {/* This block is removed as per the edit hint */}
        </div>

        {/* Navigation dots */}
        {reviews.length > 1 && (
          <div className="flex justify-center mt-10 space-x-3 z-20">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full border-2 border-rolex-gold transition-all duration-300 focus:outline-none ${
                  index === currentIndex
                    ? 'bg-rolex-gold scale-110 shadow-md'
                    : 'bg-rolex-gold/30 hover:bg-rolex-gold/60'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Review Counter */}
        <div className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-rolex-darkGreen z-20">
          Review {currentIndex + 1} of {reviews.length}
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
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 ${index < (reviews[currentIndex]?.rating || 5) ? 'text-rolex-gold fill-current' : 'text-gray-300'}`}
                  />
                ))}
              <span className="font-semibold text-rolex-green text-lg">{reviews[currentIndex]?.customerName || 'Customer'}</span>
            </div>
            <div className="mb-2">
              <img
                src={reviews[currentIndex]?.image}
                alt={`Journey by ${reviews[currentIndex]?.customerName}`}
                className="w-24 h-24 object-cover rounded-xl border-2 border-rolex-gold mx-auto"
                onError={(e) => {
                  e.target.src = 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800';
                }}
              />
            </div>
            <blockquote className="text-rolex-charcoal text-base sm:text-lg leading-relaxed italic text-center">
              {reviews[currentIndex]?.review}
            </blockquote>
          </div>
        </div>
      )}
      </div>
    </section>
  );
};

export default React.memo(ReviewSlideshow); 