import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Globe, Users, Calendar, ChevronDown } from 'lucide-react';
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { motion } from 'framer-motion';
dayjs.extend(utc);
dayjs.extend(timezone);
import BackButton from '../components/BackButton';
import whatsappIcon from '../icons/whatsapp.svg';

const TIMEZONE_OFFSET = '+05:30';
const SLOT_START = 7; // 7:00 AM
const SLOT_END = 23.5; // 11:30 PM
const SLOT_INTERVAL = 30; // minutes

function generateTimeSlots() {
  const slots = [];
  for (let h = SLOT_START; h <= SLOT_END; h += 0.5) {
    const hour = Math.floor(h);
    const minute = h % 1 === 0 ? '00' : '30';
    slots.push(`${hour.toString().padStart(2, '0')}:${minute}`);
  }
  return slots;
}
const TIME_SLOTS = generateTimeSlots();

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'custom'
  });

  const [tailorMadeData, setTailorMadeData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91',
    country: '',
    adults: 1,
    children: 0,
    startDate: '',
    endDate: '',
    destinations: [],
    hotelCategory: '',
    interests: '',
    specialRequests: ''
  });





  const countryCodes = [
    '+1', '+44', '+91', '+61', '+86', '+81', '+49', '+33', '+39', '+34',
    '+7', '+55', '+86', '+82', '+31', '+46', '+41', '+32', '+47', '+45',
    '+358', '+46', '+47', '+45', '+358', '+46', '+47', '+45', '+358', '+46'
  ];

  // Countries in alphabetical order
  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
    'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
    'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon',
    'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
    'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor',
    'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland',
    'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea',
    'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq',
    'Ireland', 'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati',
    'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania',
    'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius',
    'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia',
    'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway',
    'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland',
    'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino',
    'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands',
    'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland',
    'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
    'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu',
    'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
  ];

  // Indian States and Union Territories
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Office',
      details: [
        '123 Travel Street, Connaught Place',
        'New Delhi, India 110001',
        'Open Mon-Sat: 9:00 AM - 7:00 PM'
      ]
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: [
        '+91 98765 43210 (Primary)',
        '+91 98765 43211 (WhatsApp)',
        '24/7 Emergency Support'
      ]
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: [
        'info@incredibletours.com',
        'bookings@incredibletours.com',
        'support@incredibletours.com'
      ]
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: [
        'Monday - Friday: 9:00 AM - 7:00 PM',
        'Saturday: 9:00 AM - 5:00 PM',
        'Sunday: 10:00 AM - 4:00 PM'
      ]
    }
  ];

  const offices = [
    {
      city: 'New Delhi',
      address: 'Shop No. 16, Municipal Market, Connaught Circle, Railway Colony, Connaught Place, New Delhi, Delhi 110001',
      phone: '+91 85279 21295',
      email: 'rpiipt@gmail.com'
    },
  ];

  const faqs = [
    {
      question: 'How far in advance should I book my tour?',
      answer: 'We recommend booking at least 2-3 months in advance, especially for peak season (October to March) and popular destinations like the Golden Triangle.'
    },
    {
      question: 'Do you provide customized tour packages?',
      answer: 'Yes! We specialize in creating personalized itineraries based on your interests, budget, and travel dates. Contact us to discuss your requirements.'
    },
    {
      question: 'What is included in your tour packages?',
      answer: 'Our packages typically include accommodation, transportation, professional guides, entrance fees, and specified meals. Specific inclusions vary by package.'
    },
    {
      question: 'Is travel insurance included?',
      answer: 'Travel insurance is not included but highly recommended. We can help you arrange comprehensive travel insurance for your trip.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'Cancellation policies vary by package and season. Generally, cancellations 30+ days before departure receive full refund minus processing fees.'
    }
  ];


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showTailorMadeForm, setShowTailorMadeForm] = useState(true);
  const [isDestinationDropdownOpen, setIsDestinationDropdownOpen] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [slotError, setSlotError] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [userTimeZone, setUserTimeZone] = useState(dayjs.tz.guess());
  const [citySearch, setCitySearch] = useState('');
  const [filteredCities, setFilteredCities] = useState(indianStates); // or your city list

  // Fetch available slots when meetingDate changes (for non-custom forms)
  React.useEffect(() => {
    setUserTimeZone(dayjs.tz.guess());
  }, []);

  React.useEffect(() => {
    if (!showTailorMadeForm && meetingDate) {
      setSlotsLoading(true);
      setAvailableSlots([]);
      axios
        .get(`http://localhost:8000/api/v1/contact/available-slots?date=${meetingDate}`)
        .then(res => {
          // Convert IST slots to user timezone for display
          const slots = (res.data.slots || []).map(slot => {
            const istDateTime = dayjs.tz(`${meetingDate}T${slot}:00`, 'Asia/Kolkata');
            return {
              ist: slot,
              user: istDateTime.tz(userTimeZone).format('HH:mm'),
              userLabel: istDateTime.tz(userTimeZone).format('hh:mm A z'),
            };
          });
          setAvailableSlots(slots);
        })
        .catch(() => {
          setAvailableSlots([]);
        })
        .finally(() => setSlotsLoading(false));
    }
  }, [meetingDate, showTailorMadeForm, userTimeZone]);

  React.useEffect(() => {
    setFilteredCities(
      indianStates.filter(state =>
        state.toLowerCase().includes(citySearch.toLowerCase())
      )
    );
  }, [citySearch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // If inquiry type changes, show appropriate form
    if (name === 'inquiryType') {
      setShowTailorMadeForm(value === 'custom');
    }
  };

  const handleTailorMadeChange = (e) => {
    const { name, value } = e.target;
    setTailorMadeData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSlotError('');

    try {
      const dataToSend = showTailorMadeForm
        ? { ...tailorMadeData, userTimeZone }
        : { ...formData, meetingDate, meetingTime, userTimeZone };
      const res = await axios.post('http://localhost:8000/api/v1/contact', dataToSend);
      if (res.data && res.data.meetLink) {
        // Optionally show Meet link to user
      }
      setIsSubmitted(true);
      setIsSubmitting(false);
      setSlotError('');
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          inquiryType: 'custom'
        });
        setTailorMadeData({
          name: '',
          email: '',
          phone: '',
          countryCode: '+91',
          country: '',
          adults: 1,
          children: 0,
          startDate: '',
          endDate: '',
          destinations: [],
          hotelCategory: '',
          interests: '',
          specialRequests: ''
        });
        setMeetingDate('');
        setMeetingTime('');
      }, 3000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setSlotError(error.response.data.message);
      } else {
        setSubmitError('Failed to send your enquiry. Please try again later.');
      }
      setIsSubmitting(false);
      setTimeout(() => { setSubmitError(''); setSlotError(''); }, 3000);
    }
  };

  // Country codes for phone numbers


  return (
    <motion.div className="min-h-screen bg-rolex-champagne text-rolex-green" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <div className="container mx-auto px-4"><BackButton /></div>
      {/* Hero Section */}
      <motion.section className="relative py-20 bg-rolex-darkGreen text-rolex-gold overflow-hidden" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="max-w-4xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-6xl font-cinzel font-bold mb-6 animate-fade-in drop-shadow-xl">Contact Us</h1>
            <p className="text-xl text-rolex-champagne mb-8">Our travel experts are ready to help you plan your dream trip. Reach out to us today!</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Form & Map */}
      <motion.section className="py-16" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}>
        <div className="container mx-auto px-4">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-12" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={{ visible: { transition: { staggerChildren: 0.13 } } }}>
            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}>
              <div className="mb-8">
                <h2 className="text-4xl font-cinzel font-bold text-rolex-gold mb-4 drop-shadow">
                  Send Us a Message
                </h2>
                <p className="text-rolex-green text-lg">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              {/* Inquiry Type Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Inquiry Type
                </label>
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-rolex-gold bg-rolex-champagne text-rolex-green focus:ring-2 focus:ring-rolex-gold focus:border-rolex-gold transition-colors duration-200"
                >
                  <option value="custom">Custom Package</option>
                  <option value="general">General Inquiry</option>
                  <option value="booking">Tour Booking</option>
                  <option value="support">Customer Support</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>

              {showTailorMadeForm ? (
                // Tailor-Made Tour Form
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={tailorMadeData.name}
                        onChange={handleTailorMadeChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-rolex-gold bg-rolex-champagne text-rolex-green focus:ring-2 focus:ring-rolex-gold focus:border-rolex-gold transition-colors duration-200 placeholder:text-rolex-mutedChampagne"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={tailorMadeData.email}
                        onChange={handleTailorMadeChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-rolex-gold bg-rolex-champagne text-rolex-green focus:ring-2 focus:ring-rolex-gold focus:border-rolex-gold transition-colors duration-200 placeholder:text-rolex-mutedChampagne"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Country Code
                      </label>
                      <select
                        name="countryCode"
                        value={tailorMadeData.countryCode}
                        onChange={handleTailorMadeChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-rolex-gold bg-rolex-champagne text-rolex-green focus:ring-2 focus:ring-rolex-gold focus:border-rolex-gold transition-colors duration-200"
                      >
                        {countryCodes.map((code, index) => (
                          <option key={index} value={code}>{code}</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={tailorMadeData.phone}
                        onChange={handleTailorMadeChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-rolex-gold bg-rolex-champagne text-rolex-green focus:ring-2 focus:ring-rolex-gold focus:border-rolex-gold transition-colors duration-200 placeholder:text-rolex-mutedChampagne"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Country *
                    </label>
                    <select
                      name="country"
                      value={tailorMadeData.country}
                      onChange={handleTailorMadeChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-rolex-gold bg-rolex-champagne text-rolex-green focus:ring-2 focus:ring-rolex-gold focus:border-rolex-gold transition-colors duration-200"
                    >
                      <option value="">Select your country</option>
                      {countries.map((country, index) => (
                        <option key={index} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Number of Adults *
                      </label>
                      <select
                        name="adults"
                        value={tailorMadeData.adults}
                        onChange={handleTailorMadeChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-rolex-gold bg-rolex-champagne text-rolex-green focus:ring-2 focus:ring-rolex-gold focus:border-rolex-gold transition-colors duration-200"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Number of Children
                      </label>
                      <select
                        name="children"
                        value={tailorMadeData.children}
                        onChange={handleTailorMadeChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-rolex-gold bg-rolex-champagne text-rolex-green focus:ring-2 focus:ring-rolex-gold focus:border-rolex-gold transition-colors duration-200"
                      >
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Start Date *
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        value={tailorMadeData.startDate}
                        onChange={handleTailorMadeChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-rolex-gold bg-rolex-champagne text-rolex-green focus:ring-2 focus:ring-rolex-gold focus:border-rolex-gold transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        End Date *
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        value={tailorMadeData.endDate}
                        onChange={handleTailorMadeChange}
                        required
                        min={tailorMadeData.startDate}
                        className="w-full px-4 py-3 rounded-lg border-2 border-rolex-gold bg-rolex-champagne text-rolex-green focus:ring-2 focus:ring-rolex-gold focus:border-rolex-gold transition-colors duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Destinations (States/UTs in India) *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={citySearch}
                        onChange={e => setCitySearch(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter' && filteredCities.length > 0) {
                            const city = filteredCities[0];
                            if (!tailorMadeData.destinations.includes(city)) {
                              setTailorMadeData(prev => ({
                                ...prev,
                                destinations: [...prev.destinations, city]
                              }));
                            }
                            setCitySearch('');
                          }
                        }}
                        placeholder="Type to search cities..."
                        className="w-full px-4 py-3 rounded-lg border-2 border-rolex-gold bg-rolex-champagne text-rolex-green"
                      />
                      {citySearch && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                          {filteredCities.map((city, idx) => (
                            <div
                              key={idx}
                              onClick={() => {
                                if (!tailorMadeData.destinations.includes(city)) {
                                  setTailorMadeData(prev => ({
                                    ...prev,
                                    destinations: [...prev.destinations, city]
                                  }));
                                }
                                setCitySearch('');
                              }}
                              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            >
                              {city}
                            </div>
                          ))}
                          {filteredCities.length === 0 && (
                            <div className="px-4 py-2 text-gray-500">No cities found</div>
                          )}
                        </div>
                      )}
                    </div>

                    {tailorMadeData.destinations.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Selected Destinations:</p>
                        <div className="flex flex-wrap gap-2">
                          {tailorMadeData.destinations.map((destination, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800"
                            >
                              {destination}
                              <button
                                type="button"
                                onClick={() => {
                                  setTailorMadeData(prev => ({
                                    ...prev,
                                    destinations: prev.destinations.filter(dest => dest !== destination)
                                  }));
                                }}
                                className="ml-2 w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors text-xs font-bold"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {tailorMadeData.destinations.length === 0 && (
                      <p className="text-sm text-gray-500 mt-1">Please select at least one destination</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Hotel Category *
                      </label>
                      <select
                        name="hotelCategory"
                        value={tailorMadeData.hotelCategory}
                        onChange={handleTailorMadeChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-rolex-gold bg-rolex-champagne text-rolex-green focus:ring-2 focus:ring-rolex-gold focus:border-rolex-gold transition-colors duration-200"
                      >
                        <option value="">Select</option>
                        <option value="Budget">Budget</option>
                        <option value="Standard">Standard (3*)</option>
                        <option value="Deluxe">Deluxe (4*)</option>
                        <option value="Luxury">Luxury (5*)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Interests
                      </label>
                      <input
                        type="text"
                        name="interests"
                        value={tailorMadeData.interests}
                        onChange={handleTailorMadeChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-rolex-gold bg-rolex-champagne text-rolex-green focus:ring-2 focus:ring-rolex-gold focus:border-rolex-gold transition-colors duration-200 placeholder:text-rolex-mutedChampagne"
                        placeholder="e.g. Culture, Wildlife, Adventure"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Special Requests
                    </label>
                    <textarea
                      name="specialRequests"
                      value={tailorMadeData.specialRequests}
                      onChange={handleTailorMadeChange}
                      rows="4"
                      className="w-full px-4 py-3 rounded-lg border-2 border-rolex-gold bg-rolex-champagne text-rolex-green focus:ring-2 focus:ring-rolex-gold focus:border-rolex-gold transition-colors duration-200 resize-none"
                      placeholder="Let us know any special requirements or requests..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-rolex-gold hover:bg-rolex-brassHover disabled:bg-rolex-gold/60 text-rolex-green py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center space-x-2 border-2 border-rolex-gold"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6 text-rolex-green" />
                        <span>Send Custom Package Request</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                // Regular Contact Form
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-rolex-gold bg-rolex-champagne text-rolex-green focus:ring-2 focus:ring-rolex-gold focus:border-rolex-gold transition-colors duration-200 placeholder:text-rolex-mutedChampagne"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-rolex-gold bg-rolex-champagne text-rolex-green focus:ring-2 focus:ring-rolex-gold focus:border-rolex-gold transition-colors duration-200 placeholder:text-rolex-mutedChampagne"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Country Code
                      </label>
                      <select
                        name="countryCode"
                        value={tailorMadeData.countryCode}
                        onChange={handleTailorMadeChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-rolex-gold bg-rolex-champagne text-rolex-green focus:ring-2 focus:ring-rolex-gold focus:border-rolex-gold transition-colors duration-200"
                      >
                        {countryCodes.map((code, index) => (
                          <option key={index} value={code}>{code}</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={tailorMadeData.phone}
                        onChange={handleTailorMadeChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-rolex-gold bg-rolex-champagne text-rolex-green focus:ring-2 focus:ring-rolex-gold focus:border-rolex-gold transition-colors duration-200 placeholder:text-rolex-mutedChampagne"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Country *
                    </label>
                    <select
                      name="country"
                      value={tailorMadeData.country}
                      onChange={handleTailorMadeChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-rolex-gold bg-rolex-champagne text-rolex-green focus:ring-2 focus:ring-rolex-gold focus:border-rolex-gold transition-colors duration-200"
                    >
                      <option value="">Select your country</option>
                      {countries.map((country, index) => (
                        <option key={index} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-rolex-gold bg-rolex-champagne text-rolex-green focus:ring-2 focus:ring-rolex-gold focus:border-rolex-gold transition-colors duration-200 placeholder:text-rolex-mutedChampagne"
                      placeholder="Enter subject"
                    />
                  </div>



                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 rounded-lg border-2 border-rolex-gold bg-rolex-champagne text-rolex-green focus:ring-2 focus:ring-rolex-gold focus:border-rolex-gold transition-colors duration-200 resize-none"
                      placeholder="Tell us about your travel plans, preferences, or any questions you have..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-rolex-gold hover:bg-rolex-brassHover disabled:bg-rolex-gold/60 text-rolex-green py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center space-x-2 border-2 border-rolex-gold"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6 text-rolex-green" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {isSubmitted && (
                <div className="text-center py-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl mt-6">
                  <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MessageCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                </div>
              )}
              {submitError && (
                <div className="text-center py-12 bg-red-50 dark:bg-red-900/20 rounded-2xl mt-6">
                  <div className="w-20 h-20 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Submission Failed
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    {submitError}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Map & Office Info */}
            <motion.div className="space-y-8" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Offices
                </h3>
                <div className="space-y-6">
                  {offices.map((office, index) => (
                    <div key={index} className="bg-rolex-emeraldGray rounded-xl p-6 border-2 border-rolex-gold">
                      <h4 className="text-lg font-bold text-rolex-gold mb-3">
                        {office.city}
                      </h4>
                      <div className="space-y-2 text-rolex-champagne">
                        <div className="flex items-start space-x-3">
                          <MapPin className="w-5 h-5 text-rolex-gold mt-0.5 flex-shrink-0" />
                          <span>{office.address}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-rolex-gold flex-shrink-0" />
                          <span>{office.phone}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-rolex-gold flex-shrink-0" />
                          <span>{office.email}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="rounded-xl overflow-hidden w-full h-64 md:h-96 shadow-md">
                <iframe
                  title="S & C Tours and Travels Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.801715576065!2d77.2205492!3d28.6357043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfdb7ba097727%3A0xecad9f2750bfaf9!2sS%20%26%20C%20Tours%20and%20Travels!5e0!3m2!1sen!2sin!4v1752613623325!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="border-0"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section className="py-20 bg-rolex-champagne text-rolex-green" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-rolex-gold mb-6 drop-shadow">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-rolex-green max-w-3xl mx-auto">
              Find answers to common questions about our tours and services
            </p>
          </motion.div>

          <motion.div className="max-w-4xl mx-auto space-y-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={{ visible: { transition: { staggerChildren: 0.13 } } }}>
            {faqs.map((faq, index) => (
              <motion.div key={index} className="bg-rolex-emeraldGray rounded-xl p-6 shadow-lg border-2 border-rolex-gold" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}>
                <h3 className="text-lg font-bold text-rolex-gold mb-3">
                  {faq.question}
                </h3>
                <p className="text-rolex-champagne leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section className="py-20 bg-rolex-darkGreen text-rolex-gold" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}>
        <div className="container mx-auto px-4 text-center">
          <motion.h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-6 drop-shadow" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>Ready to Plan Your Adventure?</motion.h2>
          <motion.p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 text-rolex-champagne" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>Our travel experts are standing by to help you create the perfect Indian adventure. Contact us today to get started!</motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={{ visible: { transition: { staggerChildren: 0.13 } } }}>
            <motion.button
              onClick={() => window.open('tel:+918527921295', '_self')}
              className="bg-rolex-gold text-rolex-green hover:bg-rolex-brassHover hover:shadow-lg focus:shadow-lg px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 border-2 border-rolex-gold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span>Call Us</span>
            </motion.button>
            <motion.button
              onClick={() => window.open('https://wa.me/918527921295', '_blank')}
              className="bg-transparent border-2 border-rolex-gold text-rolex-gold hover:bg-rolex-gold hover:text-rolex-green hover:shadow-lg focus:shadow-lg px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span>WhatsApp</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Contact;