import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { Button } from './Button';

// Define Bland.ai API response type
interface BlandAIResponse {
  success: boolean;
  call_id?: string;
  error?: string;
}

/**
 * PhoneInput component props
 * @property className - Additional CSS classes
 */
interface PhoneInputProps {
  className?: string;
  collectName?: boolean;
  collectEmail?: boolean;
}

/**
 * PhoneInput Component
 * A form component for collecting and validating phone numbers
 * Features:
 * - Real-time formatting
 * - Validation
 * - Success state
 * - Error handling
 * - Integration with Bland.ai for demo calls
 * - Optional name and email collection for CRM integration
 */
export function PhoneInput({ 
  className = '', 
  collectName = false, 
  collectEmail = false 
}: PhoneInputProps) {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [callId, setCallId] = useState<string | null>(null);

  /**
   * Validates phone number format
   * Accepts: (XXX) XXX-XXXX or similar formats
   * @param value - Phone number to validate
   * @returns boolean indicating if format is valid
   */
  const validatePhone = (value: string) => {
    return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value);
  };

  /**
   * Formats phone number as user types
   * Format: (XXX) XXX-XXXX
   * @param value - Raw phone input
   * @returns Formatted phone string
   */
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  /**
   * Validates email format
   * @param email - Email to validate
   * @returns boolean indicating if format is valid
   */
  const validateEmail = (email: string) => {
    // Only validate if there's input or if email collection is required
    if (!email && !collectEmail) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  /**
   * Handles phone input changes with formatting
   * @param e - Input change event
   */
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
    setIsValid(validatePhone(formatted));
    setError(null);
  };
  
  /**
   * Handles name input changes
   * @param e - Input change event
   */
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setError(null);
  };
  
  /**
   * Handles email input changes
   * @param e - Input change event
   */
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsEmailValid(validateEmail(e.target.value));
    setError(null);
  };

  /**
   * Extracts digits only from formatted phone number
   * @param formattedPhone - Formatted phone number
   * @returns Phone number with digits only
   */
  const getDigitsOnly = (formattedPhone: string) => {
    return formattedPhone.replace(/\D/g, '');
  };

  /**
   * Initiates a demo call using Bland.ai API
   * @param phoneNumber - Target phone number for the call
   */
  const startDemoCall = async (phoneNumber: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Making a request to your Netlify serverless function
      // This keeps your API key secure
      const response = await fetch('/.netlify/functions/start-demo-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone_number: getDigitsOnly(phoneNumber),
          // Include name and email for CRM if provided
          name: name || undefined,
          email: email || undefined,
          // You can include any additional parameters needed for your Bland.ai pathway
          pathway_id: 'your_pathway_id' // Replace with your actual Bland.ai pathway ID
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to initiate call');
      }
      
      const data: BlandAIResponse = await response.json();
      
      if (data.success && data.call_id) {
        setCallId(data.call_id);
        setSubmitted(true);
      } else {
        setError(data.error || 'Failed to initiate call. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while connecting to our service. Please try again later.');
      console.error('Demo call error:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles form submission
   * Only submits if all required fields are valid
   * @param e - Form submission event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if phone is valid
    if (!validatePhone(phone)) {
      setError("Please enter a valid phone number");
      return;
    }
    
    // Check if email is valid when collecting email
    if (collectEmail && !validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    // Check if name is provided when collecting name
    if (collectName && name.trim() === '') {
      setError("Please enter your name");
      return;
    }
    
    // All validation passed, start the demo call
    startDemoCall(phone);
  };

  /**
   * Resets the form to try another number
   */
  const resetForm = () => {
    setSubmitted(false);
    setPhone('');
    setCallId(null);
    setError(null);
  };

  if (submitted) {
    return (
      <div className={`text-center ${className}`}>
        <div className="bg-green-50 rounded-xl p-6 space-y-3">
          <div className="text-green-600 font-semibold text-lg">
            Thanks! We're calling you right now
          </div>
          <div className="text-green-600">
            {phone}
          </div>
          <p className="text-sm text-gray-600">
            Call ID: {callId}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={resetForm}
          >
            Try another number
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {collectName && (
        <div className="relative">
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors"
          />
        </div>
      )}
      
      {collectEmail && (
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Your Email"
            className={`w-full px-4 py-3 rounded-lg border ${
              isEmailValid ? 'border-gray-200 focus:border-indigo-300' : 'border-red-300 focus:border-red-500'
            } focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors`}
          />
        </div>
      )}
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Phone className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="(555) 555-5555"
          className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
            isValid ? 'border-gray-200 focus:border-indigo-300' : 'border-red-300 focus:border-red-500'
          } focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors`}
        />
      </div>
      
      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}
      
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={(!isValid || (collectEmail && !isEmailValid) || loading)}
      >
        {loading ? 'Connecting...' : 'Call Me Now'}
      </Button>
      
      <p className="text-sm text-gray-500 text-center">
        Free 2-minute demo call • No commitment
      </p>
    </form>
  );
}
