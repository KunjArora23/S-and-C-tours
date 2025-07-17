import React, { useState } from 'react';
import { Phone, MapPin, Facebook, MessageCircle, X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const contacts = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/918527921295',
    icon: <MessageCircle className="w-5 h-5 text-primary-600 dark:text-primary-400" />, // WhatsApp icon
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/sandctours/',
    icon: <Facebook className="w-5 h-5 text-primary-600 dark:text-primary-400" />, // Facebook icon
  },
  {
    label: 'Call Now',
    href: 'tel:+918527921295',
    icon: <Phone className="w-5 h-5 text-primary-600 dark:text-primary-400" />, // Phone icon
  },
  {
    label: 'Google Map',
    href: 'https://maps.app.goo.gl/PbXBz3phESrCazSZA',
    icon: <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400" />, // Map icon
  },
];

const MultiContactButton = () => {
  const [open, setOpen] = useState(false);
  // Detect mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  // Listen for custom event to open contact popup
  React.useEffect(() => {
    const handleOpenContactPopup = () => {
      setOpen(true);
    };

    window.addEventListener('openContactPopup', handleOpenContactPopup);
    
    return () => {
      window.removeEventListener('openContactPopup', handleOpenContactPopup);
    };
  }, []);

  return (
    <>
      {/* Overlay when open (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity animate-fadeIn sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      {/* FAB for mobile */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col-reverse items-start gap-2 multi-contact-launcher sm:hidden">
        {/* Animated FAB always at the bottom */}
        <button
          onClick={() => setOpen((v) => !v)}
          className={`flex items-center justify-center w-11 h-11 rounded-full bg-rolex-gold shadow-md text-rolex-darkGreen text-xl font-bold focus:outline-none relative overflow-visible animate-float border-2 border-white transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
          aria-label="Contact Us"
          style={{ boxShadow: '0 2px 8px 0 rgba(184,155,54,0.12)', zIndex: 2 }}
        >
          <Plus className="w-5 h-5 transition-transform duration-300" style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }} />
          {/* Glowing effect */}
          <span className="absolute inset-0 rounded-full pointer-events-none animate-pulse bg-rolex-gold/20 blur-sm" />
        </button>
        {/* Joined vertical stack of contact options above FAB */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
                closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } }
              }}
              className="flex flex-col items-start gap-2 mb-2"
              style={{ zIndex: 3 }}
            >
              {contacts.map((c, i) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={{
                    open: { opacity: 1, y: 0, scale: 1 },
                    closed: { opacity: 0, y: 24, scale: 0.97 }
                  }}
                  transition={{ type: 'spring', stiffness: 180, damping: 22 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-rolex-darkGreen/90 text-rolex-gold font-semibold text-base border border-rolex-gold shadow-sm hover:bg-rolex-darkGreen transition-all duration-200"
                  style={{ minWidth: 0 }}
                >
                  <span className="text-rolex-gold bg-rolex-gold/10 rounded-full p-1 flex items-center justify-center border border-rolex-gold">
                    {React.cloneElement(c.icon, { className: 'w-4 h-4' })}
                  </span>
                  <span className="flex-1 text-sm">{c.label}</span>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Desktop version unchanged */}
      <div className="hidden sm:flex fixed bottom-6 left-6 z-50 flex-col items-start gap-3 multi-contact-launcher">
        {/* Contact options with staggered animation */}
        <div className={`flex flex-col items-start gap-3 ${open ? 'pointer-events-auto' : 'pointer-events-none'} multi-contact-list`}
          style={{ position: 'relative' }}
        >
          {contacts.map((c, i) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center px-4 py-2 rounded-full shadow-md border border-rolex-gold bg-rolex-darkGreen text-rolex-gold font-semibold text-sm gap-2 transition-all duration-300 hover:bg-rolex-darkGreen/80 ${open ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}
              style={{
                minWidth: 140,
                transitionDelay: open ? `${i * 70 + 100}ms` : `${(contacts.length - i) * 40}ms`,
                zIndex: 2,
              }}
            >
              {c.icon}
              <span>{c.label}</span>
            </a>
          ))}
        </div>
        {/* Main FAB */}
        <button
          onClick={() => setOpen((v) => !v)}
          className={`flex items-center justify-center px-6 h-14 rounded-full bg-rolex-darkGreen border border-rolex-gold shadow-lg text-rolex-gold text-lg font-bold transition-transform duration-300 focus:outline-none relative overflow-visible
            ${open ? '' : 'hover:scale-105'} multi-contact-btn
          `}
          aria-label={open ? 'Close contacts' : 'Open contacts'}
          style={{ minWidth: 140 }}
        >
          {/* Glowing gold ring */}
          <span className="absolute inset-0 rounded-full pointer-events-none animate-pulse bg-rolex-gold/30 blur-lg" />
          {/* Glowing ring when closed */}
          {!open && (
            <span className="absolute inset-0 rounded-full animate-pulse bg-rolex-gold/40 opacity-40 blur-lg" />
          )}
          <span className="relative z-10 multi-contact-btn-label">
            {open ? <X className="w-7 h-7" /> : 'Contact Us'}
          </span>
        </button>
      </div>
      {/* Animations */}
      <style>{`
        @media (max-width: 640px) {
          .multi-contact-launcher {
            left: 0.75rem !important;
            bottom: 0.75rem !important;
            opacity: 0.95;
          }
          .rotate-45 {
            transform: rotate(45deg) !important;
          }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.3s ease; }
        @keyframes slideUp { from { transform: translateY(60px); opacity: 0; } to { transform: none; opacity: 1; } }
        .animate-slideUp { animation: slideUp 0.4s cubic-bezier(.4,2,.6,1) both; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      `}</style>
    </>
  );
};

export default MultiContactButton;