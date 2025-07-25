import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MapPin, Phone, Mail, Lock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-rolex-darkGreen text-rolex-gold border-t-4 border-rolex-gold/40 shadow-lg">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
             
              <div>
                <h3 className="text-xl font-bold text-rolex-gold">S & C Tours</h3>
                <p className="text-sm text-rolex-champagne">Discover Amazing India</p>
              </div>
            </div>
            <p className="text-rolex-champagne text-sm leading-relaxed">
              Experience the magic of India with our carefully curated tour packages.
              From the majestic Himalayas to serene backwaters, we bring you the best of Incredible India.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-rolex-gold">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-rolex-champagne hover:text-rolex-gold transition-colors duration-200 ${isActive ? 'text-rolex-gold' : ''}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/tours"
                className={({ isActive }) =>
                  `text-rolex-champagne hover:text-rolex-gold transition-colors duration-200 ${isActive ? 'text-rolex-gold' : ''}`
                }
              >
                Tours
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-rolex-champagne hover:text-rolex-gold transition-colors duration-200 ${isActive ? 'text-rolex-gold' : ''}`
                }
              >
                About Us
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `text-rolex-champagne hover:text-rolex-gold transition-colors duration-200 ${isActive ? 'text-rolex-gold' : ''}`
                }
              >
                Contact
              </NavLink>
              <Link to="/admin" className="text-rolex-champagne hover:text-rolex-gold text-sm transition-colors duration-200 flex items-center">
                <Lock className="w-3 h-3 mr-1" /> Admin
              </Link>
            </nav>
          </div>

          {/* Popular Destinations */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-rolex-gold">Popular Destinations</h4>
            <div className="flex flex-col space-y-2">
              <Link to="/tours/golden-triangle" className="text-rolex-champagne hover:text-rolex-gold transition-colors duration-200">
                Golden Triangle
              </Link>
              <Link to="/citytour/686ada3de304211edeb3ddac" className="text-rolex-champagne hover:text-rolex-gold transition-colors duration-200">
                Kerala City
              </Link>
              <Link to="/citytour/686ac613e304211edeb3dd69" className="text-rolex-champagne hover:text-rolex-gold transition-colors duration-200">
                Rajasthan Tours
              </Link>
              <Link to="/citytour/686ad911e304211edeb3dda8" className="text-rolex-champagne hover:text-rolex-gold transition-colors duration-200">
                Goa Beaches
              </Link>
              <Link to="/citytour/686ac92de304211edeb3dd87" className="text-rolex-champagne hover:text-rolex-gold transition-colors duration-200">
                Himachal Valley
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-rolex-gold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-rolex-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-rolex-champagne text-sm">
                    Shop No. 16, Municipal Market, Connaught Circle,<br />
                    Railway Colony, Connaught Place, New Delhi, Delhi 110001
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-rolex-gold flex-shrink-0" />
                <Link to="tel:+918527921295" className="text-rolex-champagne text-sm hover:text-rolex-gold">
                  +91 8527921295
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-rolex-gold flex-shrink-0" />
                <Link to="mailto:salesiipt@gmail.com" className="text-rolex-champagne text-sm hover:text-rolex-gold">
                  salesiipt@gmail.com
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-rolex-gold/30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-rolex-champagne text-sm">
            © 2024 S & C Tours. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-rolex-champagne hover:text-rolex-gold text-sm transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-rolex-champagne hover:text-rolex-gold text-sm transition-colors duration-200">
              Terms of Service
            </Link>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;