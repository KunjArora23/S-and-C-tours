import React from 'react';
import { Award, Users, Globe, Heart, Shield, Clock, Star, MapPin, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const About = () => {
  const navigate = useNavigate();
  const stats = [
    {
      icon: Package,
      value: '2000+',
      label: 'Packages Created',
    },
    { icon: Users, label: 'Happy Travelers', value: '20,000+' },
    { icon: Globe, label: 'Destinations', value: '50+' },
   { icon: Star, label: 'Average Rating', value: '4.8/5' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Travel',
      description: 'We believe travel transforms lives and creates lasting memories. Our passion drives us to craft extraordinary experiences.'
    },
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Your safety and satisfaction are our top priorities. We maintain the highest standards in all our services.'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Our experienced travel experts and local guides ensure authentic and enriching travel experiences.'
    },
    {
      icon: Globe,
      title: 'Sustainable Tourism',
      description: 'We promote responsible travel that benefits local communities and preserves cultural heritage.'
    }
  ];

  const team = [
    {
      name: 'Shyam Baba',
      role: 'First Founder',
      image: '/shyam.png',
      description: 'The heart and soul behind S&C Tours, Shyam Baba began our journey over 35 years ago with a spirit of kindness and true Indian hospitality.'
    },
    {
      name: 'Raju Bhai',
      role: 'Second Founder',
      image: '/raju.jpeg',
      description: 'Joining his elder brother Shyam Baba, Raju Bhai brought youthful energy and innovative thinking to transform their humble auto rickshaw service into a beloved family travel company. His dedication to creating authentic experiences and building lasting relationships with travelers has been instrumental in S&C Tours\' success.'
    }
  ];

  const milestones = [
    { year: '1995', event: 'Shyam Baba laid the foundation pillars of S&C Tours, starting with his humble auto rickshaw service and genuine hospitality towards travelers' },
    { year: '2010', event: 'Founded Incredible Tours with a vision to showcase India\'s diversity' },
    { year: '2013', event: 'Launched luxury heritage tours, partnering with palace hotels' },
    { year: '2016', event: 'Expanded to adventure tourism with Himalayan trekking expeditions' },
    { year: '2019', event: 'Received "Best Tour Operator" award from India Tourism Board' },
    { year: '2021', event: 'Introduced sustainable tourism practices and eco-friendly tours' },
    { year: '2024', event: 'Celebrating 50,000+ satisfied travelers and expanding globally' },
    { year: '2025', event: 'The next generation steps forward to carry forward the legacy, bringing fresh perspectives while honoring the values of hospitality and authenticity established by Shyam Baba and Raju Bhai' }
  ];

  return (
    <motion.div className="min-h-screen bg-rolex-champagne text-rolex-green" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <div className="container mx-auto px-4"><BackButton /></div>
      {/* Hero Section */}
      <motion.section className="relative py-20 bg-rolex-darkGreen text-rolex-gold overflow-hidden" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="max-w-4xl mx-auto text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-6xl font-cinzel font-bold mb-6 animate-fade-in drop-shadow-xl">About Incredible Tours</h1>
            <p className="text-xl text-rolex-champagne mb-8">Incredible Tours is your trusted partner for exploring the wonders of India. With decades of experience, we craft unforgettable journeys tailored to your dreams.</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-rolex-champagne to-transparent"></div>
      </motion.section>

      {/* Stats Section */}
      <motion.section className="py-16 bg-rolex-champagne text-rolex-green" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}>
        <div className="container mx-auto px-4">
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
            {[{label:'Happy Travelers',value:'50,000+'},{label:'Years Experience',value:'25+'},{label:'Destinations',value:'100+'},{label:'Tours',value:'2000+'}].map((stat, i) => (
              <motion.div key={stat.label} className="text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i*0.1, type: 'spring', stiffness: 80 }}>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2 text-rolex-gold">{stat.value}</div>
                <div className="text-rolex-mutedChampagne text-sm sm:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-rolex-gold mb-6 drop-shadow">
                Our Story
              </h2>
              <p className="text-xl text-rolex-green leading-relaxed">
                Born from a passion for travel and a deep love for India's incredible heritage
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-rolex-green leading-relaxed font-semibold">
                  Welcome to S&amp;C Tours — where every journey begins not with a booking, but with a blessing.
                </p>
                <p className="text-lg text-rolex-green leading-relaxed">
                  Our story began over 35 years ago on the vibrant streets of Delhi. It wasn’t built on technology or big offices — it was born from a simple act of kindness. Shyam Baba, the elder in our family, drove a modest auto rickshaw and often stopped to help foreign travelers who looked lost, overwhelmed, or simply curious about India. Though he didn’t speak fluent English, he understood the true language of hospitality — warmth, honesty, and respect.
                </p>
                <p className="text-lg text-rolex-green leading-relaxed">
                  A few years later, his younger brother, Raju Bhai, joined him. Together, they did more than just show people around. They welcomed guests like family, shared home-cooked meals, and created bonds that crossed cultures and continents.
                </p>
                <p className="text-lg text-rolex-green leading-relaxed">
                  As travelers kept returning — not for luxury, but for love, laughter, and loyalty — a deeper dream began to grow. The next generation of our family came together, determined to take this legacy forward. That’s how S&amp;C Tours was born — a heartfelt family-run travel company offering soulful, safe, and personalized journeys across India.
                </p>
                <p className="text-lg text-rolex-green leading-relaxed">
                  From the snowy peaks of the Himalayas to the backwaters of Kerala, from ancient temples to colorful festivals, we craft every trip with care. With over 20,000 happy guests from more than 40 countries, we’re proud to say: this isn’t just travel. It’s tradition.
                </p>
                <p className="text-lg text-rolex-green leading-relaxed">
                  We don’t treat you like tourists — we treat you like our own. Because with us, you don’t just see India.
                </p>
                <p className="text-lg text-rolex-green leading-relaxed font-bold italic">
                  You feel it. You belong.
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Our Story"
                  className="rounded-2xl shadow-luxury w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-rolex-champagne text-rolex-green">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-rolex-gold mb-6 drop-shadow">
              Our Values
            </h2>
            <p className="text-xl text-rolex-green max-w-3xl mx-auto">
              The principles that guide everything we do and shape every experience we create
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-rolex-emeraldGray rounded-2xl p-8 shadow-lg hover:shadow-luxury transition-shadow duration-300 group border-2 border-rolex-gold">
                <div className="w-16 h-16 bg-rolex-gold/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-rolex-gold transition-colors duration-300">
                  <value.icon className="w-8 h-8 text-rolex-gold group-hover:text-rolex-darkGreen transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-rolex-gold mb-4">
                  {value.title}
                </h3>
                <p className="text-rolex-champagne leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <motion.section className="py-16 bg-rolex-champagne text-rolex-green" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}>
        <div className="container mx-auto px-4">
          <motion.h2 className="text-3xl md:text-4xl font-cinzel font-bold mb-10 text-center drop-shadow-xl text-rolex-gold" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>Meet Our Team</motion.h2>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={{ visible: { transition: { staggerChildren: 0.13 } } }}>
            {team.map((member, i) => (
              <motion.div key={i} className="bg-rolex-emeraldGray rounded-2xl p-8 shadow-lg border-2 border-rolex-gold flex flex-col items-center text-center hover:shadow-luxury transition-all duration-300" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i*0.1, type: 'spring', stiffness: 80 }}>
                <img src={member.image} alt={member.name} className="w-40 h-40 rounded-full mb-6 border-4 border-rolex-gold shadow-xl object-cover hover:scale-105 transition-transform duration-300" />
                <h3 className="text-2xl font-bold text-rolex-gold mb-2">{member.name}</h3>
                <p className="text-rolex-gold text-lg mb-4 font-semibold">{member.role}</p>
                <p className="text-rolex-champagne text-base leading-relaxed font-medium">{member.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section className="py-16" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, type: 'spring', stiffness: 80 }}>
        <div className="container mx-auto px-4">
          <motion.h2 className="text-3xl md:text-4xl font-cinzel font-bold text-rolex-gold mb-10 text-center drop-shadow-xl" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>Our Journey</motion.h2>
          <motion.div className="max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={{ visible: { transition: { staggerChildren: 0.13 } } }}>
            <ul className="space-y-8">
                {milestones.map((milestone, index) => (
                <motion.li key={index} className="relative flex items-start" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index*0.1, type: 'spring', stiffness: 80 }}>
                  <div className="flex-shrink-0 w-16 h-16 bg-rolex-gold rounded-full flex items-center justify-center text-rolex-green font-bold text-lg shadow-lg">
                      {milestone.year.slice(-2)}
                    </div>
                  <div className="ml-8 bg-rolex-emeraldGray rounded-xl p-6 shadow-lg flex-1 border-2 border-rolex-gold">
                    <div className="text-rolex-gold font-bold text-lg mb-2">
                        {milestone.year}
                      </div>
                    <p className="text-rolex-champagne leading-relaxed">
                        {milestone.event}
                      </p>
                  </div>
                </motion.li>
                ))}
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="py-20 bg-rolex-darkGreen text-rolex-gold">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-6 drop-shadow">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 text-rolex-champagne">
            Let us create an unforgettable travel experience tailored just for you. 
            Discover the incredible beauty and diversity of India with our expert team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/contact')}
              className="bg-rolex-gold text-rolex-green hover:bg-rolex-brassHover px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-300 border-2 border-rolex-gold"
            >
              Plan Your Trip
            </button>
            <button 
              onClick={() => {
                // Trigger the contact popup by dispatching a custom event
                window.dispatchEvent(new CustomEvent('openContactPopup'));
              }}
              className="bg-transparent border-2 border-rolex-gold text-rolex-gold hover:bg-rolex-gold hover:text-rolex-green px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;