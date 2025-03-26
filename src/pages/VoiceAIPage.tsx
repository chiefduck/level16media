import React from 'react';
import { Bot, Phone, Zap, BarChart3, MessageSquare, Clock } from 'lucide-react';
import { Button } from '../components/Button';
import { PhoneInput } from '../components/PhoneInput';
import { makePhoneCall } from '../services/blandApi';
import { useState } from 'react';

const features = [
  {
    icon: Bot,
    title: '24/7 Availability',
    description: 'Never miss a call with AI that handles inquiries around the clock.'
  },
  {
    icon: Phone,
    title: 'Natural Conversations',
    description: 'Human-like interactions that qualify leads and book appointments.'
  },
  {
    icon: BarChart3,
    title: 'Call Analytics',
    description: 'Track performance and optimize your conversion funnel.'
  },
  {
    icon: Clock,
    title: 'Time Savings',
    description: 'Save 40+ hours per month on call handling and follow-ups.'
  },
];

const results = [
  {
    title: 'Law Firm Success',
    description: 'Personal injury law firm automated client intake',
    image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    metrics: {
      calls: '250+ calls/month',
      bookings: '45% booking rate',
      savings: '60 hours saved'
    }
  },
  {
    title: 'Dental Practice',
    description: 'Multi-location dental office automated scheduling',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    metrics: {
      calls: '400+ calls/month',
      bookings: '52% booking rate',
      savings: '80 hours saved'
    }
  },
  {
    title: 'Real Estate Agency',
    description: 'Luxury real estate automated lead qualification',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    metrics: {
      calls: '150+ calls/month',
      bookings: '38% booking rate',
      savings: '45 hours saved'
    }
  },
];

export function VoiceAIPage() {
  const [isCallLoading, setIsCallLoading] = useState(false);
  const [callError, setCallError] = useState<string | null>(null);

  const handleDemoCall = async (phone: string) => {
    setIsCallLoading(true);
    setCallError(null);
    try {
      await makePhoneCall(phone);
    } catch (error) {
      setCallError('Sorry, we could not initiate the demo call. Please try again later.');
      console.error('Error making demo call:', error);
    } finally {
      setIsCallLoading(false);
    }
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">AI Voice Assistant</span>
            <span className="block mt-2 gradient-text">Never Miss a Call</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Our AI voice assistant handles calls 24/7, qualifies leads, and books appointments automatically. Try a live demo now.
          </p>
          
          {/* Demo Call Section */}
          <div className="mt-12 max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-indigo-50 p-8">
              <h2 className="text-2xl font-bold mb-6">Try a Live Demo Call</h2>
              <PhoneInput
                onSubmit={handleDemoCall}
                className={isCallLoading ? 'opacity-50 pointer-events-none' : ''}
              />
              {callError && (
                <div className="mt-4 text-red-600 text-sm">
                  {callError}
                </div>
              )}
            </div>
          </div>

          {/* Results Grid */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold text-center mb-12">Client Success Stories</h2>
            <div className="grid gap-8 lg:grid-cols-3">
              {results.map((result) => (
                <div 
                  key={result.title}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-indigo-50 card-hover"
                >
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${result.image})` }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{result.title}</h3>
                    <p className="text-gray-600 mb-4">{result.description}</p>
                    <div className="grid grid-cols-1 gap-4 bg-indigo-50/50 rounded-xl p-4">
                      <div className="text-lg font-semibold text-indigo-600">{result.metrics.calls}</div>
                      <div className="text-lg font-semibold text-green-600">{result.metrics.bookings}</div>
                      <div className="text-lg font-semibold text-purple-600">{result.metrics.savings}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid gap-8 md:grid-cols-2">
          {features.map((feature) => (
            <div 
              key={feature.title}
              className="relative bg-white p-8 rounded-2xl shadow-lg border border-indigo-50 card-hover"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-30"></div>
                  <feature.icon className="relative h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="mt-4 text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Call-to-Action */}
        <div className="mt-24 text-center">
          <Button 
            variant="primary" 
            size="lg" 
            icon 
            className="shadow-xl shadow-indigo-600/20"
          >
            Schedule Your Demo
          </Button>
          <p className="mt-4 text-sm text-gray-500">
            Free 2-minute demo call • No commitment required
          </p>
        </div>
      </div>
    </div>
  );
}