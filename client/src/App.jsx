import React from 'react';
import { ToastContainer } from 'react-toastify';
import { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import TourDetail from './pages/admin/TourDetail.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import FloatingCTA from './components/FloatingCTA.jsx';
import AnimatedPageWrapper from './components/AnimatedPageWrapper.jsx';
import MultiContactButton from './components/MultiContact.jsx';
import ChatbotWidget from './components/ChatbotWidget.jsx';
import CityTourListPage from './pages/Cities.jsx';
import CityTourDetailPage from './pages/CityTourDetailpage.jsx';
import TourDetailPage from './pages/TourDetailUser.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import DownloadPopup from './components/DownloadPopup.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import AdminDashboard from './pages/admin/AdminDashboarsd.jsx';
import CreateCity from './pages/admin/Createcity.jsx';
import AddTour from './pages/admin/AddTour.jsx';
import CityList from './pages/admin/Citylist.jsx';
import CityTours from './pages/admin/CityTour.jsx';
import TourDetailUser from './pages/TourDetailUser.jsx';
import EditCity from './pages/admin/EditCity.jsx';
import EditTour from './pages/admin/EditTour.jsx';
import ReviewManagement from './pages/admin/ReviewManagement.jsx';
import FeaturedTours from './pages/admin/FeaturedTours.jsx';
import Cities from './pages/Cities.jsx';
import { Scroll } from 'lucide-react';
import ScrollToTop from './components/ScrollToTop.jsx';
import ContactSubmissions from './pages/admin/ContactSubmissions.jsx';

// Global loading context
const LoadingContext = createContext({ show: () => {}, hide: () => {}, isLoading: false });
export const useGlobalLoading = () => useContext(LoadingContext);

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const location = useLocation();
  const navigationType = useNavigationType();

  // Initial load
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Route change loader
  useEffect(() => {
    if (navigationType !== 'POP') {
      setLoading(true);
      setFadeOut(false);
      const timer = setTimeout(() => setFadeOut(true), 800); // fade out after 800ms
      const timer2 = setTimeout(() => setLoading(false), 1200);
      return () => { clearTimeout(timer); clearTimeout(timer2); };
    }
  }, [location, navigationType]);

  // Loader context for API/data fetches
  const show = () => { setLoading(true); setFadeOut(false); };
  const hide = () => { setFadeOut(true); setTimeout(() => setLoading(false), 400); };

  return (
    <LoadingContext.Provider value={{ show, hide, isLoading: loading }}>
      <>
        {loading && (
          <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-rolex-darkGreen transition-opacity duration-500 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <span className="text-5xl sm:text-6xl font-cinzel font-bold text-rolex-gold tracking-wide drop-shadow-xl text-center">
              S & C Tours
            </span>
          </div>
        )}
        {!loading && (
          <ThemeProvider>
            <ScrollToTop/>
            <AuthProvider>
              <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
                <Header />
                <main>
                  <AnimatedPageWrapper>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/tours" element={<Cities />} />
                      <Route path="/tours/:id" element={<TourDetail />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/citytour/:id" element={<CityTourDetailPage />} />
                      {/* <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} /> */}
                      <Route path="/tour/:id" element={<TourDetailUser />} />
                      {/* admin routes */}
                      <Route path="/admin" element={<AdminLogin />} />
                      <Route path="/admin/dashboard" element={<AdminDashboard />} />
                      <Route path="/admin/createcity" element={<CreateCity />} />
                      <Route path="/admin/addtour/:cityId" element={<AddTour />} />
                      <Route path="/admin/getcities" element={<CityList />} />
                      <Route path="/admin/city/:cityId/tours" element={<CityTours />} />
                      <Route path="/admin/tour/:id" element={<TourDetail />} />
                      <Route path="/admin/editcity/:id" element={<EditCity />} />
                      <Route path="/admin/edit-tour/:id" element={<EditTour />} />
                      <Route path="/admin/reviews" element={<ReviewManagement />} />
                      <Route path="/admin/featured-tours" element={<FeaturedTours />} />
                      <Route path="/admin/contact-submissions" element={<ContactSubmissions />} />
                    </Routes>
                  </AnimatedPageWrapper>
                </main>
                <Footer />
           
                <MultiContactButton />
                <ChatbotWidget />
                <DownloadPopup />
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </div>
            </AuthProvider>
          </ThemeProvider>
        )}
      </>
    </LoadingContext.Provider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;