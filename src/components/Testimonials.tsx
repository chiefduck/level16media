import React from 'react';
import { Star } from 'lucide-react';
import { Button } from './Button';

const testimonials = [
  {
    name: 'Sarah Thompson',
    role: 'CEO, Thompson Law Firm',
    metrics: '40% more consultations booked',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote: "The AI assistant handles our client intake 24/7, scheduling consultations while we sleep. It's like having a full-time receptionist at a fraction of the cost.",
  },
  {
    name: 'Michael Chen',
    role: 'Founder, Pacific Real Estate',
    metrics: '3x increase in qualified leads',
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote: 'Our new website and chatbot convert 3x more leads than our old site. Level 16 delivered exactly what they promised - automated growth.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Director, Elite Financial Planning',
    metrics: '65% reduction in response time',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote: "The marketing automation has transformed our business. We're booking high-quality consultations on autopilot, and our team can focus on serving clients.",
  },
];

export function Testimonials() {
  return (
    <div id="testimonials" className="relative bg-gray-50 py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
      }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span className="gradient-text">Trusted by Service Businesses</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            See how AI automation is transforming businesses like yours
          </p>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-xl shadow-lg p-8 card-hover"
            >
              <div className="flex items-center space-x-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <div className="mt-4 inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-green-50 to-emerald-50 text-emerald-700">
                {testimonial.metrics}
              </div>
              <p className="mt-6 text-gray-600 italic leading-relaxed text-lg">"{testimonial.quote}"</p>
              <div className="mt-8 flex items-center">
                <img
                  className="h-12 w-12 rounded-full"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button variant="primary" size="lg" icon>
            Book Your Free Strategy Call
          </Button>
        </div>
      </div>
    </div>
  );
}