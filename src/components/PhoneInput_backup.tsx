import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { Button } from './Button';

/**
 * PhoneInput component props
 * @property onSubmit - Callback function when phone number is submitted
 * @property className - Additional CSS classes
 */
interface PhoneInputProps {
  onSubmit: (phone: string) => void;
  className?: string;
}

/**
 * PhoneInput Component
 * A form component for collecting and validating phone numbers
 * Features:
 * - Real-time formatting
 * - Validation
 * - Success state
 * - Error handling
 */
export function PhoneInput({ onSubmit, className = '' }: PhoneInputProps) {
  const [phone, setPhone] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [submitted, setSubmitted] = useState(false);

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
   * Handles input changes with formatting
   * @param e - Input change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
    setIsValid(validatePhone(formatted));
  };

  /**
   * Handles form submission
   * Only submits if phone number is valid
   * @param e - Form submission event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePhone(phone)) {
      setSubmitted(true);
      onSubmit(phone);
    }
  };

  if (submitted) {
    return (
      <div className={`text-center ${className}`}>
        <div className="bg-green-50 rounded-xl p-6 space-y-3">
          <div className="text-green-600 font-semibold text-lg">
            Thanks! We'll call you right away
          </div>
          <div className="text-green-600">
            {phone}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSubmitted(false)}
          >
            Try another number
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Phone className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="tel"
          value={phone}
          onChange={handleChange}
          placeholder="(555) 555-5555"
          className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
            isValid ? 'border-gray-200 focus:border-indigo-300' : 'border-red-300 focus:border-red-500'
          } focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors`}
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={!isValid}
      >
        Call Me Now
      </Button>
      <p className="text-sm text-gray-500 text-center">
        Free 2-minute demo call • No commitment
      </p>
    </form>
  );
}
