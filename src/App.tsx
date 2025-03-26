// Core imports
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Component imports
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ChatPreview } from './components/ChatPreview';
import { useScrollToTop } from './hooks/useScrollToTop';

// Page imports
import { HomePage } from './pages/HomePage';
import { VoiceAIPage } from './pages/VoiceAIPage';
import { ChatbotPage } from './pages/ChatbotPage';
import { WebsitePage } from './pages/WebsitePage';
import { SeoPage } from './pages/SeoPage';
import { FunnelsPage } from './pages/FunnelsPage';
import { PaidAdsPage } from './pages/PaidAdsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { CookiesPage } from './pages/CookiesPage';
import { BlogPage } from './pages/BlogPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { BookingPage } from './pages/BookingPage';

/**
 * Main App component that handles routing and layout structure
 * Includes navigation, main content area, footer, and floating components
 */
function App() {
  return (
    <BrowserRouter>
      <ScrollToTopWrapper />
      <div className="min-h-screen bg-white">
        <Navbar />
        {/* Main content wrapper with top padding for fixed navbar */}
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/voice-ai" element={<VoiceAIPage />} />
            <Route path="/chatbot" element={<ChatbotPage />} />
            <Route path="/website" element={<WebsitePage />} />
            <Route path="/seo" element={<SeoPage />} />
            <Route path="/funnels" element={<FunnelsPage />} />
            <Route path="/paid-ads" element={<PaidAdsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/booking" element={<BookingPage />} />
          </Routes>
          <Footer />
          <ScrollToTop />
          <ChatPreview />
        </div>
      </div>
    </BrowserRouter>
  );
}

// Wrapper component to use router hooks safely inside Router context
function ScrollToTopWrapper() {
  useScrollToTop();
  return null;
}

export default App;
