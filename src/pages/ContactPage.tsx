import React from 'react';
import { Mail, MessageSquare, Phone, Clock } from 'lucide-react';
import { Button } from '../components/Button';
import ReCAPTCHA from 'react-google-recaptcha';
import { useState } from 'react';

const contactMethods = [
  {
    icon: Phone,
    title: 'Phone',
    value: '1-800-AI-GROWTH',
    description: 'Mon-Fri from 9am to 5pm PST'
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'hello@level16media.com',
    description: 'We reply within 24 hours'
  }
];

const faqs = [
  {
    question: "How quickly can you implement AI solutions?",
    answer: "Most AI implementations are completed within 2 weeks. This includes setup, training, and integration with your existing systems."
  },
  {
    question: "What kind of ROI can I expect?",
    answer: "Our clients typically see 2-3x ROI within the first 3 months. This comes from increased lead conversion and reduced operational costs."
  },
  {
    question: "Do you offer ongoing support?",
    answer: "Yes, all our services include 24/7 technical support and regular optimization to ensure peak performance."
  },
  {
    question: "How do you handle data security?",
    answer: "We follow industry-best security practices and are fully compliant with GDPR, CCPA, and other privacy regulations."
  }
];

export function ContactPage() {
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [consentChecked, setConsentChecked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Get in Touch</span>
            <span className="block mt-2 gradient-text">We're Here to Help</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Have questions about our AI solutions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {contactMethods.map((method) => (
            <div
              key={method.title}
              className="bg-white rounded-xl p-6 shadow-lg border border-indigo-50 text-center card-hover"
            >
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-30"></div>
                  <method.icon className="relative h-8 w-8 text-indigo-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
              <p className="text-indigo-600 font-medium mb-2">{method.value}</p>
              <p className="text-gray-500 text-sm">{method.description}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-2xl shadow-xl border border-indigo-50 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200"
                ></textarea>
              </div>
              
              {/* Consent Checkbox */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="consent"
                      type="checkbox"
                      checked={consentChecked}
                      onChange={(e) => setConsentChecked(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="consent" className="text-sm text-gray-600">
                      I agree to receive automated calls and text messages from Level 16 Media. I understand I can opt-out at any time by replying END.
                    </label>
                  </div>
                </div>
              </div>

              {/* reCAPTCHA */}
              <div className="flex justify-center">
                <ReCAPTCHA
                  sitekey="YOUR_RECAPTCHA_SITE_KEY"
                  onChange={(value) => setCaptchaValue(value)}
                />
              </div>
              <Button variant="primary" size="lg" icon className="w-full" disabled={!captchaValue || !consentChecked}>
                Send Message
              </Button>
            </form>
          </div>

          {/* FAQs */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg border border-indigo-50"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}