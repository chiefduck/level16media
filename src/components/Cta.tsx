import React from 'react';
import { Button } from './Button';
import { Bot, Zap } from 'lucide-react';

export function Cta() {
  return (
    <div className="bg-indigo-600">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <div className="xl:w-0 xl:flex-1">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Ready to automate your business growth?
          </h2>
          <p className="mt-3 max-w-3xl text-lg leading-6 text-indigo-200">
            Get your free AI audit and discover how automation can transform your
            business. No commitment required.
          </p>
          <div className="mt-8 flex space-x-4">
            <div className="inline-flex rounded-md shadow">
              <Button variant="secondary" size="lg" icon>
                Book Your Strategy Call
              </Button>
            </div>
            <div className="inline-flex">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-indigo-500">
                Get Free AI Audit
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-8 lg:mt-0 lg:ml-8 xl:w-1/3">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
            <div className="flex items-center space-x-4 mb-4">
              <Bot className="h-8 w-8 text-white" />
              <div>
                <h3 className="text-white font-semibold">AI-Powered Growth</h3>
                <p className="text-indigo-200">24/7 Automation</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Zap className="h-8 w-8 text-white" />
              <div>
                <h3 className="text-white font-semibold">Fast Implementation</h3>
                <p className="text-indigo-200">Live in 2 Weeks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}