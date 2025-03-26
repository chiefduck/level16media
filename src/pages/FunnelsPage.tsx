import React from 'react';
import { Users, BarChart3, Rocket, Search, Code, Palette } from 'lucide-react';
import { Button } from '../components/Button';

const features = [
  {
    icon: Rocket,
    title: 'Personalization',
    description: 'AI customizes each interaction based on prospect behavior.'
  },
  {
    icon: Users,
    title: 'Lead Scoring',
    description: 'Automatically identify and prioritize hot leads.'
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'Track performance and optimize conversion rates.'
  }
];

const funnelTypes = [
  {
    title: 'Lead Generation',
    description: 'Capture and qualify new prospects automatically',
    image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    channels: ['Website Forms', 'Landing Pages', 'Social Media'],
    automation: ['Lead Scoring', 'Email Sequences', 'SMS Follow-up'],
    results: '+245% More Leads'
  },
  {
    title: 'Appointment Booking',
    description: 'Convert leads into scheduled consultations',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    channels: ['Email Marketing', 'SMS Reminders', 'Calendar Integration'],
    automation: ['Booking System', 'Reminder Sequences', 'Follow-up'],
    results: '+189% More Bookings'
  },
  {
    title: 'Client Onboarding',
    description: 'Streamline the new client experience',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    channels: ['Welcome Sequence', 'Document Collection', 'Training Videos'],
    automation: ['Task Assignment', 'Progress Tracking', 'Support Access'],
    results: '+156% Faster Onboarding'
  }
];

export function FunnelsPage() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Marketing Funnels</span>
            <span className="block mt-2 gradient-text">Automated Lead Conversion</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Convert more leads with AI-powered marketing funnels. Automated follow-up sequences that nurture prospects and book meetings while you sleep.
          </p>
        </div>

        {/* Funnel Types Grid */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Marketing Funnel Solutions</h2>
          <div className="grid gap-8 lg:grid-cols-3">
            {funnelTypes.map((funnel) => (
              <div 
                key={funnel.title}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-indigo-50 card-hover"
              >
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${funnel.image})` }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{funnel.title}</h3>
                  <p className="text-gray-600 mb-4">{funnel.description}</p>
                  <div className="bg-indigo-50/50 rounded-xl p-4 mb-4">
                    <div className="text-lg font-semibold text-green-600">{funnel.results}</div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500 mb-2">Channels</div>
                      <div className="flex flex-wrap gap-2">
                        {funnel.channels.map((channel) => (
                          <span
                            key={channel}
                            className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium"
                          >
                            {channel}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500 mb-2">Automation</div>
                      <div className="flex flex-wrap gap-2">
                        {funnel.automation.map((auto) => (
                          <span
                            key={auto}
                            className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-medium"
                          >
                            {auto}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid gap-8 md:grid-cols-3">
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

        {/* Process Section */}
        <div className="mt-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold text-center mb-8">Our Funnel Building Process</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                step: '01',
                title: 'Discovery',
                desc: 'Deep dive into your business goals and target audience',
                icon: Search,
                details: ['Market Research', 'Competitor Analysis', 'User Personas']
              },
              { 
                step: '02',
                title: 'Strategy',
                desc: 'Creating a conversion-focused funnel strategy',
                icon: Palette,
                details: ['Funnel Mapping', 'Content Planning', 'Automation Design']
              },
              { 
                step: '03',
                title: 'Development',
                desc: 'Building your funnel with modern tech stack',
                icon: Code,
                details: ['Page Creation', 'Integration Setup', 'Automation Build']
              },
              { 
                step: '04',
                title: 'Launch',
                desc: 'Testing and optimization before going live',
                icon: Rocket,
                details: ['A/B Testing', 'Analytics Setup', 'Performance Tracking']
              }
            ].map((phase) => (
              <div key={phase.step} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-indigo-200 mb-2">{phase.step}</div>
                <div className="flex justify-center mb-4">
                  <phase.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-xl font-semibold mb-2">{phase.title}</div>
                <div className="text-sm text-indigo-100 mb-4">{phase.desc}</div>
                <div className="space-y-2">
                  {phase.details.map((detail) => (
                    <div
                      key={detail}
                      className="text-sm bg-white/5 rounded-lg py-1"
                    >
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="mt-24 text-center">
          <Button 
            variant="primary" 
            size="lg" 
            icon 
            className="shadow-xl shadow-indigo-600/20"
          >
            Get Your Free Funnel Strategy
          </Button>
          <p className="mt-4 text-sm text-gray-500">
            No commitment required • Detailed analysis within 24 hours
          </p>
        </div>
      </div>
    </div>
  );
}