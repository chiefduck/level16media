import React from 'react';
import { Bot, Rocket, Wrench, CheckCircle2, ArrowRight, Users, BarChart3, MessageSquare } from 'lucide-react';
import { Button } from './Button';

const steps = [
  {
    name: 'We Build',
    description: 'Custom AI solutions tailored to your needs',
    icon: Wrench,
    features: [
      'High-converting website design',
      'AI chatbot configuration',
      'Voice assistant setup',
      'Marketing automation tools',
    ],
    metrics: {
      value: '2 Weeks',
      label: 'Average Setup Time'
    }
  },
  {
    name: 'We Automate',
    description: 'Your entire customer journey',
    icon: Bot,
    features: [
      '24/7 lead qualification',
      'Automated appointment booking',
      'Smart follow-up sequences',
      'Performance analytics',
    ],
    metrics: {
      value: '80%',
      label: 'Task Automation'
    }
  },
  {
    name: 'You Scale',
    description: 'Focus on growth while AI handles the rest',
    icon: Rocket,
    features: [
      'Increased conversion rates',
      'Reduced response times',
      'Higher customer satisfaction',
      'Scalable operations',
    ],
    metrics: {
      value: '3x',
      label: 'Average Growth'
    }
  },
];

const benefits = [
  { icon: MessageSquare, title: 'Instant Responses', description: 'AI handles inquiries 24/7' },
  { icon: Users, title: 'More Clients', description: 'Convert leads while you sleep' },
  { icon: BarChart3, title: 'Data Insights', description: 'Track and optimize performance' }
];

export function Process() {
  return (
    <div id="process" className="relative bg-gradient-to-b from-white via-indigo-50/20 to-white py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-indigo-100/40 to-purple-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-100/40 to-purple-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span className="gradient-text">How We Transform Your Business</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            A proven process to automate your growth with AI
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-3">
          {steps.map((step, idx) => (
            <div
              key={step.name}
              className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-indigo-50 card-hover"
            >
              <div className="flex items-center mb-6">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-sm opacity-50"></div>
                  <step.icon className="relative h-8 w-8 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900">{step.name}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-7 top-1/2 -translate-y-1/2 text-indigo-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
              
              <div className="space-y-3 mb-6">
                {step.features.map((feature) => (
                  <div key={feature} className="flex items-center text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between p-4 bg-indigo-50/50 rounded-xl">
                <div className="text-2xl font-bold text-indigo-600">
                  {step.metrics.value}
                </div>
                <div className="text-sm text-gray-600">
                  {step.metrics.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-12">
            Real Business Impact
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit) => (
              <div 
                key={benefit.title} 
                className="group bg-white/60 backdrop-blur-sm rounded-xl p-8 shadow-md border border-indigo-50 hover:border-indigo-200 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                    <benefit.icon className="relative h-10 w-10 text-indigo-600" />
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h4>
                <p className="text-gray-600 text-lg">{benefit.description}</p>
              </div>
            ))}
          </div>
          
          <Button 
            variant="primary" 
            size="lg" 
            icon
            className="shadow-lg shadow-indigo-600/20"
            onClick={() => {
              const element = document.getElementById('testimonials');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            See Client Success Stories
          </Button>
        </div>
      </div>
    </div>
  );
}