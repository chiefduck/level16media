import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Brain, Bot, Workflow, Home } from 'lucide-react';
import { Button } from './Button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Voice AI', href: '/voice-ai' },
    { name: 'Chatbot', href: '/chatbot' },
    { name: 'Website', href: '/website' },
    { name: 'SEO', href: '/seo' },
    { name: 'Funnels', href: '/funnels' },
    { name: 'Paid Ads', href: '/paid-ads' },
  ];

  return (
    <nav className="fixed w-full bg-white/70 backdrop-blur-xl z-50 border-b border-gray-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur"></div>
                <Brain className="relative h-8 w-8 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Level 16 Media
              </span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-gray-600 hover:text-indigo-600 transition-colors duration-200 font-medium ${
                  location.pathname === item.href ? 'text-indigo-600' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button variant="primary" size="sm" icon className="shadow-lg shadow-indigo-600/20">
              <Link to="/booking">Book a Call</Link>
            </Button>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-200"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-white/80 backdrop-blur-xl border-b border-gray-100/50">
          <div className="px-4 pt-3 pb-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-2 rounded-lg text-base font-medium transition-all duration-300 hover:bg-indigo-50/50 transform hover:translate-x-1 ${
                  location.pathname === item.href ? 'text-indigo-600 bg-indigo-50/30' : 'text-gray-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-6 px-4">
              <Button variant="primary" size="sm" icon className="w-full">
                <Link to="/booking">Book a Call</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}