import React from 'react';

export function CookiesPage() {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-8">Cookie Policy</h1>
        
        <div className="prose prose-lg prose-indigo">
          <p className="text-lg text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies</h2>
            <p className="text-gray-600">
              Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Cookies</h2>
            <p className="text-gray-600 mb-4">
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Essential cookies: Required for the website to function properly</li>
              <li>Analytics cookies: To understand how visitors use our website</li>
              <li>Marketing cookies: To deliver more relevant advertisements</li>
              <li>Preference cookies: To remember your settings and preferences</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Managing Cookies</h2>
            <p className="text-gray-600 mb-4">
              You can control and manage cookies in various ways:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Browser settings: You can manage cookie settings in your browser</li>
              <li>Third-party tools: You can use various opt-out tools</li>
              <li>Our cookie banner: You can adjust preferences when first visiting</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Types of Cookies We Use</h2>
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Essential Cookies</h3>
                <p className="text-gray-600">Used for basic website functionality</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Analytics Cookies</h3>
                <p className="text-gray-600">Help us understand website usage</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Marketing Cookies</h3>
                <p className="text-gray-600">Used for targeted advertising</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about our Cookie Policy, please contact us at privacy@level16media.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}