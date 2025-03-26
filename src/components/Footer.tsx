import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from './Button';

export function Footer() {
  const navigation = {
    solutions: [
      { name: 'Voice AI', href: '/voice-ai' },
      { name: 'Chatbot', href: '/chatbot' },
      { name: 'Website', href: '/website' },
      { name: 'SEO', href: '/seo' },
      { name: 'Funnels', href: '/funnels' },
      { name: 'Paid Ads', href: '/paid-ads' },
    ],
    company: [
      { name: 'Home', href: '/' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
      { name: 'Book a Call', href: '/booking' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  };

  return (
    <footer className="bg-gradient-to-b from-white to-indigo-50/30" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur"></div>
                <Brain className="relative h-8 w-8 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Level 16 Media
              </span>
            </div>
            <p className="text-gray-500 text-base">
              AI-powered marketing solutions that help service businesses automate growth and scale efficiently.
            </p>
            <div className="space-y-4 bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-indigo-600" />
                <span className="ml-3 text-gray-500">1-800-AI-GROWTH</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-indigo-600" />
                <span className="ml-3 text-gray-500">hello@level16media.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-indigo-600" />
                <span className="ml-3 text-gray-500">San Francisco, CA</span>
              </div>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Solutions
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Company
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    Legal
                  </h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {navigation.legal.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className="text-base text-gray-500 hover:text-gray-900"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200/50 pt-8">
          <div className="max-w-lg mx-auto text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Ready to Scale Your Business?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking">
                <Button variant="primary" size="sm" icon className="shadow-lg shadow-indigo-600/20">
                  Book Free Strategy Call
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                Get Free AI Audit
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200/50 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} Level 16 Media. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}