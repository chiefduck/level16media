import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Globe2, MessageSquare, Rocket, Search, Workflow } from 'lucide-react';

const services = [
  {
    icon: Bot,
    name: 'AI Voice Assistants',
    href: '/voice-ai',
    description: 'Never miss a call again. Our AI-powered voice assistant answers, qualifies leads, and books appointments for you—24/7. Includes call recording and analytics.',
    cta: 'See Voice AI Demo →',
  },
  {
    icon: MessageSquare,
    name: 'Smart Chatbots',
    href: '/chatbot',
    description: 'Convert more website visitors with AI chat that understands customer needs and books meetings automatically. Proven to increase lead conversion by 35%.',
    cta: 'Try Live Chat Demo →',
  },
  {
    icon: Globe2,
    name: 'Website Design',
    href: '/website',
    description: 'Get a lightning-fast, conversion-optimized website that ranks in Google. Built for mobile and optimized for lead generation with clear calls-to-action.',
    cta: 'View Portfolio →',
  },
  {
    icon: Search,
    name: 'SEO & Local Search',
    href: '/seo',
    description: 'Dominate local search results with AI-powered SEO. We optimize your site to attract qualified leads searching for your services in your area.',
    cta: 'Free SEO Audit →',
  },
  {
    icon: Workflow,
    name: 'Marketing Funnels',
    href: '/funnels',
    description: 'Convert leads into clients with automated follow-up sequences. Our AI personalizes each interaction based on prospect behavior and interests.',
    cta: 'See Sample Funnel →',
  },
  {
    icon: Rocket,
    name: 'Paid Advertising',
    href: '/paid-ads',
    description: 'Scale your reach with AI-optimized ads on Google, Meta, and LinkedIn. Our systems continuously optimize your campaigns for maximum ROI.',
    cta: 'View Case Studies →',
  },
];

export function Services() {
  return (
    <div id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span className="gradient-text">AI-Powered Growth Solutions</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to automate and scale your service business
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.name}
              className="relative group bg-white p-8 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-xl shadow-lg card-hover"
            >
              <div>
                <span className="rounded-xl inline-flex p-4 bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600">
                  <service.icon className="h-8 w-8" />
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold">
                  <Link to={service.href} className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {service.name}
                  </Link>
                </h3>
                <p className="mt-3 text-base text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                <Link
                  to={service.href}
                  className="mt-6 inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                >
                  {service.cta}
                </Link>
              </div>
              <span
                className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                aria-hidden="true"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}