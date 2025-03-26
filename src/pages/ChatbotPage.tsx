import React from 'react';
import { MessageSquare, Bot, Zap, BarChart3 } from 'lucide-react';
import { Button } from '../components/Button';
import { CostCalculator } from '../components/CostCalculator';

const features = [
  {
    icon: MessageSquare,
    title: '24/7 Chat Support',
    description: 'Instant responses to customer inquiries at any time of day.',
  },
  {
    icon: Bot,
    title: 'Smart AI Brain',
    description: 'Advanced language processing for natural conversations.',
  },
  {
    icon: Zap,
    title: 'Instant Qualification',
    description: 'Automatically qualify leads and book meetings.',
  },
  {
    icon: BarChart3,
    title: 'Conversion Analytics',
    description: 'Track performance and optimize your conversion funnel.',
  },
];

export function ChatbotPage() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">AI Chatbot</span>
            <span className="block mt-2 gradient-text">Smart Lead Generation</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Convert more website visitors with AI chat that understands customer needs and books meetings automatically. Available 24/7 to engage and qualify leads.
          </p>
          
          {/* Interactive Demo Preview */}
          <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Try Our Chatbot Demo</h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Bot className="h-6 w-6" />
                  <p className="text-lg">Hi! How can I help you today?</p>
                </div>
                <div className="h-12 bg-white/20 rounded-lg animate-pulse"></div>
                <p className="text-sm opacity-80">Start typing to interact with our AI</p>
              </div>
              <Button 
                variant="secondary" 
                size="lg" 
                className="mt-6 w-full"
              >
                Start Chat Demo
              </Button>
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

        {/* ROI Calculator */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Calculate Your ROI</h2>
          <CostCalculator />
        </div>

        {/* Call-to-Action */}
        <div className="mt-24 text-center">
          <Button 
            variant="primary" 
            size="lg" 
            icon 
            className="shadow-xl shadow-indigo-600/20"
          >
            Book Your Free Demo
          </Button>
          <p className="mt-4 text-sm text-gray-500">
            No commitment required • 30-day free trial
          </p>
        </div>
      </div>
    </div>
  );
}