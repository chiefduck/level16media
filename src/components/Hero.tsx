import React from 'react';
import { Bot, Rocket, Zap } from 'lucide-react';
import { Button } from './Button';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

/**
 * Highlight metrics shown in the hero section
 * Each metric includes an icon, title, value, and descriptive text
 */
const highlights = [
  { 
    icon: Bot, 
    title: 'Lead Response', 
    value: 2, 
    suffix: 'min', 
    subtitle: 'Average Response Time' 
  },
  { 
    icon: Rocket, 
    title: 'More Leads', 
    value: 147, 
    suffix: '%', 
    subtitle: 'Average Monthly Increase' 
  },
  { 
    icon: Zap, 
    title: 'Time Saved', 
    value: 40, 
    suffix: 'hrs', 
    subtitle: 'Monthly Time Savings' 
  },
];

/**
 * Hero component - Main landing section of the website
 * Features headline, description, CTAs, and key metrics
 */
export function Hero() {
  // Track when metrics section comes into view for animation
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white via-indigo-50/20 to-white">
      {/* Decorative background elements */}
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-indigo-100/40 to-purple-100/40 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-100/40 to-purple-100/40 rounded-full blur-3xl"></div>
      </div>

      {/* Main content container */}
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-28">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl sm:text-6xl md:text-7xl tracking-tight font-extrabold">
                <span className="block text-gray-900">AI-Powered</span>
                <span className="block mt-1 gradient-text">Marketing & Growth</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 sm:text-2xl max-w-3xl mx-auto leading-relaxed">
                We build high-converting websites & automate your sales with AI chatbots and voice assistants. More leads, less manual work. Our AI solutions handle customer service 24/7 while you focus on growing your business.
              </p>
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                <div>
                  <Button variant="primary" size="lg" icon className="w-full sm:w-auto shadow-xl shadow-indigo-600/20">
                    Book Your Free Strategy Call
                  </Button>
                </div>
                <div>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Get Your Free AI Audit
                  </Button>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500 font-medium">
                🚀 Free 30-minute strategy session • No commitment required
              </p>
              
              {/* Metrics Grid */}
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    ref={ref}
                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-indigo-100 card-hover border border-indigo-50"
                  >
                    <div className="flex items-center justify-center mb-4">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-sm opacity-50"></div>
                        <item.icon className="relative h-8 w-8 text-indigo-600" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {item.prefix}
                      {inView && (
                        <CountUp
                          end={item.value}
                          duration={2}
                          separator=","
                        />
                      )}
                      {item.suffix}
                    </div>
                    <div className="text-sm font-medium text-gray-600">{item.subtitle}</div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}