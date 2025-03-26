import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Clock, Users } from 'lucide-react';
import { Button } from './Button';

/**
 * Calculator input parameters interface
 * @property employeeCost - Hourly cost per employee
 * @property hoursPerWeek - Weekly work hours per employee
 * @property employees - Number of employees to calculate for
 */
interface CalculatorInputs {
  employeeCost: number;
  hoursPerWeek: number;
  employees: number;
}

/**
 * CostCalculator Component
 * Interactive ROI calculator that demonstrates potential savings with AI automation
 * 
 * Calculation Methodology:
 * - Monthly Cost = hourly rate * hours per week * 4 weeks * number of employees
 * - AI Automation Rate = 70% (industry standard for routine tasks)
 * - Base AI Solution Cost = $499/month
 * - Net Monthly Savings = (Monthly Cost * Automation Rate) - AI Solution Cost
 */
export function CostCalculator() {
  // Initialize with conservative default values
  const [inputs, setInputs] = useState<CalculatorInputs>({
    employeeCost: 25,
    hoursPerWeek: 40,
    employees: 2,
  });
  // Track calculated savings
  const [savings, setSavings] = useState({
    monthly: 0,
    yearly: 0,
    hours: 0,
  });

  // Recalculate savings whenever inputs change
  useEffect(() => {
    const hoursPerMonth = inputs.hoursPerWeek * 4;
    const monthlyCost = inputs.employeeCost * hoursPerMonth * inputs.employees;
    const aiCost = 499; // Base monthly AI solution cost
    const automationRate = 0.7; // 70% of tasks automated

    // Calculate potential savings
    const monthlySavings = (monthlyCost * automationRate) - aiCost;
    const yearlySavings = monthlySavings * 12;
    const hoursSaved = hoursPerMonth * inputs.employees * automationRate;

    // Update savings state with rounded values for better UX
    setSavings({
      monthly: Math.round(monthlySavings),
      yearly: Math.round(yearlySavings),
      hours: Math.round(hoursSaved),
    });
  }, [inputs]);

  /**
   * Handle slider input changes
   * @param e - Input change event
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-indigo-50 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="h-6 w-6" />
          <h3 className="text-xl font-semibold">AI Cost Savings Calculator</h3>
        </div>
        <p className="text-indigo-100">
          See how much you could save by implementing AI automation
        </p>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-gray-700 mb-2">
              <DollarSign className="h-4 w-4 text-indigo-600" />
              Hourly Employee Cost
            </label>
            <input
              type="range"
              name="employeeCost"
              min="15"
              max="100"
              value={inputs.employeeCost}
              onChange={handleInputChange}
              className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>${inputs.employeeCost}/hour</span>
              <span>$100/hour</span>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-700 mb-2">
              <Clock className="h-4 w-4 text-indigo-600" />
              Hours Per Week
            </label>
            <input
              type="range"
              name="hoursPerWeek"
              min="10"
              max="60"
              value={inputs.hoursPerWeek}
              onChange={handleInputChange}
              className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>{inputs.hoursPerWeek} hours</span>
              <span>60 hours</span>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-700 mb-2">
              <Users className="h-4 w-4 text-indigo-600" />
              Number of Employees
            </label>
            <input
              type="range"
              name="employees"
              min="1"
              max="10"
              value={inputs.employees}
              onChange={handleInputChange}
              className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>{inputs.employees} employees</span>
              <span>10 employees</span>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50/50 rounded-xl p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600">Monthly Savings</div>
              <div className="text-2xl font-bold text-indigo-600">
                ${savings.monthly.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Yearly Savings</div>
              <div className="text-2xl font-bold text-green-600">
                ${savings.yearly.toLocaleString()}
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Hours Saved Monthly</div>
            <div className="text-2xl font-bold text-purple-600">
              {savings.hours.toLocaleString()} hours
            </div>
          </div>
        </div>

        <Button variant="primary" size="lg" icon className="w-full">
          Book a Demo to Learn More
        </Button>
      </div>
    </div>
  );
}