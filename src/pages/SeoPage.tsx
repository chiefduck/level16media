import React from 'react';
import { Search, BarChart3, Globe2, Rocket, ArrowUpRight, Target, Users, MessageSquare, MapPin, Star, Store } from 'lucide-react';
import { Button } from '../components/Button';

const features = [
  {
    icon: Search,
    title: 'Smart SEO',
    description: 'AI-powered optimization for higher search rankings.',
  },
  {
    icon: Store,
    title: 'GMB Optimization',
    description: 'Maximize your Google Business presence for local dominance.',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'Track rankings, traffic, and conversion rates.',
  },
  {
    icon: MessageSquare,
    title: 'Content Strategy',
    description: 'Data-driven content that attracts qualified leads.',
  },
];

const seoResults = [
  {
    title: 'Law Firm SEO',
    description: 'Personal injury law firm ranking #1 for competitive terms',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    metrics: {
      rankings: '15 Keywords in Top 3',
      traffic: '+312% Organic Traffic',
      leads: '+156% More Leads'
    },
    optimizations: ['Local SEO', 'Content Strategy', 'Technical SEO']
  },
  {
    title: 'Dental Practice',
    description: 'Multi-location dental practice dominating local search',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    metrics: {
      rankings: '25 Keywords in Top 3',
      traffic: '+245% Organic Traffic',
      leads: '+178% More Leads',
      gmb: '450+ Reviews'
    },
    optimizations: ['GMB Management', 'Review Generation', 'Location Pages']
  },
  {
    title: 'Real Estate Agency',
    description: 'Boutique agency ranking for high-value property terms',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    metrics: {
      rankings: '30 Keywords in Top 3',
      traffic: '+287% Organic Traffic',
      leads: '+198% More Leads'
    },
    optimizations: ['Area Pages', 'Property SEO', 'Market Reports']
  }
];

export function SeoPage() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">SEO & Local Search</span>
            <span className="block mt-2 gradient-text">Dominate Search Results</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Get found by qualified leads searching for your services. Our AI-powered SEO strategies help you rank higher and attract more clients.
          </p>
        </div>

        {/* Results Grid */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Client Success Stories</h2>
          <div className="grid gap-8 lg:grid-cols-3">
            {seoResults.map((result) => (
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
                  <div className="grid grid-cols-1 gap-4 bg-indigo-50/50 rounded-xl p-4 mb-4">
                    <div>
                      <div className="text-lg font-semibold text-green-600">{result.metrics.rankings}</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-indigo-600">{result.metrics.traffic}</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-purple-600">{result.metrics.leads}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.optimizations.map((optimization) => (
                      <span
                        key={optimization}
                        className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium"
                      >
                        {optimization}
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

        {/* GMB Management Section */}
        <div className="mt-24 bg-white rounded-2xl shadow-lg border border-indigo-50 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Google Business Management</h2>
            <p className="text-indigo-100">Comprehensive GMB optimization to dominate local search results</p>
          </div>
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-indigo-600" />
                  <h3 className="text-lg font-semibold">Local Presence</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Multi-location management</li>
                  <li>• Service area optimization</li>
                  <li>• Category optimization</li>
                  <li>• Local keyword targeting</li>
                </ul>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Star className="h-6 w-6 text-indigo-600" />
                  <h3 className="text-lg font-semibold">Review Management</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Review generation system</li>
                  <li>• Response management</li>
                  <li>• Sentiment analysis</li>
                  <li>• Competitive monitoring</li>
                </ul>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Store className="h-6 w-6 text-indigo-600" />
                  <h3 className="text-lg font-semibold">Profile Optimization</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Posts & updates</li>
                  <li>• Photo optimization</li>
                  <li>• Q&A management</li>
                  <li>• Conversion tracking</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 p-6 bg-indigo-50 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-2xl font-bold text-indigo-600">Average Client Results</div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">+312%</div>
                  <div className="text-sm text-gray-600">Profile Views</div>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">+156%</div>
                  <div className="text-sm text-gray-600">Direction Requests</div>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">+278%</div>
                  <div className="text-sm text-gray-600">Phone Calls</div>
                </div>
                <div className="bg-white p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">4.8★</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="mt-24 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold text-center mb-8">Our SEO Process</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                step: '01',
                title: 'Audit',
                desc: 'Analysis of SEO and GMB performance',
                icon: Search,
                details: ['Technical Review', 'GMB Audit', 'Competitor Analysis']
              },
              { 
                step: '02',
                title: 'Strategy',
                desc: 'Custom SEO plan based on your business goals',
                icon: Target,
                details: ['GMB Optimization', 'Local SEO', 'Content Strategy']
              },
              { 
                step: '03',
                title: 'Optimize',
                desc: 'Implementation of SEO best practices',
                icon: Rocket,
                details: ['On-Page SEO', 'Technical Fixes', 'Content Creation']
              },
              { 
                step: '04',
                title: 'Scale',
                desc: 'Continuous improvement and expansion',
                icon: ArrowUpRight,
                details: ['Rank Tracking', 'ROI Analysis', 'Strategy Updates']
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
            Get Your Free SEO Audit
          </Button>
          <p className="mt-4 text-sm text-gray-500">
            No commitment required • Detailed analysis within 24 hours
          </p>
        </div>
      </div>
    </div>
  );
}