import React from 'react';
import { Globe2, Rocket, Zap, Search, Monitor, Smartphone, Code, Palette, Layout, Gauge } from 'lucide-react';
import { Button } from '../components/Button';

const features = [
  {
    icon: Globe2,
    title: 'Modern Design',
    description: 'Beautiful, responsive websites that look great on all devices.',
  },
  {
    icon: Rocket,
    title: 'Performance',
    description: 'Lightning-fast loading speeds for better user experience.',
  },
  {
    icon: Zap,
    title: 'Conversion Focus',
    description: 'Optimized layouts that turn visitors into customers.',
  },
  {
    icon: Search,
    title: 'SEO Ready',
    description: 'Built-in optimization to rank higher in search results.',
  },
];

const portfolioItems = [
  {
    title: 'Anderson & Partners Law',
    description: 'Modern law firm website with integrated client intake system',
    image: 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    metrics: {
      conversion: '+156%',
      speed: '0.8s',
      mobile: '99/100',
      features: ['Client Portal', 'Case Tracking', 'Live Chat']
    }
  },
  {
    title: 'Bay Area Dental Group',
    description: 'Patient-focused website with AI scheduling system',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    metrics: {
      conversion: '+143%',
      speed: '0.9s',
      mobile: '98/100',
      features: ['Online Booking', 'Patient Forms', 'Reviews Integration']
    }
  },
  {
    title: 'Luxury Homes Realty',
    description: 'High-end real estate platform with virtual tours',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    metrics: {
      conversion: '+187%',
      speed: '1.0s',
      mobile: '97/100',
      features: ['Virtual Tours', 'MLS Integration', 'Lead Capture']
    }
  },
  {
    title: 'Elite Financial Advisors',
    description: 'Wealth management firm with secure client dashboard',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    metrics: {
      conversion: '+134%',
      speed: '0.7s',
      mobile: '100/100',
      features: ['Client Dashboard', 'Portfolio Tracking', 'Secure Login']
    }
  },
  {
    title: 'Pacific Construction',
    description: 'Construction company with project showcase',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    metrics: {
      conversion: '+167%',
      speed: '0.8s',
      mobile: '98/100',
      features: ['Project Gallery', 'Cost Calculator', 'Quote Builder']
    }
  },
  {
    title: 'Wellness Center',
    description: 'Holistic wellness center with class booking',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    metrics: {
      conversion: '+198%',
      speed: '0.9s',
      mobile: '97/100',
      features: ['Class Scheduling', 'Member Portal', 'Wellness Blog']
    }
  }
];

export function WebsitePage() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Website Design</span>
            <span className="block mt-2 gradient-text">Convert More Leads</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Get a lightning-fast, conversion-optimized website that ranks in Google. Built for mobile and optimized for lead generation with clear calls-to-action.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Recent Website Projects</h2>
          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {portfolioItems.map((item) => (
              <div 
                key={item.title}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-indigo-50 card-hover"
              >
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="grid grid-cols-3 gap-4 bg-indigo-50/50 rounded-xl p-4 mb-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Leads</div>
                      <div className="text-lg font-semibold text-green-600">{item.metrics.conversion}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Load Time</div>
                      <div className="text-lg font-semibold text-indigo-600">{item.metrics.speed}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Mobile</div>
                      <div className="text-lg font-semibold text-purple-600">{item.metrics.mobile}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.metrics.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium"
                      >
                        {feature}
                      </span>
                    ))}
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

        {/* Process Section */}
        <div className="mt-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold text-center mb-8">Our Website Design Process</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                step: '01',
                title: 'Discovery',
                desc: 'Deep dive into your business goals, target audience, and unique value proposition',
                icon: Search,
                details: ['Market Research', 'Competitor Analysis', 'User Personas']
              },
              { 
                step: '02',
                title: 'Design',
                desc: 'Creating a beautiful, conversion-focused design that reflects your brand',
                icon: Palette,
                details: ['Wireframes', 'UI/UX Design', 'Mobile-First']
              },
              { 
                step: '03',
                title: 'Development',
                desc: 'Building your site with modern tech stack and best practices',
                icon: Code,
                details: ['Clean Code', 'SEO Setup', 'Performance']
              },
              { 
                step: '04',
                title: 'Launch',
                desc: 'Thorough testing and optimization before going live',
                icon: Rocket,
                details: ['QA Testing', 'Analytics', '24/7 Support']
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

        {/* Technologies Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-12">Built with Modern Tech Stack</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-50">
              <Gauge className="h-8 w-8 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Performance First</h3>
              <p className="text-gray-600">Lightning-fast load times with modern optimization techniques</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-50">
              <Layout className="h-8 w-8 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
              <p className="text-gray-600">Perfect display on all devices and screen sizes</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-indigo-50">
              <Code className="h-8 w-8 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Clean Code</h3>
              <p className="text-gray-600">Maintainable and scalable codebase using best practices</p>
            </div>
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
            Get Your Free Website Audit
          </Button>
          <p className="mt-4 text-sm text-gray-500">
            No commitment required • Detailed analysis within 24 hours
          </p>
        </div>
      </div>
    </div>
  );
}