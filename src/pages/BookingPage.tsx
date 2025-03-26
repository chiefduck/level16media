import React, { useEffect } from 'react';

export function BookingPage() {
  useEffect(() => {
    // Load Navizio script
    const script = document.createElement('script');
    script.src = 'https://api.navizio.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Book Your</span>
            <span className="block mt-2 gradient-text">Strategy Session</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Schedule your free consultation to discover how AI can transform your business
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <iframe 
            src="https://api.navizio.com/widget/booking/LqxvIefHyRLcCTEwMeDR" 
            style={{ width: '100%', border: 'none', overflow: 'hidden' }}
            scrolling="no" 
            id="LqxvIefHyRLcCTEwMeDR_1742328250587"
            title="Booking Calendar"
          />
        </div>
      </div>
    </div>
  );
}