import React from 'react';
import { Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react';
import { Button } from '../components/Button';

const featuredPost = {
  title: "The Future of AI in Business: 2025 and Beyond",
  excerpt: "Discover how artificial intelligence is transforming business operations and what to expect in the coming years.",
  image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
  author: "Sarah Thompson",
  date: "March 15, 2024",
  readTime: "8 min read",
  category: "AI Trends"
};

const posts = [
  {
    title: "10 Ways AI Voice Assistants Are Revolutionizing Customer Service",
    excerpt: "Learn how businesses are using AI voice assistants to provide 24/7 customer support and increase satisfaction.",
    image: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    author: "Michael Chen",
    date: "March 12, 2024",
    readTime: "6 min read",
    category: "Voice AI"
  },
  {
    title: "The Complete Guide to Marketing Automation in 2024",
    excerpt: "Discover the latest tools and strategies for automating your marketing efforts and scaling your business.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    author: "Emily Rodriguez",
    date: "March 10, 2024",
    readTime: "10 min read",
    category: "Marketing"
  },
  {
    title: "SEO Strategies That Actually Work: Real Case Studies",
    excerpt: "See how businesses are achieving page one rankings with modern SEO techniques and AI-powered optimization.",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    author: "David Kim",
    date: "March 8, 2024",
    readTime: "7 min read",
    category: "SEO"
  },
  {
    title: "Building High-Converting Websites: A Data-Driven Approach",
    excerpt: "Learn the science behind websites that convert visitors into customers, backed by real analytics.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    author: "Lisa Anderson",
    date: "March 5, 2024",
    readTime: "9 min read",
    category: "Web Design"
  }
];

const categories = [
  "AI Trends", "Voice AI", "Chatbots", "SEO", "Web Design", 
  "Marketing Automation", "Case Studies", "Industry News"
];

export function BlogPage() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Latest Insights</span>
            <span className="block mt-2 gradient-text">AI & Marketing Blog</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Expert insights on AI technology, digital marketing, and business growth strategies.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-50">
            <div className="grid md:grid-cols-2 gap-8">
              <div 
                className="h-96 md:h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${featuredPost.image})` }}
              />
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-indigo-600 mb-4">
                  <Tag className="h-4 w-4" />
                  <span className="text-sm font-semibold">{featuredPost.category}</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{featuredPost.title}</h2>
                <p className="text-gray-600 text-lg mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <Button variant="primary" size="lg" icon>
                  Read Article
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-16">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors text-sm font-medium"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <div 
              key={post.title}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-50 card-hover"
            >
              <div 
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${post.image})` }}
              />
              <div className="p-6">
                <div className="flex items-center gap-2 text-indigo-600 mb-3">
                  <Tag className="h-4 w-4" />
                  <span className="text-sm font-semibold">{post.category}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-6">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-indigo-100 mb-6">Get the latest AI and marketing insights delivered to your inbox.</p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
              <Button variant="secondary" size="lg">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}