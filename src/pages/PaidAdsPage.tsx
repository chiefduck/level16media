import React from 'react';
import { Target, Zap, BarChart3, DollarSign, TrendingUp, Users } from 'lucide-react';
import { Button } from '../components/Button';

const features = [
  {
    icon: Target,
    title: 'Smart Targeting',
    description: 'AI finds your ideal customers across platforms.',
  },
  {
    icon: Zap,
    title: 'Quick Results',
    description: 'Start generating leads within 24 hours.',
  },
  {
    icon: BarChart3,
    title: 'ROI Focused',
    description: 'Every dollar tracked and optimized for results.',
  },
  {
    icon: TrendingUp,
    title: 'Scale Fast',
    description: 'Rapidly expand your reach and conversions.',
  },
];

const caseStudies = [
  {
    title: 'Law Firm Growth',
    platform: 'Google Ads',
    stats: {
      spend: '$5,000',
      leads: '127',
      cpl: '$39',
      roi: '485%'
    },
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Dental Practice',
    platform: 'Meta Ads',
    stats: {
      spend: '$3,500',
      leads: '94',
      cpl: '$37',
      roi: '412%'
    },
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Real Estate',
    platform: 'LinkedIn Ads',
    stats: {
      spend: '$7,500',
      leads: '86',
      cpl: '$87',
      roi: '524%'
    },
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
];

export function PaidAdsPage() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Paid Advertising</span>
            <span className="block mt-2 gradient-text">AI-Optimized Campaigns</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Generate qualified leads on autopilot with AI-powered paid advertising. Maximize ROI across Google, Meta, and LinkedIn.
          </p>

          {/* Platform Comparison */}
          <div className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Platform Performance Comparison</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Google Ads</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm opacity-75">Avg. Cost per Lead</div>
                    <div className="text-2xl font-bold">$35-65</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-75">Lead Quality</div>
                    <div className="flex text-yellow-400">
                      {'★'.repeat(5)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm opacity-75">Best For</div>
                    <div className="text-sm mt-1">Service-based businesses</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">Meta Ads</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm opacity-75">Avg. Cost per Lead</div>
                    <div className="text-2xl font-bold">$25-45</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-75">Lead Quality</div>
                    <div className="flex text-yellow-400">
                      {'★'.repeat(4)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm opacity-75">Best For</div>
                    <div className="text-sm mt-1">B2C businesses</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4">LinkedIn Ads</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm opacity-75">Avg. Cost per Lead</div>
                    <div className="text-2xl font-bold">$75-120</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-75">Lead Quality</div>
                    <div className="flex text-yellow-400">
                      {'★'.repeat(5)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm opacity-75">Best For</div>
                    <div className="text-sm mt-1">B2B businesses</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Case Studies Grid */}
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {caseStudies.map((study) => (
              <div 
                key={study.title}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-indigo-50 card-hover"
              >
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${study.image})` }}
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{study.title}</h3>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium">
                      {study.platform}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Ad Spend</div>
                      <div className="text-lg font-semibold text-gray-900">{study.stats.spend}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Leads</div>
                      <div className="text-lg font-semibold text-gray-900">{study.stats.leads}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Cost/Lead</div>
                      <div className="text-lg font-semibold text-gray-900">{study.stats.cpl}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">ROI</div>
                      <div className="text-lg font-semibold text-green-600">{study.stats.roi}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
            Get Your Free Ads Strategy
          </Button>
          <p className="mt-4 text-sm text-gray-500">
            No commitment required • Custom campaign plan within 24 hours
          </p>
        </div>
      </div>
    </div>
  );
}